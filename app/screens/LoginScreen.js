import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue using MedTrack</Text>

      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#888" />
        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#888" />

        <TouchableOpacity onPress={() => navigation.navigate("PasscodeScreen")} style={styles.forgotPassword}><Text style={styles.forgotPasswordText}>Forgot Password?</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Main")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", paddingHorizontal: 25, paddingTop: 100 },
  title: { fontSize: 28, fontWeight: "700", color: "#003366", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 40 },
  form: { width: "100%" },
  input: { backgroundColor: "#F5F8FA", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 14, marginBottom: 20, fontSize: 16, color: "#000", borderWidth: 1, borderColor: "#E0E6ED" },
  forgotPassword: { alignItems: "flex-end", marginBottom: 30 },
  forgotPasswordText: { color: "#007BFF", fontSize: 14, fontWeight: "500" },
  button: { backgroundColor: "#007BFF", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  signupText: { fontSize: 14, color: "#555", marginTop: 30 },
  signupLink: { color: "#007BFF", fontWeight: "600" },
});
