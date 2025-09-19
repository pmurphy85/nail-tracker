import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@types/index';

import TabNavigator from './TabNavigator';
import JournalEntryScreen from '@screens/JournalEntryScreen';
import PhotoViewScreen from '@screens/PhotoViewScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JournalEntry"
          component={JournalEntryScreen}
          options={{title: 'Journal Entry'}}
        />
        <Stack.Screen
          name="PhotoView"
          component={PhotoViewScreen}
          options={{title: 'Photo Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;