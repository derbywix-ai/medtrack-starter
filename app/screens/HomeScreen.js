import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import MedicationCard from "../components/MedicationCard";

export default function HomeScreen({ navigation }) {
  const meds = [
    { id: "1", name: "Amoxicillin", time: "8:00 AM" },
    { id: "2", name: "Vitamin D", time: "2:00 PM" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Medications</Text>

      <FlatList
        data={meds}
        renderItem={({ item }) => <MedicationCard med={item} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddMedication")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#6C63FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 32 },
});
