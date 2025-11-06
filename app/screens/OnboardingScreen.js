// app/screens/OnboardingScreen.js
import { useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Your Easy Medication Companion",
    subtitle: "Track your doses, get reminders, and manage prescriptions effortlessly.",
    image: require("../../assets/onboarding1.png"),
  },
  {
    id: 2,
    title: "Never Miss a Dose Again",
    subtitle: "Get timely reminders for every medication and stay on track with your health.",
    image: require("../../assets/onboarding2.png"),
  },
  {
    id: 3,
    title: "Manage Your Medications",
    subtitle: "Store and review all your meds in one organized place.",
    image: require("../../assets/onboarding3.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination
      activeDotColor="#007BFF"
      paginationStyle={{ bottom: 30 }}
    >
      {slides.map((slide, index) => (
        <View key={slide.id} style={styles.slide}>
          <Image source={slide.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (index === slides.length - 1) {
                navigation.replace("Signup");
              } else {
                swiperRef.current.scrollBy(1);
              }
            }}
          >
            <Text style={styles.buttonText}>
              {index === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.08,
  },
  image: {
    width: width * 0.65,
    height: width * 0.55,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    width: "75%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
