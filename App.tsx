/**
 * NailTracker - Simple Streak & Journal
 * Start simple, build up gradually
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

type CheckInType = 'success' | 'urge-resisted' | 'slip';

interface CheckIn {
  id: string;
  type: CheckInType;
  timestamp: string;
  note?: string;
  trigger?: string;
}

function App() {
  const [todayCheckIns, setTodayCheckIns] = useState<CheckIn[]>([]);
  const [lastSuccessTime, setLastSuccessTime] = useState<string>('');
  const [showUrgeHelper, setShowUrgeHelper] = useState(false);
  const [entries, setEntries] = useState<CheckIn[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('checkIns');
      if (savedEntries) {
        const allEntries = JSON.parse(savedEntries);
        setEntries(allEntries);

        // Filter today's check-ins
        const today = new Date().toDateString();
        const todaysEntries = allEntries.filter((e: CheckIn) =>
          new Date(e.timestamp).toDateString() === today
        );
        setTodayCheckIns(todaysEntries);

        // Find last success
        const successes = allEntries.filter((e: CheckIn) => e.type === 'success' || e.type === 'urge-resisted');
        if (successes.length > 0) {
          setLastSuccessTime(successes[0].timestamp);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const addCheckIn = async (type: CheckInType, note?: string, trigger?: string) => {
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
      note,
      trigger,
    };

    const updatedEntries = [newCheckIn, ...entries];
    setEntries(updatedEntries);
    setTodayCheckIns([newCheckIn, ...todayCheckIns]);

    if (type === 'success' || type === 'urge-resisted') {
      setLastSuccessTime(newCheckIn.timestamp);
    }

    await AsyncStorage.setItem('checkIns', JSON.stringify(updatedEntries));

    // Show encouraging message
    if (type === 'urge-resisted') {
      Alert.alert('💪 Victory!', 'You resisted the urge. That takes strength!');
    } else if (type === 'success') {
      Alert.alert('🌟 Great job!', 'Another successful moment!');
    }

    setShowUrgeHelper(false);
  };

  const getTimeSinceSuccess = () => {
    if (!lastSuccessTime) return 'Start your first win!';

    const now = new Date();
    const last = new Date(lastSuccessTime);
    const diffMs = now.getTime() - last.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  const getTodaySuccessCount = () => {
    return todayCheckIns.filter(c => c.type === 'success' || c.type === 'urge-resisted').length;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>You've got this 💙</Text>
            <Text style={styles.title}>Right Now</Text>
          </View>
          <View style={styles.timeCounter}>
            <Text style={styles.timeLabel}>Clean time</Text>
            <Text style={styles.timeValue}>{getTimeSinceSuccess()}</Text>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>

          {/* Big SOS Button */}
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => setShowUrgeHelper(true)}>
            <LinearGradient
              colors={['#ff6b9d', '#ff8fab']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.sosGradient}>
              <Icon name="favorite" size={32} color="#ffffff" />
              <Text style={styles.sosText}>I need support right now</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Today's Wins */}
          <View style={styles.todaySection}>
            <Text style={styles.sectionTitle}>Today's Wins</Text>
            <View style={styles.winsCard}>
              <View style={styles.winStat}>
                <Text style={styles.winNumber}>{getTodaySuccessCount()}</Text>
                <Text style={styles.winLabel}>times strong</Text>
              </View>
              <View style={styles.winDivider} />
              <View style={styles.winStat}>
                <Text style={styles.winNumber}>{todayCheckIns.length}</Text>
                <Text style={styles.winLabel}>check-ins</Text>
              </View>
            </View>
          </View>

          {/* Quick Check-in */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Check-in</Text>

            <TouchableOpacity
              style={styles.checkInOption}
              onPress={() => addCheckIn('success')}>
              <View style={[styles.checkInIcon, {backgroundColor: '#e6f9f0'}]}>
                <Icon name="check-circle" size={24} color="#6BCF7F" />
              </View>
              <View style={styles.checkInText}>
                <Text style={styles.checkInTitle}>Going strong!</Text>
                <Text style={styles.checkInSubtitle}>Feeling good right now</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#cbd5e0" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkInOption}
              onPress={() => addCheckIn('urge-resisted')}>
              <View style={[styles.checkInIcon, {backgroundColor: '#fff4e6'}]}>
                <Icon name="shield" size={24} color="#FFA94D" />
              </View>
              <View style={styles.checkInText}>
                <Text style={styles.checkInTitle}>Resisted an urge</Text>
                <Text style={styles.checkInSubtitle}>You fought and won!</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#cbd5e0" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkInOption}
              onPress={() => {
                Alert.prompt(
                  'It\'s okay 💙',
                  'What triggered this? (Optional)',
                  (trigger) => addCheckIn('slip', undefined, trigger)
                );
              }}>
              <View style={[styles.checkInIcon, {backgroundColor: '#fff0f5'}]}>
                <Icon name="restart-alt" size={24} color="#FF6B9D" />
              </View>
              <View style={styles.checkInText}>
                <Text style={styles.checkInTitle}>Had a slip</Text>
                <Text style={styles.checkInSubtitle}>Tomorrow is a new day</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#cbd5e0" />
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>

            {entries.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIconCircle}>
                  <Icon name="wb-sunny" size={48} color="#ffd166" />
                </View>
                <Text style={styles.emptyStateText}>Start your journey</Text>
                <Text style={styles.emptyStateSubtext}>
                  Check in whenever you need support
                </Text>
              </View>
            ) : (
              entries.slice(0, 10).map((entry) => (
                <View key={entry.id} style={styles.activityCard}>
                  <View
                    style={[
                      styles.activityDot,
                      {
                        backgroundColor:
                          entry.type === 'success' || entry.type === 'urge-resisted'
                            ? '#6BCF7F'
                            : '#FF6B9D',
                      },
                    ]}
                  />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>
                      {entry.type === 'success'
                        ? '✨ Going strong'
                        : entry.type === 'urge-resisted'
                        ? '💪 Resisted urge'
                        : '💙 Slip happened'}
                    </Text>
                    <Text style={styles.activityTime}>
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    {entry.trigger && (
                      <Text style={styles.activityTrigger}>Trigger: {entry.trigger}</Text>
                    )}
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={{height: 40}} />
        </ScrollView>

        {/* Urge Helper Modal */}
        {showUrgeHelper && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Take a breath 🌸</Text>
              <Text style={styles.modalSubtitle}>You can get through this moment</Text>

              <View style={styles.modalSuggestions}>
                <Text style={styles.suggestionTitle}>Try right now:</Text>
                <Text style={styles.suggestion}>• Take 5 deep breaths</Text>
                <Text style={styles.suggestion}>• Drink some water</Text>
                <Text style={styles.suggestion}>• Put on hand lotion</Text>
                <Text style={styles.suggestion}>• Hold something (stress ball, pen)</Text>
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowUrgeHelper(false);
                  addCheckIn('urge-resisted');
                }}>
                <Text style={styles.modalButtonText}>I made it through!</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => setShowUrgeHelper(false)}>
                <Text style={styles.modalButtonSecondaryText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a202c',
  },
  timeCounter: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 12,
    color: '#a0aec0',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6BCF7F',
  },
  content: {
    flex: 1,
  },
  sosButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#ff6b9d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  sosGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  sosText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  todaySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  winsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  winStat: {
    flex: 1,
    alignItems: 'center',
  },
  winNumber: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1a202c',
    marginBottom: 4,
  },
  winLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  winDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  checkInOption: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  checkInIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkInText: {
    flex: 1,
  },
  checkInTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 2,
  },
  checkInSubtitle: {
    fontSize: 13,
    color: '#718096',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fffbf0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    color: '#a0aec0',
  },
  activityTrigger: {
    fontSize: 13,
    color: '#718096',
    fontStyle: 'italic',
    marginTop: 4,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalSuggestions: {
    backgroundColor: '#f7fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
  },
  suggestion: {
    fontSize: 15,
    color: '#4a5568',
    marginBottom: 8,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#6BCF7F',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalButtonSecondary: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#718096',
  },
});

export default App;
