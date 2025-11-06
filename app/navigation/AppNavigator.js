import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, User, TrendingUp, Settings } from 'lucide-react';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs for main app after login
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 70, paddingBottom: 10, paddingTop: 10 },
      tabBarActiveTintColor: 'rgb(30,64,175)',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
      }}
    />
    <Tab.Screen
      name="Stats"
      component={HomeScreen} // Placeholder, replace with StatsScreen later
      options={{
        tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <User color={color} size={size} />
      }}
    />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
  </Stack.Navigator>
);

export default AppNavigator;
