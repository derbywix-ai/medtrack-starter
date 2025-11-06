// app/screens/ReminderScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ReminderScreen() {
  const [medication, setMedication] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const scheduleReminder = async () => {
    if (!medication) {
      Alert.alert("Enter medication name");
      return;
    }

    const trigger = new Date(time);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medication Reminder 💊",
        body: `Time to take your ${medication}!`,
      },
      trigger,
    });

    const reminders = JSON.parse(await AsyncStorage.getItem("reminders")) || [];
    reminders.push({ medication, time });
    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));

    Alert.alert("Saved!", `Reminder set for ${medication}`);
    setMedication("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Medication Reminder</Text>

      <TextInput
        placeholder="Medication name"
        style={styles.input}
        value={medication}
        onChangeText={setMedication}
      />

      <TouchableOpacity style={styles.pickerButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.pickerText}>
          {time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Pick Time"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour
          display="spinner"
          onChange={(event, selected) => {
            setShowPicker(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={scheduleReminder}>
        <Text style={styles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FBFF",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0A6EBD",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  pickerButton: {
    backgroundColor: "#E3F2FD",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  pickerText: {
    color: "#0A6EBD",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#00C48C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
