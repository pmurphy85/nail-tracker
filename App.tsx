/**
 * NailTracker - Nail Biting Habit Tracker
 * A comprehensive app for tracking nail biting habits and progress
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import AppNavigator from '@navigation/AppNavigator';
import NotificationService from '@services/NotificationService';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await NotificationService.initialize();
        await NotificationService.requestPermissions();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#6366f1"
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
