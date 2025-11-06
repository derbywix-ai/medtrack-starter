import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp } from 'lucide-react';

const MOCK_STATS = {
  totalDoses: 120,
  dosesTaken: 100,
  adherenceRate: 83, // in percent
  longestStreak: 14, // days
};

const StatsScreen = () => {
  const { totalDoses, dosesTaken, adherenceRate, longestStreak } = MOCK_STATS;

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 px-2">
        <Text className="text-3xl font-extrabold text-blue-700">Stats</Text>
      </View>

      {/* Summary Cards */}
      <View className="space-y-4 mt-4">
        <View className="bg-white p-4 rounded-2xl shadow-lg">
          <Text className="text-gray-500 font-semibold">Total Doses</Text>
          <Text className="text-xl font-bold text-gray-800">{totalDoses}</Text>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow-lg">
          <Text className="text-gray-500 font-semibold">Doses Taken</Text>
          <Text className="text-xl font-bold text-gray-800">{dosesTaken}</Text>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow-lg">
          <Text className="text-gray-500 font-semibold">Adherence Rate</Text>
          <Text className="text-xl font-bold text-green-600">{adherenceRate}%</Text>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow-lg">
          <Text className="text-gray-500 font-semibold">Longest Streak</Text>
          <Text className="text-xl font-bold text-blue-600">{longestStreak} days</Text>
        </View>
      </View>
    </View>
  );
};

export default StatsScreen;
