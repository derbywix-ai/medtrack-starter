import { Image, StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/onboarding1.png")} style={styles.image} />
      <Text style={styles.title}>Track Your Medications Easily</Text>
      <Text style={styles.subtitle}>Stay consistent and never miss a dose.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 250, height: 250, resizeMode: "contain" },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 20 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 10 },
});
