import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationSettings} from '@types/index';

class NotificationService {
  private static readonly SETTINGS_KEY = 'nail_tracker_notifications';
  private static readonly CHANNEL_ID = 'nail_tracker_channel';

  static async initialize(): Promise<void> {
    PushNotification.createChannel(
      {
        channelId: this.CHANNEL_ID,
        channelName: 'NailTracker Notifications',
        channelDescription: 'Notifications for nail biting tracking',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`)
    );

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  static async getNotificationSettings(): Promise<NotificationSettings> {
    try {
      const data = await AsyncStorage.getItem(this.SETTINGS_KEY);
      if (data) {
        return JSON.parse(data);
      }

      const defaultSettings: NotificationSettings = {
        urgeReminders: true,
        dailyCheck: true,
        encouragement: true,
        customTimes: ['09:00', '15:00', '21:00'],
      };

      await this.saveNotificationSettings(defaultSettings);
      return defaultSettings;
    } catch (error) {
      console.error('Error getting notification settings:', error);
      throw error;
    }
  }

  static async saveNotificationSettings(settings: NotificationSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      await this.scheduleNotifications(settings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
      throw error;
    }
  }

  static async scheduleNotifications(settings: NotificationSettings): Promise<void> {
    try {
      PushNotification.cancelAllLocalNotifications();

      if (settings.dailyCheck) {
        this.scheduleDailyCheckIn();
      }

      if (settings.encouragement) {
        this.scheduleEncouragementMessages();
      }

      if (settings.urgeReminders && settings.customTimes.length > 0) {
        this.scheduleUrgeReminders(settings.customTimes);
      }
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  }

  private static scheduleDailyCheckIn(): void {
    PushNotification.localNotificationSchedule({
      channelId: this.CHANNEL_ID,
      title: 'Daily Check-in',
      message: 'How did your day go? Log your progress in NailTracker!',
      date: this.getNextScheduleTime(20, 0),
      repeatType: 'day',
      actions: ['Log Progress', 'Dismiss'],
    });
  }

  private static scheduleEncouragementMessages(): void {
    const messages = [
      'You\'re doing great! Keep up the excellent work! 💪',
      'Every day without biting is a victory! 🎉',
      'Your nails are getting healthier every day! ✨',
      'Stay strong! You\'ve got this! 🌟',
      'Progress takes time, but you\'re making it happen! 🚀',
    ];

    messages.forEach((message, index) => {
      const scheduleTime = this.getNextScheduleTime(10 + index * 2, 0);
      scheduleTime.setDate(scheduleTime.getDate() + index);

      PushNotification.localNotificationSchedule({
        channelId: this.CHANNEL_ID,
        title: 'Keep Going!',
        message,
        date: scheduleTime,
        repeatType: 'week',
      });
    });
  }

  private static scheduleUrgeReminders(customTimes: string[]): void {
    const reminderMessages = [
      'Feeling an urge? Try taking 5 deep breaths first.',
      'When you feel the urge, try a quick distraction activity.',
      'Remember your progress - you\'ve come so far!',
      'Urges are temporary. This feeling will pass.',
      'Try doing something with your hands instead.',
    ];

    customTimes.forEach((time, index) => {
      const [hours, minutes] = time.split(':').map(Number);
      const message = reminderMessages[index % reminderMessages.length];

      PushNotification.localNotificationSchedule({
        channelId: this.CHANNEL_ID,
        title: 'Urge Management',
        message,
        date: this.getNextScheduleTime(hours, minutes),
        repeatType: 'day',
        actions: ['I\'m OK', 'Need Help'],
      });
    });
  }

  static async scheduleUrgeAlert(): Promise<void> {
    const urgentMessages = [
      'Take a deep breath. You can get through this moment.',
      'Try the 5-4-3-2-1 grounding technique right now.',
      'Go wash your hands or do something else with them.',
      'Remember why you started this journey.',
      'This urge will pass. You are stronger than you think.',
    ];

    const randomMessage = urgentMessages[Math.floor(Math.random() * urgentMessages.length)];

    PushNotification.localNotification({
      channelId: this.CHANNEL_ID,
      title: 'Urge Alert - You\'ve Got This!',
      message: randomMessage,
      bigText: randomMessage,
      priority: 'high',
      importance: 'high',
      actions: ['I\'m Better', 'More Help'],
    });
  }

  static async scheduleMilestoneNotification(streak: number): Promise<void> {
    let message = '';
    let title = '';

    if (streak === 1) {
      title = '🎉 First Day Success!';
      message = 'Congratulations on your first successful day!';
    } else if (streak === 7) {
      title = '🏆 One Week Milestone!';
      message = 'Amazing! You\'ve completed your first week!';
    } else if (streak === 14) {
      title = '⭐ Two Weeks Strong!';
      message = 'Incredible progress! Two weeks of success!';
    } else if (streak === 30) {
      title = '🌟 One Month Achievement!';
      message = 'Outstanding! A full month of progress!';
    } else if (streak % 30 === 0) {
      const months = streak / 30;
      title = `🚀 ${months} Month${months > 1 ? 's' : ''} Achievement!`;
      message = `Incredible dedication! ${months} month${months > 1 ? 's' : ''} of progress!`;
    } else {
      return;
    }

    PushNotification.localNotification({
      channelId: this.CHANNEL_ID,
      title,
      message,
      bigText: message,
      priority: 'high',
      importance: 'high',
    });
  }

  private static getNextScheduleTime(hours: number, minutes: number): Date {
    const now = new Date();
    const scheduleTime = new Date();
    scheduleTime.setHours(hours, minutes, 0, 0);

    if (scheduleTime <= now) {
      scheduleTime.setDate(scheduleTime.getDate() + 1);
    }

    return scheduleTime;
  }

  static async clearAllNotifications(): Promise<void> {
    PushNotification.cancelAllLocalNotifications();
  }

  static async requestPermissions(): Promise<boolean> {
    return new Promise(resolve => {
      PushNotification.requestPermissions().then(permissions => {
        resolve(permissions.alert === true);
      });
    });
  }

  static async checkPermissions(): Promise<boolean> {
    return new Promise(resolve => {
      PushNotification.checkPermissions(permissions => {
        resolve(permissions.alert === true);
      });
    });
  }

  static getMotivationalQuote(): string {
    const quotes = [
      "The only impossible journey is the one you never begin.",
      "Progress, not perfection, is the goal.",
      "Every day is a new opportunity to grow.",
      "Small steps every day lead to big changes.",
      "You are braver than you believe and stronger than you seem.",
      "The journey of a thousand miles begins with one step.",
      "Believe you can and you're halfway there.",
      "Success is the sum of small efforts repeated day in and day out.",
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

export default NotificationService;