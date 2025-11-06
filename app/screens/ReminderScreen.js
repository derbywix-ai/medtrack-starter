import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ReminderScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState([]);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const meds = await AsyncStorage.getItem('medications');
    if (meds) setMedications(JSON.parse(meds));
    
    const enabled = await AsyncStorage.getItem('remindersEnabled');
    if (enabled !== null) setRemindersEnabled(enabled === 'true');
  };

  const toggleReminders = async (value) => {
    setRemindersEnabled(value);
    await AsyncStorage.setItem('remindersEnabled', value.toString());
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Reminders Toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIcon}>
              <Ionicons name="notifications" size={24} color="#5B67CA" />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Enable Reminders</Text>
              <Text style={styles.toggleSubtitle}>Get notified for your medications</Text>
            </View>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={toggleReminders}
            trackColor={{ false: '#D1D5DB', true: '#A5B4FC' }}
            thumbColor={remindersEnabled ? '#5B67CA' : '#F3F4F6'}
          />
        </View>

        {/* Upcoming Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          
          {medications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="alarm-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>No reminders set</Text>
              <Text style={styles.emptySubtext}>Add medications to set up reminders</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push('/add-medication')}
              >
                <Text style={styles.addButtonText}>Add Medication</Text>
              </TouchableOpacity>
            </View>
          ) : (
            medications.map((med, index) => (
              <View key={index} style={styles.reminderCard}>
                <View style={styles.timeSection}>
                  <Text style={styles.time}>{formatTime(med.time)}</Text>
                  <Text style={styles.frequency}>{med.frequency}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.medSection}>
                  <View style={[styles.medIcon, { backgroundColor: med.color || '#E8EBFF' }]}>
                    <Ionicons name="medkit" size={20} color="#5B67CA" />
                  </View>
                  <View style={styles.medDetails}>
                    <Text style={styles.medName}>{med.name}</Text>
                    <Text style={styles.medDosage}>{med.dosage}</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Reminder Settings */}
        {medications.length > 0 && (
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Reminder Settings</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="time-outline" size={24} color="#6B7280" />
                <Text style={styles.settingText}>Reminder Time Before</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>15 min</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="refresh-outline" size={24} color="#6B7280" />
                <Text style={styles.settingText}>Repeat Reminder</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>3 times</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="volume-high-outline" size={24} color="#6B7280" />
                <Text style={styles.settingText}>Sound</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>Default</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  content: {
    flex: 1,
  },
  toggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  toggleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8EBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 24,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#5B67CA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  timeSection: {
    marginBottom: 16,
  },
  time: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  frequency: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  medSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medDetails: {
    flex: 1,
    marginLeft: 12,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  medDosage: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
});