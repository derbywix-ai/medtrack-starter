import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicationService } from '../services/api';

export default function StreakScreen({ navigation }) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    fetchStreakData();
  }, []);

  const fetchStreakData = async () => {
    try {
      setLoading(true);
      const result = await medicationService.getMedications();

      if (result.success) {
        const meds = result.data || [];
        setMedications(meds);

        // Calculate streaks
        const calculatedStreaks = meds.map(med => {
          let streak = 0;
          let currentStreak = 0;

          if (med.reminders && med.reminders.length > 0) {
            // Sort reminders by date (newest first)
            const sortedReminders = [...med.reminders].sort((a, b) => {
              const dateA = new Date(a.updatedAt || a.createdAt).getTime();
              const dateB = new Date(b.updatedAt || b.createdAt).getTime();
              return dateB - dateA;
            });

            // Count consecutive "Taken" status
            for (let reminder of sortedReminders) {
              if (reminder.status === 'Taken') {
                currentStreak++;
              } else {
                break;
              }
            }

            streak = currentStreak;
          }

          return {
            medicationId: med._id,
            medicationName: med.name,
            dosage: med.dosage,
            streak: streak,
            totalReminders: med.reminders ? med.reminders.length : 0,
            adherenceRate: med.reminders
              ? Math.round(
                  (med.reminders.filter(r => r.status === 'Taken').length /
                    med.reminders.length) *
                    100
                )
              : 0,
          };
        });

        setStreaks(calculatedStreaks.sort((a, b) => b.streak - a.streak));
      }
    } catch (error) {
      console.error('Fetch streak error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStreakData();
    setRefreshing(false);
  };

  const getTotalStreak = () => {
    return streaks.reduce((total, med) => total + med.streak, 0);
  };

  const getAverageAdherence = () => {
    if (streaks.length === 0) return 0;
    const total = streaks.reduce((sum, med) => sum + med.adherenceRate, 0);
    return Math.round(total / streaks.length);
  };

  const getStreakIcon = (streak) => {
    if (streak === 0) return '❄️';
    if (streak < 7) return '🔥';
    if (streak < 30) return '🔥🔥';
    return '🔥🔥🔥';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Calculating streaks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Streaks</Text>
          <TouchableOpacity onPress={() => onRefresh()}>
            <Ionicons name="refresh" size={24} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statEmoji}>🔥</Text>
              <View>
                <Text style={styles.statLabel}>Total Streak Days</Text>
                <Text style={styles.statValue}>{getTotalStreak()}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statEmoji}>📊</Text>
              <View>
                <Text style={styles.statLabel}>Avg Adherence</Text>
                <Text style={styles.statValue}>{getAverageAdherence()}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Medication Streaks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication Streaks</Text>

          {streaks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="medical" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No data yet</Text>
              <Text style={styles.emptyText}>
                Add medications and mark them as taken to build your streaks
              </Text>
            </View>
          ) : (
            <View style={styles.streaksContainer}>
              {streaks.map((med, index) => (
                <TouchableOpacity key={med.medicationId || index} style={styles.streakCard}>
                  {/* Left Content */}
                  <View style={styles.streakContent}>
                    <View style={styles.medicationInfo}>
                      <Text style={styles.medicationName}>{med.medicationName}</Text>
                      <Text style={styles.medicationDosage}>{med.dosage}</Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${Math.min(med.adherenceRate, 100)}%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {med.adherenceRate}% adherence
                      </Text>
                    </View>
                  </View>

                  {/* Right Streak */}
                  <View style={styles.streakInfo}>
                    <Text style={styles.streakEmoji}>{getStreakIcon(med.streak)}</Text>
                    <View style={styles.streakNumbers}>
                      <Text style={styles.streakValue}>{med.streak}</Text>
                      <Text style={styles.streakLabel}>days</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips to Build Your Streak</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>1</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Take medications on time</Text>
                <Text style={styles.tipDescription}>
                  Mark medications as "Taken" within your scheduled time window
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>2</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Set reminders</Text>
                <Text style={styles.tipDescription}>
                  Use our reminder feature to never miss a dose
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>3</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Track consistency</Text>
                <Text style={styles.tipDescription}>
                  Build long streaks to improve your health outcomes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={[styles.achievementBadge, getTotalStreak() >= 7 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>🏅</Text>
              <Text style={styles.achievementText}>7 Day</Text>
              <Text style={styles.achievementStatus}>
                {getTotalStreak() >= 7 ? '✓' : 'Locked'}
              </Text>
            </View>

            <View style={[styles.achievementBadge, getTotalStreak() >= 30 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>⭐</Text>
              <Text style={styles.achievementText}>30 Day</Text>
              <Text style={styles.achievementStatus}>
                {getTotalStreak() >= 30 ? '✓' : 'Locked'}
              </Text>
            </View>

            <View style={[styles.achievementBadge, getTotalStreak() >= 100 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>👑</Text>
              <Text style={styles.achievementText}>100 Day</Text>
              <Text style={styles.achievementStatus}>
                {getTotalStreak() >= 100 ? '✓' : 'Locked'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.spacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statEmoji: {
    fontSize: 32,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  streaksContainer: {
    gap: 12,
  },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  streakContent: {
    flex: 1,
    marginRight: 16,
  },
  medicationInfo: {
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  medicationDosage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  progressContainer: {
    gap: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  streakInfo: {
    alignItems: 'center',
    gap: 4,
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakNumbers: {
    alignItems: 'center',
  },
  streakValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  streakLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  tipDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  achievementBadge: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    opacity: 0.5,
  },
  achievementUnlocked: {
    borderColor: '#F59E0B',
    opacity: 1,
  },
  achievementEmoji: {
    fontSize: 32,
  },
  achievementText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  achievementStatus: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  spacing: {
    height: 20,
  },
});