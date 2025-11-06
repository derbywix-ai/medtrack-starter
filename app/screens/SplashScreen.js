import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace("Onboarding"), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/onboarding1.png")} style={styles.logo} />
      <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 150, height: 150, resizeMode: "contain" },
});
