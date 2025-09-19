import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const currentStreak = 7;
  const longestStreak = 23;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.streakCard}>
          <View style={styles.streakContent}>
            <Text style={styles.streakTitle}>Current Streak</Text>
            <Text style={styles.streakNumber}>{currentStreak}</Text>
            <Text style={styles.streakSubtitle}>days strong! 🎉</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="emoji-events" size={32} color="#f59e0b" />
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="calendar-today" size={32} color="#10b981" />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="add-a-photo" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Take Progress Photo</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="edit" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Log Journal Entry</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.urgencyButton}>
            <Icon name="warning" size={24} color="#ffffff" />
            <Text style={styles.urgencyText}>Having an Urge?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Icon name="check-circle" size={20} color="#10b981" />
            <Text style={styles.activityText}>Successful day logged</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="camera-alt" size={20} color="#6366f1" />
            <Text style={styles.activityText}>Progress photo taken</Text>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  streakCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  streakContent: {
    alignItems: 'center',
  },
  streakTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  streakNumber: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  streakSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  quickActions: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
    fontWeight: '500',
  },
  urgencyButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  urgencyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recentActivity: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  activityItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    marginLeft: 12,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default HomeScreen;