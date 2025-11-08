import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { medicationService } from '../services/api';

export default function AddMedicationScreen({ navigation }) {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setScheduleTime(selectedTime);
      if (event.type === 'set') {
        setShowTimePicker(false);
      }
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const addScheduleTime = () => {
    const timeString = formatTime(scheduleTime);
    
    // Check if time already added
    if (scheduleTimes.includes(timeString)) {
      Alert.alert('Info', 'This time is already added');
      return;
    }

    setScheduleTimes([...scheduleTimes, timeString].sort());
    setScheduleTime(new Date());
  };

  const removeScheduleTime = (index) => {
    const newTimes = scheduleTimes.filter((_, i) => i !== index);
    setScheduleTimes(newTimes);
  };

  const handleAddMedication = async () => {
    // Validation
    if (!medicationName.trim()) {
      Alert.alert('Error', 'Please enter medication name');
      return;
    }

    if (!dosage.trim()) {
      Alert.alert('Error', 'Please enter dosage');
      return;
    }

    if (scheduleTimes.length === 0) {
      Alert.alert('Error', 'Please add at least one schedule time');
      return;
    }

    setLoading(true);

    try {
      const medicationData = {
        name: medicationName.trim(),
        dosage: dosage.trim(),
        schedule: scheduleTimes,
      };

      console.log('Adding medication:', medicationData);

      const result = await medicationService.addMedication(medicationData);
      setLoading(false);

      if (result.success) {
        Alert.alert('Success', 'Medication added successfully!');
        
        // Reset form
        setMedicationName('');
        setDosage('');
        setScheduleTimes([]);
        setScheduleTime(new Date());

        // Navigate back or to medications list
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to add medication');
      }
    } catch (error) {
      setLoading(false);
      console.error('Add medication error:', error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={28} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Medication</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          {/* Medication Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medication Name *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="medical" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="e.g., Paracetamol, Ibuprofen"
                placeholderTextColor="#9CA3AF"
                value={medicationName}
                onChangeText={setMedicationName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
            </View>
            {focusedField === 'name' && (
              <Text style={styles.requirement}>• Enter the name of the medication</Text>
            )}
          </View>

          {/* Dosage */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dosage *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="flask" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="e.g., 500mg, 2 tablets"
                placeholderTextColor="#9CA3AF"
                value={dosage}
                onChangeText={setDosage}
                onFocus={() => setFocusedField('dosage')}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
            </View>
            {focusedField === 'dosage' && (
              <Text style={styles.requirement}>• Enter the dosage amount (e.g., "500mg", "2 tablets")</Text>
            )}
          </View>

          {/* Schedule Time Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Times *</Text>
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
              disabled={loading}
            >
              <Ionicons name="time" size={20} color="#2563EB" />
              <Text style={styles.timePickerText}>
                {formatTime(scheduleTime)}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={scheduleTime}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
            )}

            <TouchableOpacity
              style={[styles.addTimeButton, loading && styles.buttonDisabled]}
              onPress={addScheduleTime}
              disabled={loading}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.addTimeButtonText}>Add Time</Text>
            </TouchableOpacity>
          </View>

          {/* Schedule Times List */}
          {scheduleTimes.length > 0 && (
            <View style={styles.timesListContainer}>
              <Text style={styles.timesListTitle}>Schedule Times Added:</Text>
              {scheduleTimes.map((time, index) => (
                <View key={index} style={styles.timeItem}>
                  <View style={styles.timeItemContent}>
                    <Ionicons name="checkmark-circle" size={20} color="#059669" />
                    <Text style={styles.timeItemText}>{time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeScheduleTime(index)}
                    disabled={loading}
                  >
                    <Ionicons name="close-circle" size={20} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, loading && styles.buttonDisabled]}
          onPress={handleAddMedication}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator size="small" color="#FFF" />
              <Text style={styles.addButtonText}>Adding Medication...</Text>
            </>
          ) : (
            <>
              <Ionicons name="add" size={24} color="#FFF" />
              <Text style={styles.addButtonText}>Add Medication</Text>
            </>
          )}
        </TouchableOpacity>

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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  requirement: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
    gap: 10,
  },
  timePickerText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  addTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  addTimeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timesListContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginTop: 16,
  },
  timesListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 12,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  timeItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacing: {
    height: 20,
  },
});