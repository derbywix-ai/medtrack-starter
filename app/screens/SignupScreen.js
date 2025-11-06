import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const handleSignup = async () => {
    try {
      await AsyncStorage.setItem("userGender", gender);
      await AsyncStorage.setItem("userName", name);
      navigation.replace("Home");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[styles.genderButton, gender === "male" && styles.selected]}
          onPress={() => setGender("male")}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === "female" && styles.selected]}
          onPress={() => setGender("female")}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 25, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 },
  genderRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
  genderButton: { flex: 1, padding: 12, marginHorizontal: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 10 },
  selected: { backgroundColor: "#007BFF", borderColor: "#007BFF" },
  genderText: { color: "#003366", textAlign: "center", fontWeight: "bold" },
  button: { backgroundColor: "#007BFF", borderRadius: 10, padding: 15, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});
