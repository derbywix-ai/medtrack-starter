import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/onboarding1.png")} style={styles.image} />
      <Text style={styles.title}>Track Your Medications Easily</Text>
      <Text style={styles.subtitle}>Stay consistent and never miss a dose.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: "100%", height: 300, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E2E2E", textAlign: "center", marginTop: 20 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginVertical: 10 },
  button: { backgroundColor: "#6C63FF", padding: 15, borderRadius: 10, width: "80%", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
