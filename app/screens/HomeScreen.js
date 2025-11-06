import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [userGender, setUserGender] = useState("male");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const gender = await AsyncStorage.getItem("userGender");
        const name = await AsyncStorage.getItem("userName");
        if (gender) setUserGender(gender);
        if (name) setUserName(name);
      } catch (error) {
        console.warn("Failed to load user data:", error);
      }
    };
    loadUser();
  }, []);

  const avatar =
    userGender === "female"
      ? require("../../assets/avatar_female.png")
      : require("../../assets/avatar_male.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.welcome}>Hi, {userName} 👋</Text>
        <Text style={styles.subtext}>Stay on top of your meds today</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddMedication")}
        >
          <Text style={styles.buttonText}>Add Medication</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Streak")}
        >
          <Text style={styles.buttonText}>View Streak</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25 },
  header: { alignItems: "center", marginTop: 60 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  welcome: { fontSize: 22, fontWeight: "bold", color: "#003366" },
  subtext: { fontSize: 14, color: "#666", marginTop: 5 },
  buttons: { marginTop: 50 },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
