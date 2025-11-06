import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReminderScreen({ navigation }) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const s = await AsyncStorage.getItem("reminders");
      setReminders(s ? JSON.parse(s) : []);
    };
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  const remove = async (id) => {
    const next = reminders.filter((r) => r.id !== id);
    setReminders(next);
    await AsyncStorage.setItem("reminders", JSON.stringify(next));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddMedication")}>
          <Ionicons name="add-circle" size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {reminders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: "#666" }}>No reminders yet. Add a medication to create reminders.</Text>
        </View>
      ) : (
        <FlatList data={reminders} keyExtractor={(i) => i.id.toString()} renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.med}>{item.name}</Text>
              <Text style={styles.at}>{item.time}</Text>
            </View>
            <TouchableOpacity onPress={() => remove(item.id)}><Ionicons name="trash" size={20} color="#ff4d4f" /></TouchableOpacity>
          </View>
        )} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 20, paddingTop: 60 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "700", color: "#003366" },
  empty: { alignItems: "center", marginTop: 40 },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  med: { fontWeight: "700", color: "#003366" },
  at: { color: "#666", marginTop: 6 },
});
