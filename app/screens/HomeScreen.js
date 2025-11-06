import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [medications, setMedications] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const meds = await AsyncStorage.getItem('medications');
        if (meds) setMedications(JSON.parse(meds));

        const savedStreak = await AsyncStorage.getItem('streak');
        if (savedStreak) setStreak(parseInt(savedStreak));
      } catch (error) {
        console.error(error);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const markAsTaken = async (id) => {
    const updated = medications.map((med) =>
      med.id === id ? { ...med, taken: true } : med
    );
    setMedications(updated);
    await AsyncStorage.setItem('medications', JSON.stringify(updated));
    setStreak(streak + 1);
    await AsyncStorage.setItem('streak', (streak + 1).toString());
    Alert.alert('✅ Medication marked as taken');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MedicationDetails', { med: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.medName}>{item.name}</Text>
        <Text style={styles.medTime}>{item.time}</Text>
      </View>
      {!item.taken ? (
        <TouchableOpacity onPress={() => markAsTaken(item.id)}>
          <Ionicons name="checkmark-circle-outline" size={30} color="#1B75D0" />
        </TouchableOpacity>
      ) : (
        <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello 👋</Text>
        <Text style={styles.subtitle}>Here’s your progress today</Text>
        <View style={styles.streakBox}>
          <Ionicons name="flame" size={24} color="#FFA500" />
          <Text style={styles.streakText}>{streak} Day Streak</Text>
        </View>
      </View>

      {/* Medication list */}
      <Text style={styles.sectionTitle}>Your Medications</Text>
      {medications.length === 0 ? (
        <Text style={styles.emptyText}>No medications yet. Add one below 👇</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Add Medication Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMedication')}
      >
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B75D0',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  streakBox: {
    marginTop: 15,
    backgroundColor: '#E8F1FB',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  streakText: {
    color: '#1B75D0',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B75D0',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  medTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  emptyText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#1B75D0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
