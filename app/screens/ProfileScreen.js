import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/api";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await authService.signout();
    await AsyncStorage.removeItem("user");
    navigation.replace("AuthStack");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace("AuthStack")}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#007BFF" },
  card: { backgroundColor: "#f0f8ff", padding: 15, borderRadius: 10 },
  label: { color: "#555", marginTop: 10 },
  value: { fontSize: 16, fontWeight: "600", color: "#000" },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "600" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: { color: "#fff" },
});
