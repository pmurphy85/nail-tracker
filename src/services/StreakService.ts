import AsyncStorage from '@react-native-async-storage/async-storage';
import {StreakData} from '@types/index';

class StreakService {
  private static readonly STREAK_KEY = 'nail_tracker_streak';

  static async getStreakData(): Promise<StreakData> {
    try {
      const data = await AsyncStorage.getItem(this.STREAK_KEY);
      if (data) {
        return JSON.parse(data);
      }

      const initialData: StreakData = {
        currentStreak: 0,
        longestStreak: 0,
        lastSuccessDate: null,
        startDate: new Date().toISOString(),
        totalDays: 0,
      };

      await this.saveStreakData(initialData);
      return initialData;
    } catch (error) {
      console.error('Error getting streak data:', error);
      throw error;
    }
  }

  static async saveStreakData(data: StreakData): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STREAK_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving streak data:', error);
      throw error;
    }
  }

  static async recordSuccessfulDay(): Promise<StreakData> {
    try {
      const currentData = await this.getStreakData();
      const today = new Date().toISOString().split('T')[0];
      const lastSuccessDate = currentData.lastSuccessDate?.split('T')[0];

      if (lastSuccessDate === today) {
        return currentData;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      let newCurrentStreak: number;
      if (lastSuccessDate === yesterdayString) {
        newCurrentStreak = currentData.currentStreak + 1;
      } else {
        newCurrentStreak = 1;
      }

      const updatedData: StreakData = {
        ...currentData,
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(currentData.longestStreak, newCurrentStreak),
        lastSuccessDate: new Date().toISOString(),
        totalDays: currentData.totalDays + 1,
      };

      await this.saveStreakData(updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error recording successful day:', error);
      throw error;
    }
  }

  static async recordFailure(): Promise<StreakData> {
    try {
      const currentData = await this.getStreakData();

      const updatedData: StreakData = {
        ...currentData,
        currentStreak: 0,
        lastSuccessDate: null,
      };

      await this.saveStreakData(updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error recording failure:', error);
      throw error;
    }
  }

  static async resetAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STREAK_KEY);
    } catch (error) {
      console.error('Error resetting streak data:', error);
      throw error;
    }
  }

  static calculateStreakFromDate(startDate: string): number {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  static getEncouragementMessage(currentStreak: number): string {
    if (currentStreak === 0) {
      return "Every journey starts with a single step. You've got this!";
    } else if (currentStreak < 7) {
      return `${currentStreak} days strong! Keep building that momentum!`;
    } else if (currentStreak < 14) {
      return `Amazing! ${currentStreak} days of progress. You're forming a healthy habit!`;
    } else if (currentStreak < 30) {
      return `Incredible! ${currentStreak} days! You're proving to yourself that change is possible!`;
    } else {
      return `Outstanding! ${currentStreak} days! You're an inspiration! Keep going!`;
    }
  }

  static getNextMilestone(currentStreak: number): {days: number; message: string} {
    const milestones = [
      {days: 7, message: "First week milestone!"},
      {days: 14, message: "Two weeks of success!"},
      {days: 30, message: "One month achievement!"},
      {days: 60, message: "Two months strong!"},
      {days: 90, message: "Three months of progress!"},
      {days: 180, message: "Six months of dedication!"},
      {days: 365, message: "One full year of success!"},
    ];

    for (const milestone of milestones) {
      if (currentStreak < milestone.days) {
        return {
          days: milestone.days - currentStreak,
          message: milestone.message,
        };
      }
    }

    return {
      days: 0,
      message: "You've achieved all milestones! Keep going!",
    };
  }
}

export default StreakService;