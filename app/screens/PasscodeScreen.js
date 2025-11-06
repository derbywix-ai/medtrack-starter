// app/screens/PasscodeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasscodeScreen({ navigation }) {
  const [storedPasscode, setStoredPasscode] = useState(null);
  const [passcode, setPasscode] = useState("");
  const [step, setStep] = useState("create"); // create | confirm | unlock
  const [tempCode, setTempCode] = useState("");

  useEffect(() => {
    const checkExisting = async () => {
      const saved = await AsyncStorage.getItem("passcode");
      if (saved) setStep("unlock");
    };
    checkExisting();
  }, []);

  const handlePress = async () => {
    if (step === "unlock") {
      if (passcode === storedPasscode || passcode === (await AsyncStorage.getItem("passcode"))) {
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Incorrect", "Try again!");
        setPasscode("");
      }
    } else if (step === "create") {
      setTempCode(passcode);
      setPasscode("");
      setStep("confirm");
    } else if (step === "confirm") {
      if (passcode === tempCode) {
        await AsyncStorage.setItem("passcode", passcode);
        Alert.alert("Success", "Passcode set successfully!");
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Mismatch", "Passcodes do not match");
        setPasscode("");
        setStep("create");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "unlock"
          ? "Enter Passcode"
          : step === "confirm"
          ? "Confirm Passcode"
          : "Set a Passcode"}
      </Text>

      <TextInput
        style={styles.input}
        value={passcode}
        onChangeText={(text) => setPasscode(text.replace(/[^0-9]/g, "").slice(0, 4))}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{step === "unlock" ? "Unlock" : "Continue"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FBFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: "#0A6EBD",
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "50%",
    fontSize: 28,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0A6EBD",
    marginBottom: 30,
    letterSpacing: 10,
    color: "#0A6EBD",
  },
  button: {
    backgroundColor: "#00C48C",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
