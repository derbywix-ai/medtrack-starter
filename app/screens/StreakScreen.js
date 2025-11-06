import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StreakScreen() {
  const router = useRouter();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [adherenceRate, setAdherenceRate] = useState(0);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    const streak = await AsyncStorage.getItem('streak');
    const longest = await AsyncStorage.getItem('longestStreak');
    const rate = await AsyncStorage.getItem('adherenceRate');
    
    setCurrentStreak(streak ? parseInt(streak) : 0);
    setLongestStreak(longest ? parseInt(longest) : 0);
    setAdherenceRate(rate ? parseInt(rate) : 0);
  };

  // Generate calendar data for the last 7 weeks
  const generateCalendar = () => {
    const weeks = [];
    const today = new Date();
    
    for (let week = 0; week < 7; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - week) * 7 - (6 - day));
        
        // Simulate some adherence data
        const isCompleted = Math.random() > 0.3;
        const isFuture = date > today;
        
        days.push({
          date: date.getDate(),
          completed: isCompleted && !isFuture,
          isFuture
        });
      }
      weeks.push(days);
    }
    return weeks;
  };

  const calendar = generateCalendar();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Streak</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Streak */}
        <View style={styles.streakCard}>
          <Text style={styles.fireEmoji}>🔥</Text>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
          <Text style={styles.streakSubtext}>Keep it up! You're doing great</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={32} color="#F59E0B" />
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
            <Text style={styles.statNumber}>{adherenceRate}%</Text>
            <Text style={styles.statLabel}>Adherence Rate</Text>
          </View>
        </View>

        {/* Calendar Heatmap */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Activity</Text>
          
          <View style={styles.calendar}>
            <View style={styles.weekdays}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <Text key={i} style={styles.weekdayText}>{day}</Text>
              ))}
            </View>
            
            {calendar.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((day, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.day,
                      day.completed && styles.dayCompleted,
                      day.isFuture && styles.dayFuture
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>

          <View style={styles.legend}>
            <Text style={styles.legendText}>Less</Text>
            <View style={styles.legendDots}>
              <View style={[styles.legendDot, styles.legendDot0]} />
              <View style={[styles.legendDot, styles.legendDot1]} />
              <View style={[styles.legendDot, styles.legendDot2]} />
              <View style={[styles.legendDot, styles.legendDot3]} />
            </View>
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>🎯</Text>
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>Perfect Week</Text>
              <Text style={styles.achievementSubtitle}>Complete 7 days in a row</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
            </View>
          </View>

          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>⭐</Text>
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>30 Day Champion</Text>
              <Text style={styles.achievementSubtitle}>Maintain streak for 30 days</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
            </View>
          </View>

          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>💎</Text>
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>Consistency King</Text>
              <Text style={styles.achievementSubtitle}>90% adherence rate for a month</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  content: {
    flex: 1,
  },
  streakCard: {
    backgroundColor: '#5B67CA',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  fireEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  streakLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  streakSubtext: {
    fontSize: 14,
    color: '#E8EBFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  calendarSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    width: 32,
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  day: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  dayCompleted: {
    backgroundColor: '#5B67CA',
  },
  dayFuture: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  legendDots: {
    flexDirection: 'row',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendDot0: {
    backgroundColor: '#F3F4F6',
  },
  legendDot1: {
    backgroundColor: '#C7D2FE',
  },
  legendDot2: {
    backgroundColor: '#818CF8',
  },
  legendDot3: {
    backgroundColor: '#5B67CA',
  },
  achievementsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 32,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  achievementSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});