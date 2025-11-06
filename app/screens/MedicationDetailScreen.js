import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function MedicationDetailsScreen({ route, navigation }) {
  const { medId } = route.params;
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    const loadMed = async () => {
      try {
        const stored = await AsyncStorage.getItem("medications");
        if (stored) {
          const meds = JSON.parse(stored);
          const med = meds.find((m) => m.id === medId);
          setMedication(med);
        }
      } catch (error) {
        console.error("Error loading medication:", error);
      }
    };
    loadMed();
  }, [medId]);

  const markAsTaken = async () => {
    try {
      const stored = await AsyncStorage.getItem("medications");
      const meds = JSON.parse(stored);
      const updated = meds.map((m) =>
        m.id === medId ? { ...m, taken: true } : m
      );
      await AsyncStorage.setItem("medications", JSON.stringify(updated));
      Alert.alert("✅ Success", "Medication marked as taken!");
      navigation.goBack();
    } catch (error) {
      console.error("Error marking medication:", error);
    }
  };

  const deleteMedication = async () => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem("medications");
              const meds = JSON.parse(stored);
              const updated = meds.filter((m) => m.id !== medId);
              await AsyncStorage.setItem(
                "medications",
                JSON.stringify(updated)
              );
              Alert.alert("Deleted", "Medication removed.");
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting medication:", error);
            }
          },
        },
      ]
    );
  };

  if (!medication) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#1B75D0" }}>Loading medication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="medkit-outline" size={60} color="#1B75D0" />
        <Text style={styles.name}>{medication.name}</Text>
        <Text style={styles.dosage}>{medication.dosage}</Text>
        <Text style={styles.time}>🕒 {medication.time}</Text>

        {medication.taken ? (
          <Text style={styles.takenText}>✅ Already Taken</Text>
        ) : (
          <Text style={styles.notTakenText}>❌ Not Taken Yet</Text>
        )}
      </View>

      {!medication.taken && (
        <TouchableOpacity style={styles.markButton} onPress={markAsTaken}>
          <Text style={styles.markText}>Mark as Taken</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={deleteMedication}>
        <Text style={styles.deleteText}>Delete Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F8FBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1B75D0",
    marginTop: 10,
  },
  dosage: {
    fontSize: 18,
    color: "#333",
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  takenText: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
    fontWeight: "600",
  },
  notTakenText: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
  markButton: {
    backgroundColor: "#1B75D0",
    paddingVertical: 16,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
  },
  markText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
