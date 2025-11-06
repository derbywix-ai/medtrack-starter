import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [userGender, setUserGender] = useState("male");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      const gender = await AsyncStorage.getItem("userGender");
      const name = await AsyncStorage.getItem("userName");
      if (gender) setUserGender(gender);
      if (name) setUserName(name);
    };
    loadUser();
  }, []);

  const avatar =
    userGender === "female"
      ? require("../../assets/avatar_female.png")
      : require("../../assets/avatar_male.png");

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.name}>{userName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#003366" },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 10,
    width: "70%",
    marginTop: 25,
  },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});
