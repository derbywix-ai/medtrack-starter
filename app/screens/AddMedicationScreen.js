// app/screens/AddMedicationScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const saveMedication = async () => {
    if (!name || !time) {
      Alert.alert("Please enter both medication name and time.");
      return;
    }

    try {
      const existing = JSON.parse(await AsyncStorage.getItem("medications")) || [];
      const updated = [...existing, { name, time }];
      await AsyncStorage.setItem("medications", JSON.stringify(updated));
      Alert.alert("Medication saved!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error saving medication.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g. 8:00 AM)"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={saveMedication}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#003366", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
