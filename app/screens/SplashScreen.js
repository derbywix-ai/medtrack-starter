import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    if (navigation && navigation.replace) {
      navigation.replace("Onboarding");
    } else {
      console.warn("Navigation not ready yet!");
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: { width: 150, height: 150, resizeMode: "contain" },
});
