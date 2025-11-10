import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ReminderScreen from "../screens/ReminderScreen";
import AddMedicationScreen from "../screens/AddMedicationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StreakScreen from "../screens/StreakScreen";
import MedicationDetailScreen from "../screens/MedicationDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack - allows navigation to MedicationDetailScreen
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="MedicationDetails" component={MedicationDetailScreen} />
      <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
    </Stack.Navigator>
  );
}

// Reminder Stack - allows navigation to MedicationDetailScreen
function ReminderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReminderTab" component={ReminderScreen} />
      <Stack.Screen name="MedicationDetails" component={MedicationDetailScreen} />
    </Stack.Navigator>
  );
}

// Streak Stack - allows navigation to MedicationDetailScreen
function StreakStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StreakTab" component={StreakScreen} />
      <Stack.Screen name="MedicationDetails" component={MedicationDetailScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Reminder") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "AddMedication") {
            iconName = "add-circle";
          } else if (route.name === "Streak") {
            iconName = focused ? "flame" : "flame-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopColor: "#E5E7EB",
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen 
        name="Reminder" 
        component={ReminderStack}
        options={{
          tabBarLabel: "Reminders",
        }}
      />
      <Tab.Screen 
        name="AddMedication" 
        component={AddMedicationScreen}
        options={{
          tabBarLabel: "Add",
        }}
      />
      <Tab.Screen 
        name="Streak" 
        component={StreakStack}
        options={{
          tabBarLabel: "Streaks",
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}