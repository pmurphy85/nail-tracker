import AsyncStorage from '@react-native-async-storage/async-storage';
import {JournalEntry, UserPattern} from '@types/index';

class JournalService {
  private static readonly JOURNAL_KEY = 'nail_tracker_journal';

  static async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const data = await AsyncStorage.getItem(this.JOURNAL_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      throw error;
    }
  }

  static async saveJournalEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    try {
      const entries = await this.getJournalEntries();
      const newEntry: JournalEntry = {
        ...entry,
        id: Date.now().toString(),
      };

      entries.unshift(newEntry);
      await AsyncStorage.setItem(this.JOURNAL_KEY, JSON.stringify(entries));
      return newEntry;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  }

  static async updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
    try {
      const entries = await this.getJournalEntries();
      const index = entries.findIndex(entry => entry.id === id);

      if (index !== -1) {
        entries[index] = {...entries[index], ...updates};
        await AsyncStorage.setItem(this.JOURNAL_KEY, JSON.stringify(entries));
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  }

  static async deleteJournalEntry(id: string): Promise<void> {
    try {
      const entries = await this.getJournalEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      await AsyncStorage.setItem(this.JOURNAL_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }

  static async getEntriesByType(type: 'success' | 'failure' | 'urge'): Promise<JournalEntry[]> {
    try {
      const entries = await this.getJournalEntries();
      return entries.filter(entry => entry.type === type);
    } catch (error) {
      console.error('Error getting entries by type:', error);
      throw error;
    }
  }

  static async getEntriesInDateRange(startDate: string, endDate: string): Promise<JournalEntry[]> {
    try {
      const entries = await this.getJournalEntries();
      return entries.filter(entry => {
        const entryDate = entry.date;
        return entryDate >= startDate && entryDate <= endDate;
      });
    } catch (error) {
      console.error('Error getting entries in date range:', error);
      throw error;
    }
  }

  static async analyzePatterns(): Promise<UserPattern> {
    try {
      const entries = await this.getJournalEntries();
      const last30Days = this.getLast30DaysEntries(entries);

      const triggerCounts = this.countOccurrences(last30Days, 'trigger');
      const locationCounts = this.countOccurrences(last30Days, 'location');
      const timeCounts = this.countOccurrences(last30Days, 'timeOfDay');

      const mostCommonTriggers = this.getTopItems(triggerCounts, 3);
      const problematicLocations = this.getTopItems(locationCounts, 3);
      const problematicTimes = this.getTopItems(timeCounts, 3);

      const averageMood = this.calculateAverageMood(last30Days);
      const weeklyProgress = this.calculateWeeklyProgress(entries);

      return {
        mostCommonTriggers,
        problematicTimes,
        problematicLocations,
        averageMood,
        weeklyProgress,
      };
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      throw error;
    }
  }

  private static getLast30DaysEntries(entries: JournalEntry[]): JournalEntry[] {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString();

    return entries.filter(entry => entry.date >= cutoffDate);
  }

  private static countOccurrences(
    entries: JournalEntry[],
    field: keyof JournalEntry
  ): Record<string, number> {
    const counts: Record<string, number> = {};

    entries.forEach(entry => {
      const value = entry[field];
      if (value && typeof value === 'string') {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    return counts;
  }

  private static getTopItems(counts: Record<string, number>, limit: number): string[] {
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([item]) => item);
  }

  private static calculateAverageMood(entries: JournalEntry[]): number {
    const moodEntries = entries.filter(entry => entry.mood !== undefined);
    if (moodEntries.length === 0) return 3;

    const totalMood = moodEntries.reduce((sum, entry) => sum + (entry.mood || 0), 0);
    return Math.round((totalMood / moodEntries.length) * 10) / 10;
  }

  private static calculateWeeklyProgress(entries: JournalEntry[]): number[] {
    const weeks: number[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7) - now.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
      });

      const successCount = weekEntries.filter(entry => entry.type === 'success').length;
      const totalCount = weekEntries.length;
      const successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;

      weeks.push(Math.round(successRate));
    }

    return weeks;
  }

  static async exportJournalData(): Promise<string> {
    try {
      const entries = await this.getJournalEntries();
      return JSON.stringify(entries, null, 2);
    } catch (error) {
      console.error('Error exporting journal data:', error);
      throw error;
    }
  }

  static async clearAllEntries(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.JOURNAL_KEY);
    } catch (error) {
      console.error('Error clearing journal entries:', error);
      throw error;
    }
  }

  static getInsightMessage(patterns: UserPattern): string {
    const {mostCommonTriggers, problematicTimes, averageMood} = patterns;

    if (mostCommonTriggers.length > 0) {
      const topTrigger = mostCommonTriggers[0];
      if (problematicTimes.length > 0) {
        const topTime = problematicTimes[0];
        return `You tend to experience urges most during ${topTime} when dealing with ${topTrigger.toLowerCase()}. Consider preparing coping strategies for these specific situations.`;
      }
      return `${topTrigger} appears to be your main trigger. Consider developing specific strategies to manage this situation.`;
    }

    if (averageMood < 3) {
      return "Your mood tracking shows some challenging periods. Remember that low moods can be triggers - consider mood-boosting activities.";
    }

    return "Keep tracking your patterns - the more data you collect, the better insights we can provide!";
  }
}

export default JournalService;