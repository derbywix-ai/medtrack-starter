import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicationService } from '../services/api';

export default function MedicationDetailScreen({ navigation, route }) {
  const { medication } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleMarkStatus = async (time, status) => {
    setLoading(true);
    try {
      const result = await medicationService.updateReminderStatus(
        medication._id,
        time,
        status
      );

      if (result.success) {
        setSelectedStatus(`${time} - ${status}`);
        Alert.alert('Success', `Marked as ${status}!`);
      } else {
        Alert.alert('Error', result.message || 'Failed to update status');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!medication) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#DC2626" />
          <Text style={styles.errorText}>Medication not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Medication Details</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Medication Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.medicationIcon}>
            <Ionicons name="medical" size={48} color="#2563EB" />
          </View>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>{medication.dosage}</Text>
          
          {/* Status Badge */}
          <View style={styles.statusBadgeContainer}>
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.statusBadgeText}>Active</Text>
            </View>
          </View>
        </View>

        {/* Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <View style={styles.scheduleContainer}>
            {medication.schedule && medication.schedule.length > 0 ? (
              medication.schedule.map((time, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <View style={styles.scheduleTimeContainer}>
                    <Ionicons name="time" size={24} color="#2563EB" />
                    <Text style={styles.scheduleTime}>{time}</Text>
                  </View>
                  <View style={styles.scheduleActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.takenButton]}
                      onPress={() => handleMarkStatus(time, 'Taken')}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                        <>
                          <Ionicons name="checkmark" size={16} color="#FFF" />
                          <Text style={styles.actionButtonText}>Taken</Text>
                        </>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.skippedButton]}
                      onPress={() => handleMarkStatus(time, 'Skipped')}
                      disabled={loading}
                    >
                      <Ionicons name="close" size={16} color="#FFF" />
                      <Text style={styles.actionButtonText}>Skip</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No schedule set</Text>
            )}
          </View>
        </View>

        {/* Reminders Status */}
        {medication.reminders && medication.reminders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminders Status</Text>
            <View style={styles.remindersContainer}>
              {medication.reminders.map((reminder, index) => (
                <View key={index} style={styles.reminderStatusItem}>
                  <View style={styles.reminderInfo}>
                    <Text style={styles.reminderTime}>{reminder.time}</Text>
                    <Text style={styles.reminderDate}>
                      Updated: {new Date(reminder.updatedAt || Date.now()).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={[
                    styles.statusPill,
                    reminder.status === 'Taken' && styles.statusTaken,
                    reminder.status === 'Pending' && styles.statusPending,
                    reminder.status === 'Skipped' && styles.statusSkipped,
                  ]}>
                    <Text style={styles.statusPillText}>{reminder.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Medical Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.medicalCard}>
            <View style={styles.medicalItem}>
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <View style={styles.medicalContent}>
                <Text style={styles.medicalLabel}>Side Effects</Text>
                <Text style={styles.medicalValue}>
                  Please consult your doctor for detailed information
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.medicalItem}>
              <Ionicons name="help-circle" size={20} color="#2563EB" />
              <View style={styles.medicalContent}>
                <Text style={styles.medicalLabel}>Drug Interactions</Text>
                <Text style={styles.medicalValue}>
                  Always inform your doctor about other medications
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Edit Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color="#FFF" />
            <Text style={styles.deleteButtonText}>Delete Medication</Text>
          </TouchableOpacity>
        </View>

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    marginTop: 12,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  medicationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  statusBadgeContainer: {
    marginTop: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803D',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  scheduleContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scheduleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  takenButton: {
    backgroundColor: '#10B981',
  },
  skippedButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  noScheduleText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  remindersContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  reminderStatusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  reminderDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  medicalCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
  },
  medicalItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  medicalContent: {
    flex: 1,
  },
  medicalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  medicalValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 12,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacing: {
    height: 20,
  },
});