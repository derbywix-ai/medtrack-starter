import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MedicationCard({ name, time, dosage, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E6F4EA",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#1B5E20" },
  dosage: { fontSize: 14, color: "#388E3C" },
  time: { fontSize: 12, color: "#4CAF50" },
});
