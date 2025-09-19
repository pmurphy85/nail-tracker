export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastSuccessDate: string | null;
  startDate: string;
  totalDays: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'success' | 'failure' | 'urge';
  trigger?: string;
  location?: string;
  timeOfDay?: string;
  mood?: number;
  notes?: string;
  photoUri?: string;
}

export interface ProgressPhoto {
  id: string;
  uri: string;
  date: string;
  thumbnail?: string;
}

export interface UserPattern {
  mostCommonTriggers: string[];
  problematicTimes: string[];
  problematicLocations: string[];
  averageMood: number;
  weeklyProgress: number[];
}

export interface NotificationSettings {
  urgeReminders: boolean;
  dailyCheck: boolean;
  encouragement: boolean;
  customTimes: string[];
}

export interface AppState {
  streak: StreakData;
  journal: JournalEntry[];
  photos: ProgressPhoto[];
  patterns: UserPattern;
  notifications: NotificationSettings;
}

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Journal: undefined;
  Progress: undefined;
  Settings: undefined;
  JournalEntry: {entryId?: string};
  PhotoView: {photoId: string};
};

export type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Journal: undefined;
  Camera: undefined;
  Settings: undefined;
};