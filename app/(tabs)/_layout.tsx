import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import React from 'react';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD76F',
          tabBarInactiveTintColor: '#979797',
          tabBarLabelStyle: {
            fontSize: 12
          }
      }}>
      <Tabs.Screen
        name="baskets"
        options={{
          title: "Baskets",
          tabBarIcon: ({ focused }) => <Fontisto name="pie-chart-2" size={22} color={focused?"#FFD76F": "#979797"} />,
        }}
      />
      <Tabs.Screen
        name="investments"
        options={{
          title: 'Investments',
          tabBarIcon: ({ focused }) => <FontAwesome name="line-chart" size={22} color={focused?"#FFD76F": "#979797"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name="person-circle" size={22} color={focused?"#FFD76F": "#979797"} />,
        }}
      />
    </Tabs>
  );
}
