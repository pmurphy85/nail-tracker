import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const ProgressScreen = () => {
  const weeklyData = [3, 5, 2, 7, 4, 6, 5];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderChart = () => {
    const maxValue = Math.max(...weeklyData);
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Progress</Text>
        <View style={styles.chart}>
          {weeklyData.map((value, index) => (
            <View key={index} style={styles.chartBar}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (value / maxValue) * 100,
                    backgroundColor: value > 5 ? '#10b981' : '#6366f1',
                  },
                ]}
              />
              <Text style={styles.dayLabel}>{dayLabels[index]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.photoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress Photos</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.photoGrid}>
              <TouchableOpacity style={styles.photoCard}>
                <View style={styles.photoPlaceholder}>
                  <Icon name="add-a-photo" size={32} color="#9ca3af" />
                </View>
                <Text style={styles.photoDate}>Today</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.photoCard}>
                <View style={styles.photoPlaceholder}>
                  <Icon name="image" size={32} color="#9ca3af" />
                </View>
                <Text style={styles.photoDate}>Yesterday</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.photoCard}>
                <View style={styles.photoPlaceholder}>
                  <Icon name="image" size={32} color="#9ca3af" />
                </View>
                <Text style={styles.photoDate}>2 days ago</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {renderChart()}

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights</Text>

          <View style={styles.insightCard}>
            <Icon name="trending-up" size={24} color="#10b981" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Great Progress!</Text>
              <Text style={styles.insightText}>
                You've improved 40% compared to last week
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Icon name="schedule" size={24} color="#f59e0b" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Peak Urge Time</Text>
              <Text style={styles.insightText}>
                Most urges occur around 8-10 PM
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Icon name="location-on" size={24} color="#6366f1" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Common Trigger</Text>
              <Text style={styles.insightText}>
                Work stress is your main trigger
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.milestonesSection}>
          <Text style={styles.sectionTitle}>Milestones</Text>

          <View style={styles.milestoneCard}>
            <Icon name="emoji-events" size={24} color="#f59e0b" />
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneTitle}>7-Day Streak</Text>
              <Text style={styles.milestoneDate}>Achieved today!</Text>
            </View>
            <Icon name="check-circle" size={20} color="#10b981" />
          </View>

          <View style={styles.milestoneCard}>
            <Icon name="star" size={24} color="#9ca3af" />
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneTitle}>14-Day Streak</Text>
              <Text style={styles.milestoneDate}>7 days to go</Text>
            </View>
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
  photoSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  photoGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  photoCard: {
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  photoDate: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  insightsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  insightCard: {
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
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  insightText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  milestonesSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  milestoneCard: {
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
  milestoneContent: {
    flex: 1,
    marginLeft: 12,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  milestoneDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default ProgressScreen;