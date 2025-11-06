import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../../screens/SplashScreen";
import OnboardingScreen from "../../screens/OnboardingScreen";
import SignupScreen from "../../screens/SignupScreen";
import LoginScreen from "../../screens/LoginScreen";
import PasscodeScreen from "../../screens/PasscodeScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Passcode" component={PasscodeScreen} />
    </Stack.Navigator>
  );
}
