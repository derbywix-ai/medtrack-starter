import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <View style={styles.splashContainer}>
        <View style={styles.splashContent}>
          <View style={styles.splashIcon}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.splashSubtitle}>Your Medication Companion</Text>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3700ffff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.splashButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.splashButtonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIcon: {
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  splashTitleMed: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2563EB',
    marginRight: 4,
  },
  splashTitleTrack: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#4e76fcff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  splashButton: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  splashButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
});