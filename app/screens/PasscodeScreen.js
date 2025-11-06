import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasscodeScreen({ navigation }) {
  const [code, setCode] = useState("");
  const [stored, setStored] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem("passcode");
      setStored(s);
    })();
  }, []);

  const submit = async () => {
    if (stored) {
      if (code === stored) navigation.replace("Main");
      else Alert.alert("Wrong passcode", "Please try again.");
    } else {
      // set initial passcode
      if (code.length === 4) {
        await AsyncStorage.setItem("passcode", code);
        Alert.alert("Passcode set", "You can now use this code.");
        navigation.replace("Main");
      } else Alert.alert("Enter 4 digits", "Passcode must be 4 digits.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter 4-digit passcode</Text>
      <TextInput keyboardType="numeric" value={code} onChangeText={(t) => setCode(t.replace(/[^0-9]/g, ""))} maxLength={4} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={submit}><Text style={styles.buttonText}>Continue</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "700", color: "#003366", marginBottom: 20 },
  input: { width: 200, textAlign: "center", fontSize: 24, padding: 12, borderWidth: 1, borderColor: "#E0E6ED", borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: "#007BFF", padding: 12, borderRadius: 10, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});
