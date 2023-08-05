import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChartsDashScreen from '../features/dasboard/screens/ChartsDashScreen';
import DashboardHomeScreen from '../features/dasboard/screens/DashboardHomeScreen';
import UserTablesDashScreen from '../features/dasboard/screens/UserTablesDashScreen';
import XScreenDetails from '../screens/XScreenDetails';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { palette } from '../constants/Layout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DashboardHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="XScreenDetails"
        component={XScreenDetails}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: palette.mainColor },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: palette.mainColor,
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        })}
      />
      <Tab.Screen
        name="UserTablesDashScreen"
        component={UserTablesDashScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: 'yellow' },
          tabBarIcon: ({ color, size }) => <MaterialIcons name="table-view" color={color} size={size} />,
          title: 'Tables',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="ChartsDashScreen"
        component={ChartsDashScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" color={color} size={size} />,
          title: 'Charts',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName === 'XScreenDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
