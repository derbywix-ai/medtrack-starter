import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function StreakScreen() {
  const [streak, setStreak] = useState(0);
  const [takenDays, setTakenDays] = useState([]);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const medsData = await AsyncStorage.getItem("medications");
      if (!medsData) return;

      const meds = JSON.parse(medsData);
      const today = new Date().toDateString();

      // extract unique days with taken meds
      const days = meds
        .filter((m) => m.taken)
        .map((m) => new Date(m.id).toDateString());
      const uniqueDays = [...new Set(days)];
      setTakenDays(uniqueDays);

      // calculate consecutive streak
      let currentStreak = 0;
      const sortedDays = uniqueDays
        .map((d) => new Date(d))
        .sort((a, b) => b - a);

      let previousDate = new Date(today);
      for (const d of sortedDays) {
        const diff = (previousDate - d) / (1000 * 60 * 60 * 24);
        if (diff === 0 || diff === 1) {
          currentStreak++;
          previousDate = d;
        } else break;
      }

      setStreak(currentStreak);
    } catch (error) {
      console.error("Error loading streak:", error);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
      const label = day.toLocaleDateString("en-US", { weekday: "short" });
      const isTaken = takenDays.includes(day.toDateString());

      days.push(
        <View key={i} style={styles.dayContainer}>
          <View
            style={[
              styles.circle,
              { backgroundColor: isTaken ? "#1B75D0" : "#C6D8EE" },
            ]}
          />
          <Text
            style={[
              styles.dayLabel,
              { color: isTaken ? "#1B75D0" : "#888" },
            ]}
          >
            {label}
          </Text>
        </View>
      );
    }

    return <View style={styles.calendarRow}>{days}</View>;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Streak 🔥</Text>

      <View style={styles.streakCard}>
        <Ionicons name="flame-outline" size={60} color="#FF6B00" />
        <Text style={styles.streakCount}>{streak} Days</Text>
        <Text style={styles.streakText}>Consecutive Medication Streak</Text>
      </View>

      <Text style={styles.subHeader}>This Week</Text>
      {renderCalendar()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FBFF",
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1B75D0",
    marginBottom: 25,
  },
  streakCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 40,
  },
  streakCount: {
    fontSize: 38,
    fontWeight: "700",
    color: "#FF6B00",
    marginTop: 10,
  },
  streakText: {
    color: "#666",
    marginTop: 5,
    fontSize: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B75D0",
    marginBottom: 20,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    alignItems: "center",
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginBottom: 6,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
});
