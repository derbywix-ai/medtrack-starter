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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { medicationService } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [todayReminders, setTodayReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  // Auto-refresh when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadDashboard();
    }, [])
  );

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Get user info
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }

      // Fetch medications
      const result = await medicationService.getMedications();
      if (result.success) {
        setMedications(result.data || []);
        
        // Filter today's reminders
        const todayMeds = (result.data || []).filter(med => {
          return med.schedule && med.schedule.length > 0;
        });

        setTodayReminders(todayMeds);
      }
    } catch (error) {
      console.error('❌ Load dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  const handleQuickMark = async (medicationId, time, status) => {
    try {
      const result = await medicationService.updateReminderStatus(medicationId, time, status);
      
      if (result.success) {
        Alert.alert('Success', `Marked as ${status}`);
        loadDashboard();
      } else {
        Alert.alert('Error', result.message || 'Failed to update');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
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
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <View>
            <Text style={styles.greetingText}>
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </Text>
            <Text style={styles.subtitleText}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#2563EB" />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="medical" size={24} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>{medications.length}</Text>
            <Text style={styles.statLabel}>Medications</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="notifications" size={24} color="#10B981" />
            </View>
            <Text style={styles.statValue}>{todayReminders.length}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="flame" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Today's Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Medications</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reminder')}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {todayReminders.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="checkmark-circle" size={48} color="#10B981" />
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptyText}>No medications scheduled for today</Text>
            </View>
          ) : (
            <View style={styles.medicationsListContainer}>
              {todayReminders.slice(0, 3).map((med, index) => (
                <TouchableOpacity
                  key={med._id || index}
                  style={styles.medicationListItem}
                  onPress={() => navigation.navigate('MedicationDetails', { medication: med })}
                >
                  <View style={styles.medicationListContent}>
                    <Text style={styles.medicationListName}>{med.name}</Text>
                    <Text style={styles.medicationListDosage}>{med.dosage}</Text>
                    <View style={styles.timesRow}>
                      {med.schedule?.slice(0, 2).map((time, idx) => (
                        <Text key={idx} style={styles.timeTag}>
                          {time}
                        </Text>
                      ))}
                      {med.schedule?.length > 2 && (
                        <Text style={styles.timeTag}>
                          +{med.schedule.length - 2}
                        </Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.quickMarkButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleQuickMark(med._id, med.schedule[0], 'Taken');
                    }}
                  >
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('AddMedication')}
            >
              <Ionicons name="add-circle" size={32} color="#2563EB" />
              <Text style={styles.quickActionText}>Add Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Reminder')}
            >
              <Ionicons name="list" size={32} color="#10B981" />
              <Text style={styles.quickActionText}>View Reminders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Streak')}
            >
              <Ionicons name="flame" size={32} color="#F59E0B" />
              <Text style={styles.quickActionText}>View Streaks</Text>
            </TouchableOpacity>
          </View>
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
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllLink: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803D',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  medicationsListContainer: {
    gap: 12,
  },
  medicationListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  medicationListContent: {
    flex: 1,
  },
  medicationListName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  medicationListDosage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  timesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  timeTag: {
    fontSize: 11,
    backgroundColor: '#DBEAFE',
    color: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '500',
  },
  quickMarkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  spacing: {
    height: 20,
  },
});