import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TabParamList} from '@types/index';

import HomeScreen from '@screens/HomeScreen';
import ProgressScreen from '@screens/ProgressScreen';
import JournalScreen from '@screens/JournalScreen';
import CameraScreen from '@screens/CameraScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Progress':
              iconName = focused ? 'trending-up' : 'trending-up';
              break;
            case 'Journal':
              iconName = focused ? 'book' : 'book';
              break;
            case 'Camera':
              iconName = focused ? 'camera-alt' : 'camera-alt';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Dashboard'}}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{title: 'Progress'}}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{title: 'Journal'}}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{title: 'Photo'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;