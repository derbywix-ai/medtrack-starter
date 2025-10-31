import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReminderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      <Text style={styles.subtitle}>You have no reminders yet ⏰</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E2E2E" },
  subtitle: { fontSize: 16, color: "#777", marginTop: 10 },
});
