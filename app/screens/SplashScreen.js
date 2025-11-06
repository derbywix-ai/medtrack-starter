import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Onboarding"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  logo: { width: 150, height: 150, resizeMode: "contain" },
});
