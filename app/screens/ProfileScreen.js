import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    // Set up a listener for storage changes
    const interval = setInterval(() => {
      checkAuth();
    }, 1000); // Check every second for auth changes
    
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkAuth();
    }, [])
  );

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const user = await AsyncStorage.getItem("user");
      
      console.log("🔍 Auth check - Token:", !!token, "User:", !!user);
      
      const loggedIn = token && user ? true : false;
      
      // Only update state if it changed
      setIsLoggedIn(prev => {
        if (prev !== loggedIn) {
          console.log(`🔄 Auth state changed: ${prev} → ${loggedIn}`);
          return loggedIn;
        }
        return prev;
      });
      
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}