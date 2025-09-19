import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JournalEntryScreen = () => {
  const [entryType, setEntryType] = useState<'success' | 'failure' | 'urge'>('success');
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState('');

  const triggers = ['Stress', 'Boredom', 'Anxiety', 'Frustration', 'Excitement', 'Habit', 'Other'];
  const locations = ['Home', 'Work', 'Car', 'School', 'Public', 'Outside', 'Other'];
  const times = ['Morning', 'Afternoon', 'Evening', 'Night', 'During work', 'Break time'];

  const saveEntry = () => {
    if (!selectedTrigger || !selectedLocation || !selectedTime) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert('Entry Saved', 'Your journal entry has been saved successfully!', [
      {text: 'OK', onPress: () => {}},
    ]);
  };

  const renderMoodSelector = () => {
    return (
      <View style={styles.moodContainer}>
        <Text style={styles.fieldLabel}>Mood (1-5)</Text>
        <View style={styles.moodButtons}>
          {[1, 2, 3, 4, 5].map(value => (
            <TouchableOpacity
              key={value}
              style={[
                styles.moodButton,
                mood === value && styles.moodButtonActive,
              ]}
              onPress={() => setMood(value)}>
              <Text
                style={[
                  styles.moodButtonText,
                  mood === value && styles.moodButtonTextActive,
                ]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.moodLabels}>
          <Text style={styles.moodLabel}>Low</Text>
          <Text style={styles.moodLabel}>High</Text>
        </View>
      </View>
    );
  };

  const renderOptionSelector = (
    title: string,
    options: string[],
    selected: string,
    onSelect: (option: string) => void,
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{title} *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selected === option && styles.optionButtonActive,
                ]}
                onPress={() => onSelect(option)}>
                <Text
                  style={[
                    styles.optionButtonText,
                    selected === option && styles.optionButtonTextActive,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>Entry Type</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                entryType === 'success' && styles.typeButtonSuccess,
              ]}
              onPress={() => setEntryType('success')}>
              <Icon
                name="check-circle"
                size={24}
                color={entryType === 'success' ? '#ffffff' : '#10b981'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  entryType === 'success' && styles.typeButtonTextActive,
                ]}>
                Success
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                entryType === 'urge' && styles.typeButtonUrge,
              ]}
              onPress={() => setEntryType('urge')}>
              <Icon
                name="warning"
                size={24}
                color={entryType === 'urge' ? '#ffffff' : '#f59e0b'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  entryType === 'urge' && styles.typeButtonTextActive,
                ]}>
                Urge
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                entryType === 'failure' && styles.typeButtonFailure,
              ]}
              onPress={() => setEntryType('failure')}>
              <Icon
                name="error"
                size={24}
                color={entryType === 'failure' ? '#ffffff' : '#ef4444'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  entryType === 'failure' && styles.typeButtonTextActive,
                ]}>
                Setback
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderOptionSelector('Trigger', triggers, selectedTrigger, setSelectedTrigger)}
        {renderOptionSelector('Location', locations, selectedLocation, setSelectedLocation)}
        {renderOptionSelector('Time of Day', times, selectedTime, setSelectedTime)}

        {renderMoodSelector()}

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            multiline
            numberOfLines={4}
            placeholder="How did you handle the situation? What helped or didn't help?"
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.encouragementCard}>
          <Icon name="lightbulb" size={24} color="#f59e0b" />
          <View style={styles.encouragementContent}>
            <Text style={styles.encouragementTitle}>Remember</Text>
            <Text style={styles.encouragementText}>
              Every entry helps you understand your patterns better. You're making progress!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
          <Icon name="save" size={20} color="#ffffff" />
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  typeSelector: {
    marginBottom: 24,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  typeButtonSuccess: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  typeButtonUrge: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  typeButtonFailure: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginTop: 8,
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  optionButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  optionButtonTextActive: {
    color: '#ffffff',
  },
  moodContainer: {
    marginBottom: 24,
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  moodButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  moodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  moodButtonTextActive: {
    color: '#ffffff',
  },
  moodLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#d1d5db',
    minHeight: 100,
  },
  encouragementCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 100,
  },
  encouragementContent: {
    flex: 1,
    marginLeft: 12,
  },
  encouragementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  encouragementText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
});

export default JournalEntryScreen;