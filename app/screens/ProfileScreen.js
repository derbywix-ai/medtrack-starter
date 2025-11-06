import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await AsyncStorage.getItem("userProfile");
        if (userData) {
          const parsed = JSON.parse(userData);
          setName(parsed.name || "User");
          setAvatar(parsed.avatar || null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("loggedIn");
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={
            avatar === "male"
              ? require("../../assets/avatar_male.png")
              : require("../../assets/avatar_female.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>MedTrack User</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => Alert.alert("Coming Soon", "Edit profile not yet implemented")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B75D0",
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#1B75D0",
    width: "90%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    width: "90%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
