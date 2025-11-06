// app/navigation/AuthStack.js
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import PasscodeScreen from "../screens/PasscodeScreen";
import ReminderScreen from "../screens/ReminderScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Onboarding flow */}
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />

      {/* Authentication screens */}
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

      {/* Post-signup setup */}
      <Stack.Screen name="PasscodeScreen" component={PasscodeScreen} />

      {/* Optional feature screen */}
      <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
    </Stack.Navigator>
  );
}
