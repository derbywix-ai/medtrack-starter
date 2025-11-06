import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saveMedication = async () => {
    if (!name.trim() || !dosage.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const newMed = {
      id: Date.now(),
      name,
      dosage,
      time: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      taken: false,
    };

    try {
      const existing = await AsyncStorage.getItem("medications");
      const meds = existing ? JSON.parse(existing) : [];
      meds.push(newMed);
      await AsyncStorage.setItem("medications", JSON.stringify(meds));
      alert("Medication saved ✅");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Medication</Text>

      {/* Name Input */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Medication Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Paracetamol"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Dosage Input */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Dosage</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 500mg"
          value={dosage}
          onChangeText={setDosage}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Time Picker */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.timePicker}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="time-outline" size={22} color="#1B75D0" />
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={onTimeChange}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveMedication}>
        <Text style={styles.saveText}>Save Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
    padding: 25,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B75D0",
    marginBottom: 25,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    color: "#1B75D0",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: "#1B75D0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
