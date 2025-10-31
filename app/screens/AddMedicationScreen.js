import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!name || !time) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    Alert.alert("Success", `${name} added for ${time}`);
    navigation.goBack();
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

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#f0f0f0", padding: 15, borderRadius: 10, marginVertical: 10 },
  button: { backgroundColor: "#6C63FF", padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
