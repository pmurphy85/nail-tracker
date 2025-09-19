import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JournalScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const journalEntries = [
    {
      id: '1',
      date: 'Today, 2:30 PM',
      type: 'success',
      trigger: 'Work stress',
      location: 'Office',
      notes: 'Felt the urge during a stressful meeting but used breathing techniques',
    },
    {
      id: '2',
      date: 'Yesterday, 8:45 PM',
      type: 'urge',
      trigger: 'Boredom',
      location: 'Home',
      notes: 'Watching TV and felt the urge. Went for a walk instead.',
    },
    {
      id: '3',
      date: '2 days ago, 10:20 AM',
      type: 'failure',
      trigger: 'Anxiety',
      location: 'Car',
      notes: 'Traffic was really bad and I was late. Need better coping strategies.',
    },
  ];

  const filters = [
    {key: 'all', label: 'All', icon: 'list'},
    {key: 'success', label: 'Success', icon: 'check-circle'},
    {key: 'urge', label: 'Urges', icon: 'warning'},
    {key: 'failure', label: 'Setbacks', icon: 'error'},
  ];

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'urge':
        return '#f59e0b';
      case 'failure':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'urge':
        return 'warning';
      case 'failure':
        return 'error';
      default:
        return 'note';
    }
  };

  const filteredEntries = selectedFilter === 'all'
    ? journalEntries
    : journalEntries.filter(entry => entry.type === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.key)}>
                <Icon
                  name={filter.icon}
                  size={16}
                  color={selectedFilter === filter.key ? '#ffffff' : '#6b7280'}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter.key && styles.filterTextActive,
                  ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesContainer}>
        {filteredEntries.map(entry => (
          <TouchableOpacity key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryIconContainer}>
                <Icon
                  name={getEntryIcon(entry.type)}
                  size={20}
                  color={getEntryColor(entry.type)}
                />
              </View>
              <View style={styles.entryHeaderText}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryType}>
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#9ca3af" />
            </View>

            <View style={styles.entryDetails}>
              <View style={styles.entryMetadata}>
                <View style={styles.metadataItem}>
                  <Icon name="psychology" size={16} color="#6b7280" />
                  <Text style={styles.metadataText}>{entry.trigger}</Text>
                </View>
                <View style={styles.metadataItem}>
                  <Icon name="location-on" size={16} color="#6b7280" />
                  <Text style={styles.metadataText}>{entry.location}</Text>
                </View>
              </View>

              {entry.notes && (
                <Text style={styles.entryNotes} numberOfLines={2}>
                  {entry.notes}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {filteredEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="book" size={48} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No entries yet</Text>
            <Text style={styles.emptyStateText}>
              Start tracking your journey by adding your first entry
            </Text>
            <TouchableOpacity style={styles.emptyStateButton}>
              <Text style={styles.emptyStateButtonText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>This Week's Insights</Text>

          <View style={styles.insightItem}>
            <Icon name="schedule" size={20} color="#f59e0b" />
            <Text style={styles.insightText}>
              Most urges happen between 8-10 PM
            </Text>
          </View>

          <View style={styles.insightItem}>
            <Icon name="psychology" size={20} color="#6366f1" />
            <Text style={styles.insightText}>
              Work stress is your top trigger (60%)
            </Text>
          </View>

          <View style={styles.insightItem}>
            <Icon name="trending-up" size={20} color="#10b981" />
            <Text style={styles.insightText}>
              Success rate improved by 25% this week
            </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterContainer: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 6,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#6366f1',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entriesContainer: {
    flex: 1,
    padding: 16,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  entryDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  entryType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  entryDetails: {
    paddingLeft: 44,
  },
  entryMetadata: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metadataText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  entryNotes: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 32,
  },
  emptyStateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 16,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  insightsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 8,
    flex: 1,
  },
});

export default JournalScreen;