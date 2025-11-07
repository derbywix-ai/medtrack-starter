import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      image: require('../../assets/onboarding1.png'),
      title: 'Smart Medication Tracking',
      description: 'Never miss a dose. Get intelligent reminders for all your medications in one place.',
    },
    {
      id: 2,
      image: require('../../assets/onboarding2.png'),
      title: 'Track Your Progress',
      description: 'Monitor your medication adherence and stay on top of your health goals with detailed insights.',
    },
    {
      id: 3,
      image: require('../../assets/onboarding3.png'),
      title: 'Smart Reminders',
      description: 'Receive timely notifications so you never forget to take your medication on time.',
    },
  ];

  const step = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.onboardingContainer}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{currentStep} of 3</Text>
        </View>

        {/* Icon */}
        <View style={styles.onboardingImageContainer}>
          <Image 
            source={step.image}
            style={styles.onboardingImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.onboardingTextContainer}>
          <Text style={styles.onboardingTitle}>{step.title}</Text>
          <Text style={styles.onboardingDescription}>{step.description}</Text>
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {[1, 2, 3].map((dot) => (
            <View
              key={dot}
              style={[
                styles.dot,
                currentStep === dot && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.onboardingButtons}>
          <TouchableOpacity
            style={styles.onboardingSkip}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.onboardingSkipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.onboardingNext}
            onPress={handleNext}
          >
            <Text style={styles.onboardingNextText}>
              {currentStep === 3 ? 'Start' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  onboardingImageContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingImage: {
    width: 200,
    height: 200,
  },
  onboardingTextContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  onboardingDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    backgroundColor: '#2563EB',
    width: 24,
  },
  onboardingButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  onboardingSkip: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingSkipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  onboardingNext: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingNextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});