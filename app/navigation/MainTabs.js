// app/navigation/MainTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddMedicationScreen from "../screens/AddMedicationScreen";
import StreakScreen from "../screens/StreakScreen";
import ReminderScreen from "../screens/ReminderScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "transparent",
          elevation: 5,
          height: 70,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AddMedicationScreen") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "StreakScreen") {
            iconName = focused ? "flame" : "flame-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={26} color={focused ? "#0A6EBD" : "#A0A0A0"} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="AddMedicationScreen" component={AddMedicationScreen} />
      <Tab.Screen name="StreakScreen" component={StreakScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Hidden screen for reminders */}
      <Tab.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{
          tabBarButton: () => null, // hide from tab bar
        }}
      />
    </Tab.Navigator>
  );
}
