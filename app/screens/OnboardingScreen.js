import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  const slides = [
    {
      id: 1,
      image: require("../../assets/onboarding1.png"),
      title: "Welcome to MedTrack",
      subtitle: "Never miss a dose. Track your medication progress and stay healthy.",
    },
    {
      id: 2,
      image: require("../../assets/onboarding2.png"),
      title: "Smart Reminders",
      subtitle: "Get notified when it's time to take your medication.",
    },
    {
      id: 3,
      image: require("../../assets/onboarding3.png"),
      title: "Track Progress",
      subtitle: "Build healthy habits with visual progress tracking.",
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsButtons={false}
        activeDotColor="#007AFF"
        paginationStyle={{ bottom: 50 }}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("LoginScreen")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  slide: { alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  image: { width: width * 0.8, height: height * 0.4, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: "700", color: "#000", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", lineHeight: 22 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 40,
    marginBottom: 60,
  },
  buttonText: { color: "#fff", fontWeight: "600", textAlign: "center", fontSize: 16 },
});
