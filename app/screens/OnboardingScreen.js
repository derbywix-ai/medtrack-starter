import { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      key: '1',
      title: 'Smarter Medication Tracking',
      text: 'Track your daily medications easily and never miss a dose.',
      image: require('../../assets/onboarding1.png'),
    },
    {
      key: '2',
      title: 'Reminders That Work',
      text: 'Get timely alerts to take your medications on schedule.',
      image: require('../../assets/onboarding2.png'),
    },
    {
      key: '3',
      title: 'Monitor Your Progress',
      text: 'Stay motivated by tracking your medication streaks and history.',
      image: require('../../assets/onboarding3.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        activeDotColor="#1B75D0"
        dotColor="#C6D8EE"
        onIndexChanged={(i) => setIndex(i)}
      >
        {slides.map((item) => (
          <View style={styles.slide} key={item.key}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </Swiper>

      <View style={styles.bottomContainer}>
        {index === slides.length - 1 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.skip}
            onPress={() => swiperRef.current.scrollBy(1)}
          >
            <Text style={styles.skipText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B75D0',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#1B75D0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skip: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  skipText: {
    color: '#1B75D0',
    fontSize: 15,
    fontWeight: '500',
  },
});
