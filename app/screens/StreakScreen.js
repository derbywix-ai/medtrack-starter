import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Streak() {
  const [userGender, setUserGender] = useState("male");

  useEffect(() => {
    const loadGender = async () => {
      const gender = await AsyncStorage.getItem("userGender");
      if (gender) setUserGender(gender);
    };
    loadGender();
  }, []);

  const avatar =
    userGender === "female"
      ? require("../../assets/avatar_female.png")
      : require("../../assets/avatar_male.png");

  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.title}>Your Streak🔥</Text>
      <Text style={styles.streak}>5 Days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#003366" },
  streak: { fontSize: 40, fontWeight: "900", color: "#007BFF", marginTop: 10 },
});
