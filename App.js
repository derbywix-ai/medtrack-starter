// App.js - MedTrack React Native Application (JavaScript version)

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Twice daily',
      times: ['08:00 AM', '08:00 PM'],
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      color: '#4F46E5',
      taken: 14,
      total: 30,
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      times: ['09:00 AM'],
      startDate: '2025-11-01',
      endDate: '2025-12-01',
      color: '#F59E0B',
      taken: 6,
      total: 30,
    },
  ]);

  const [selectedMed, setSelectedMed] = useState(null);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    time: '08:00',
    duration: 7,
  });

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getProgress = (taken, total) => {
    return Math.round((taken / total) * 100);
  };

  const handleTakeMedication = (medId) => {
    setMedications(
      medications.map((med) =>
        med.id === medId ? { ...med, taken: med.taken + 1 } : med
      )
    );
    if (selectedMed) {
      setSelectedMed({ ...selectedMed, taken: selectedMed.taken + 1 });
    }
  };

  const handleAddMedication = () => {
    const frequencies = { once: 1, twice: 2, three: 3 };
    const total = frequencies[newMed.frequency] * newMed.duration;
    const today = new Date();
    const endDate = new Date(today.getTime() + newMed.duration * 24 * 60 * 60 * 1000);

    const newMedication = {
      id: medications.length + 1,
      name: newMed.name,
      dosage: newMed.dosage,
      frequency:
        newMed.frequency === 'once'
          ? 'Once daily'
          : newMed.frequency === 'twice'
          ? 'Twice daily'
          : 'Three times daily',
      times: [newMed.time],
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      color: '#10B981',
      taken: 0,
      total: total,
    };

    setMedications([...medications, newMedication]);
    setCurrentScreen('home');
    setNewMed({ name: '', dosage: '', frequency: 'once', time: '08:00', duration: 7 });
  };

  // Onboarding Screen
  if (currentScreen === 'onboarding') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.onboardingContainer}>
          <View style={styles.onboardingCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="medical" size={64} color="#4F46E5" />
            </View>

            <Text style={styles.onboardingTitle}>Welcome to MedTrack</Text>
            <Text style={styles.onboardingSubtitle}>
              Never miss a dose. Track your medication progress and stay healthy.
            </Text>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
                  <Ionicons name="notifications" size={24} color="#3B82F6" />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Smart Reminders</Text>
                  <Text style={styles.featureDesc}>Get notified when it's time to take your medication</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
                  <Ionicons name="calendar" size={24} color="#10B981" />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Track Progress</Text>
                  <Text style={styles.featureDesc}>See your medication history and adherence</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#E9D5FF' }]}>
                  <Ionicons name="trending-up" size={24} color="#9333EA" />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Stay Consistent</Text>
                  <Text style={styles.featureDesc}>Build healthy habits with visual progress tracking</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Add Medication Screen
  if (currentScreen === 'add') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('home')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Add Medication</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Medication Name</Text>
              <TextInput
                style={styles.input}
                value={newMed.name}
                onChangeText={(text) => setNewMed({ ...newMed, name: text })}
                placeholder="e.g., Amoxicillin"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dosage</Text>
              <TextInput
                style={styles.input}
                value={newMed.dosage}
                onChangeText={(text) => setNewMed({ ...newMed, dosage: text })}
                placeholder="e.g., 500mg"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Frequency</Text>
              <View style={styles.frequencyButtons}>
                {['once', 'twice', 'three'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyButton,
                      newMed.frequency === freq && styles.frequencyButtonActive,
                    ]}
                    onPress={() => setNewMed({ ...newMed, frequency: freq })}
                  >
                    <Text
                      style={[
                        styles.frequencyButtonText,
                        newMed.frequency === freq && styles.frequencyButtonTextActive,
                      ]}
                    >
                      {freq === 'once' ? 'Once' : freq === 'twice' ? 'Twice' : 'Three times'} daily
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (days)</Text>
              <TextInput
                style={styles.input}
                value={String(newMed.duration)}
                onChangeText={(text) =>
                  setNewMed({ ...newMed, duration: parseInt(text) || 0 })
                }
                keyboardType="numeric"
                placeholder="7"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleAddMedication}
            >
              <Text style={styles.primaryButtonText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Detail and Home screens remain unchanged (just remove types)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.homeHeader}>
          <View>
            <Text style={styles.homeTitle}>MedTrack</Text>
            <Text style={styles.homeDate}>Today, {new Date().toDateString()}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCurrentScreen('add')}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Medications</Text>

        {medications.map((med) => (
          <TouchableOpacity
            key={med.id}
            style={styles.medCard}
            onPress={() => {
              setSelectedMed(med);
              setCurrentScreen('detail');
            }}
          >
            <View style={styles.medCardContent}>
              <View style={[styles.medIconSmall, { backgroundColor: med.color + '30' }]}>
                <Ionicons name="medical" size={28} color={med.color} />
              </View>
              <View style={styles.medCardInfo}>
                <Text style={styles.medCardTitle}>{med.name}</Text>
                <Text style={styles.medCardSubtitle}>
                  {med.dosage} • {med.frequency}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollView: { flex: 1, paddingHorizontal: 20 },

  onboardingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  onboardingCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 32, width: '100%', maxWidth: 400 },
  iconCircle: { width: 128, height: 128, borderRadius: 64, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  onboardingTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 12 },
  onboardingSubtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 24 },
  featureList: { marginBottom: 32 },
  featureItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  featureIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  featureDesc: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  primaryButton: { backgroundColor: '#4F46E5', paddingVertical: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  header: { paddingTop: 20, paddingBottom: 16 },
  backButton: { fontSize: 16, color: '#4F46E5', fontWeight: '600' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 16 },
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingBottom: 24 },
  homeTitle: { fontSize: 32, fontWeight: 'bold', color: '#111827' },
  homeDate: { fontSize: 16, color: '#6B7280', marginTop: 4 },
  addButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  medCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 16 },
  medCardContent: { flexDirection: 'row' },
  medIconSmall: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  medCardInfo: { flex: 1 },
  medCardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  medCardSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  formCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 24, marginTop: 8 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 16, color: '#111827' },
  frequencyButtons: { gap: 8 },
  frequencyButton: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, backgroundColor: '#FFF' },
  frequencyButtonActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  frequencyButtonText: { fontSize: 16, color: '#374151', textAlign: 'center' },
  frequencyButtonTextActive: { color: '#FFF', fontWeight: '600' },
});
