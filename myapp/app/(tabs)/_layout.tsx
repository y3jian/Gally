import { Tabs} from 'expo-router';
import { Image } from 'react-native';
import React from 'react';
import { useThemedStyles } from './../styles/theme'; // import our shared styles

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  const styles = useThemedStyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: styles.colors.background,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/home.png')}
              style={[styles.icon,
                {tintColor: focused ? styles.colors.button : styles.colors.background}, // changes color when active
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cafe"
        options={{
          title: 'cafe',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/coffee.png')}
              style={[styles.icon,
                {tintColor: focused ? styles.colors.button : styles.colors.background}, // changes color when active
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/message.png')}
              style={[styles.icon,
                {tintColor: focused ? styles.colors.button : styles.colors.background}, // changes color when active
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'friends',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/profile-2user.png')}
              style={[styles.icon,
                {tintColor: focused ? styles.colors.button : styles.colors.background}, // changes color when active
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'info',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/blur.png')}
              style={[styles.icon,
                {tintColor: focused ? styles.colors.button : styles.colors.background}, // changes color when active
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
