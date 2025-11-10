import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicationService } from '../services/api';
import { notificationService } from '../services/notificationService';

export default function ReminderScreen({ navigation }) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMedications();
  }, []);

  // Schedule notifications when medications are loaded
  useEffect(() => {
    if (medications.length > 0) {
      scheduleAllReminders();
    }
  }, [medications]);

  const validateMedicationData = (medications) => {
    if (!Array.isArray(medications)) {
      console.log('❌ Medications is not an array:', medications);
      return [];
    }
    
    return medications.filter(med => {
      const isValid = med && med.name;
      if (!isValid) {
        console.log('❌ Invalid medication item:', med);
      }
      return isValid;
    });
  };

  const fetchMedications = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching medications...');

      const result = await medicationService.getMedications();
      console.log('📋 Full medications response:', JSON.stringify(result, null, 2));

      if (result.success) {
        console.log('📊 Medications data structure:', {
          data: result.data,
          dataType: typeof result.data,
          isArray: Array.isArray(result.data),
          length: result.data?.length
        });
        
        // Add fallback for different response structures
        const medicationsData = result.data || result.medications || [];
        const validatedMedications = validateMedicationData(medicationsData);
        setMedications(validatedMedications);
        console.log('✅ Valid medications loaded:', validatedMedications.length);
      } else {
        console.log('❌ API returned success: false');
        setMedications([]);
        Alert.alert('Error', result.message || 'Failed to fetch medications');
      }
    } catch (error) {
      console.error('❌ Fetch medications error:', error);
      setMedications([]);
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const scheduleAllReminders = async () => {
    try {
      console.log('📅 Scheduling reminders for all medications...');
      
      for (const medication of medications) {
        await notificationService.scheduleMedicationReminder(medication);
      }
      
      // Log scheduled notifications for debugging
      const scheduled = await notificationService.getScheduledNotifications();
      console.log('📋 Currently scheduled notifications:', scheduled.length);
    } catch (error) {
      console.error('❌ Error scheduling reminders:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMedications();
    setRefreshing(false);
  };

  const formatSchedule = (schedule) => {
    if (Array.isArray(schedule)) {
      return schedule.join(', ');
    }
    return schedule;
  };

  const handleUpdateStatus = async (medicationId, time, status) => {
    try {
      const result = await medicationService.updateReminderStatus(medicationId, time, status);
      
      if (result.success) {
        Alert.alert('Success', `Status updated to ${status}`);
        
        // If marked as taken, you might want to cancel the specific reminder
        if (status === 'Taken') {
          // Optional: Cancel the specific notification for this time
          const scheduled = await notificationService.getScheduledNotifications();
          const notificationToCancel = scheduled.find(notif => 
            notif.content.data?.medicationId === medicationId && 
            notif.content.data?.time === time
          );
          
          if (notificationToCancel) {
            await notificationService.cancelScheduledNotificationAsync(notificationToCancel.identifier);
          }
        }
        
        fetchMedications();
      } else {
        Alert.alert('Error', result.message || 'Failed to update status');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  // Test notification function
  const testNotification = async () => {
    try {
      await notificationService.requestPermissions();
      
      // Test immediate notification
      await notificationService.scheduleNotificationAsync({
        content: {
          title: 'Test Reminder',
          body: 'This is a test notification!',
          sound: 'default',
        },
        trigger: {
          seconds: 5, // 5 seconds from now
        },
      });
      
      Alert.alert('Test', 'Test notification scheduled for 5 seconds from now');
    } catch (error) {
      console.error('Test notification error:', error);
      Alert.alert('Error', 'Failed to schedule test notification');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading medications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reminders</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={testNotification} style={styles.testButton}>
              <Ionicons name="notifications" size={20} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRefresh()}>
              <Ionicons name="refresh" size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Debug Info */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>
            Medications loaded: {medications.length}
          </Text>
        </View>

        {/* Medications List */}
        {medications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="medical" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No medications added yet</Text>
            <Text style={styles.emptyText}>
              Add your first medication from the "Add" tab
            </Text>
            <TouchableOpacity 
              style={styles.testNotificationButton}
              onPress={testNotification}
            >
              <Text style={styles.testNotificationButtonText}>
                Test Notifications
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.medicationsContainer}>
            {medications.map((med, index) => (
              <View key={med._id || index} style={styles.medicationCard}>
                {/* Medication Header */}
                <View style={styles.medicationHeader}>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{med.name}</Text>
                    <Text style={styles.medicationDosage}>{med.dosage}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                </View>

                {/* Schedule Times */}
                <View style={styles.scheduleContainer}>
                  <Text style={styles.scheduleTitle}>Schedule:</Text>
                  <View style={styles.timesGrid}>
                    {Array.isArray(med.schedule) ? (
                      med.schedule.map((time, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.timeChip}
                          onPress={() => handleUpdateStatus(med._id, time, 'Taken')}
                        >
                          <Ionicons name="time" size={16} color="#2563EB" />
                          <Text style={styles.timeText}>{time}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.scheduleText}>
                        {formatSchedule(med.schedule)}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Reminders */}
                {med.reminders && med.reminders.length > 0 && (
                  <View style={styles.remindersContainer}>
                    <Text style={styles.remindersTitle}>Reminders Status:</Text>
                    {med.reminders.map((reminder, idx) => (
                      <View key={idx} style={styles.reminderItem}>
                        <Text style={styles.reminderText}>
                          {reminder.time}: {reminder.status}
                        </Text>
                        <View style={[
                          styles.statusBadge,
                          reminder.status === 'Taken' && styles.statusTaken,
                          reminder.status === 'Pending' && styles.statusPending,
                          reminder.status === 'Skipped' && styles.statusSkipped,
                        ]}>
                          <Text style={styles.statusText}>{reminder.status}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  testButton: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  debugContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  debugText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  testNotificationButton: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  testNotificationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  medicationsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  medicationCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  scheduleContainer: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  scheduleText: {
    fontSize: 14,
    color: '#6B7280',
  },
  remindersContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  remindersTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reminderText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  statusTaken: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusSkipped: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  spacing: {
    height: 20,
  },
});