import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    urgeReminders: true,
    dailyCheck: true,
    encouragement: true,
    weeklyReport: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const showResetAlert = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Reset', style: 'destructive', onPress: () => {}},
      ],
    );
  };

  const exportData = () => {
    Alert.alert('Export Data', 'Your data has been exported successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="notifications" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Urge Reminders</Text>
                <Text style={styles.settingSubtitle}>
                  Get alerts during your typical urge times
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.urgeReminders}
              onValueChange={() => toggleNotification('urgeReminders')}
              trackColor={{false: '#d1d5db', true: '#c7d2fe'}}
              thumbColor={notifications.urgeReminders ? '#6366f1' : '#9ca3af'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="today" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Daily Check-in</Text>
                <Text style={styles.settingSubtitle}>
                  Daily reminder to log your progress
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.dailyCheck}
              onValueChange={() => toggleNotification('dailyCheck')}
              trackColor={{false: '#d1d5db', true: '#c7d2fe'}}
              thumbColor={notifications.dailyCheck ? '#6366f1' : '#9ca3af'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="favorite" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Encouragement</Text>
                <Text style={styles.settingSubtitle}>
                  Positive messages and motivation
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.encouragement}
              onValueChange={() => toggleNotification('encouragement')}
              trackColor={{false: '#d1d5db', true: '#c7d2fe'}}
              thumbColor={notifications.encouragement ? '#6366f1' : '#9ca3af'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="assessment" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Weekly Reports</Text>
                <Text style={styles.settingSubtitle}>
                  Summary of your weekly progress
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.weeklyReport}
              onValueChange={() => toggleNotification('weeklyReport')}
              trackColor={{false: '#d1d5db', true: '#c7d2fe'}}
              thumbColor={notifications.weeklyReport ? '#6366f1' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalization</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="schedule" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notification Times</Text>
                <Text style={styles.settingSubtitle}>
                  Customize when you receive alerts
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="psychology" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Trigger Management</Text>
                <Text style={styles.settingSubtitle}>
                  Set up your common triggers and locations
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="palette" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Theme</Text>
                <Text style={styles.settingSubtitle}>Light</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>

          <TouchableOpacity style={styles.settingItem} onPress={exportData}>
            <View style={styles.settingContent}>
              <Icon name="file-download" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Export Data</Text>
                <Text style={styles.settingSubtitle}>
                  Download your progress data
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="backup" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Backup & Sync</Text>
                <Text style={styles.settingSubtitle}>
                  Secure cloud backup of your data
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="privacy-tip" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Privacy Policy</Text>
                <Text style={styles.settingSubtitle}>
                  How we protect your information
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="help" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Help Center</Text>
                <Text style={styles.settingSubtitle}>
                  Tips and frequently asked questions
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="feedback" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Send Feedback</Text>
                <Text style={styles.settingSubtitle}>
                  Help us improve the app
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="star-rate" size={24} color="#6366f1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Rate the App</Text>
                <Text style={styles.settingSubtitle}>
                  Share your experience with others
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <TouchableOpacity
            style={[styles.settingItem, styles.dangerItem]}
            onPress={showResetAlert}>
            <View style={styles.settingContent}>
              <Icon name="warning" size={24} color="#ef4444" />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, styles.dangerText]}>
                  Reset All Data
                </Text>
                <Text style={styles.settingSubtitle}>
                  Permanently delete all your progress
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NailTracker v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for your journey</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  dangerItem: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  dangerText: {
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
});

export default SettingsScreen;