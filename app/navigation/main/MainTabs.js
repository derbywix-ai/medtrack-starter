import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import ReminderScreen from "../../screens/ReminderScreen";
import StreakScreen from "../../screens/StreakScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007BFF",
        tabBarStyle: { height: 62, paddingBottom: 6 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "HomeTab") return <Ionicons name="home" size={size} color={color} />;
          if (route.name === "RemindersTab") return <Ionicons name="notifications" size={size} color={color} />;
          if (route.name === "StreakTab") return <Ionicons name="flame" size={size} color={color} />;
          return <Ionicons name="person" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="RemindersTab" component={ReminderScreen} options={{ title: "Reminders" }} />
      <Tab.Screen name="StreakTab" component={StreakScreen} options={{ title: "Streak" }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}
