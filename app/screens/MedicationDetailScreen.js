import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function MedicationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [medication, setMedication] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadMedication();
  }, []);

  const loadMedication = async () => {
    const medsStr = await AsyncStorage.getItem('medications');
    if (medsStr) {
      const meds = JSON.parse(medsStr);
      const med = meds[parseInt(id)];
      setMedication(med);
      
      // Simulate history data
      const historyData = [
        { date: 'Today, 9:00 AM', taken: true, time: '9:05 AM' },
        { date: 'Yesterday, 9:00 AM', taken: true, time: '9:02 AM' },
        { date: '2 days ago, 9:00 AM', taken: false, time: 'Missed' },
        { date: '3 days ago, 9:00 AM', taken: true, time: '9:10 AM' },
      ];
      setHistory(historyData);
    }
  };

  const handleMarkAsTaken = async () => {
    if (!medication) return;
    
    const medsStr = await AsyncStorage.getItem('medications');
    if (medsStr) {
      const meds = JSON.parse(medsStr);
      meds[parseInt(id)].taken = true;
      await AsyncStorage.setItem('medications', JSON.stringify(meds));
      
      // Update streak
      const streak = await AsyncStorage.getItem('streak');
      const currentStreak = streak ? parseInt(streak) : 0;
      await AsyncStorage.setItem('streak', (currentStreak + 1).toString());
      
      setMedication({ ...medication, taken: true });
      Alert.alert('Success', 'Medication marked as taken!');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Medication',
      'Are you sure you want to delete this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const medsStr = await AsyncStorage.getItem('medications');
            if (medsStr) {
              const meds = JSON.parse(medsStr);
              meds.splice(parseInt(id), 1);
              await AsyncStorage.setItem('medications', JSON.stringify(meds));
              router.back();
            }
          }
        }
      ]
    );
  };

  if (!medication) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

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
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medication Info */}
        <View style={styles.medHeader}>
          <View style={[styles.medIcon, { backgroundColor: medication.color || '#E8EBFF' }]}>
            <Ionicons name="medkit" size={48} color="#5B67CA" />
          </View>
          <Text style={styles.medName}>{medication.name}</Text>
          <Text style={styles.medDosage}>{medication.dosage}</Text>
          
          <View style={[styles.statusBadge, medication.taken && styles.statusBadgeTaken]}>
            <Text style={[styles.statusText, medication.taken && styles.statusTextTaken]}>
              {medication.taken ? 'Taken' : 'Pending'}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        {!medication.taken && (
          <TouchableOpacity style={styles.takeButton} onPress={handleMarkAsTaken}>
            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
            <Text style={styles.takeButtonText}>Mark as Taken</Text>
          </TouchableOpacity>
        )}

        {/* Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name="time-outline" size={20} color="#6B7280" />
                <Text style={styles.detailLabel}>Time</Text>
              </View>
              <Text style={styles.detailValue}>{formatTime(medication.time)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name="repeat-outline" size={20} color="#6B7280" />
                <Text style={styles.detailLabel}>Frequency</Text>
              </View>
              <Text style={styles.detailValue}>{medication.frequency}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Ionicons name="calculator-outline" size={20} color="#6B7280" />
                <Text style={styles.detailLabel}>Dosage</Text>
              </View>
              <Text style={styles.detailValue}>{medication.dosage}</Text>
            </View>

            {medication.notes && (
              <>
                <View style={styles.divider} />
                <View style={styles.notesRow}>
                  <View style={styles.detailLeft}>
                    <Ionicons name="document-text-outline" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Notes</Text>
                  </View>
                  <Text style={styles.notesText}>{medication.notes}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>History</Text>
          
          {history.map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={[
                styles.historyIcon,
                item.taken ? styles.historyIconTaken : styles.historyIconMissed
              ]}>
                <Ionicons 
                  name={item.taken ? "checkmark" : "close"} 
                  size={16} 
                  color={item.taken ? "#10B981" : "#EF4444"} 
                />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={[
                  styles.historyStatus,
                  item.taken ? styles.historyStatusTaken : styles.historyStatusMissed
                ]}>
                  {item.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="pencil-outline" size={20} color="#5B67CA" />
            <Text style={styles.actionText}>Edit Medication</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#5B67CA" />
            <Text style={styles.actionText}>Share Details</Text>
          </TouchableOpacity>
        </View>
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
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  medHeader: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  medIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  medName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  medDosage: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
  },
  statusBadgeTaken: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  statusTextTaken: {
    color: '#10B981',
  },
  takeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#5B67CA',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  takeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#374151',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  notesRow: {
    paddingTop: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 20,
  },
  historySection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyIconTaken: {
    backgroundColor: '#D1FAE5',
  },
  historyIconMissed: {
    backgroundColor: '#FEE2E2',
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  historyStatus: {
    fontSize: 12,
  },
  historyStatusTaken: {
    color: '#10B981',
  },
  historyStatusMissed: {
    color: '#EF4444',
  },
  actionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5B67CA',
  },
});