import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SkillsDashScreen from '../features/dasboard/screens/SkillsDashScreen';
import SettingsScreen from '../features/dasboard/screens/SettingsScreen';

import { palette } from '../constants/Layout';
import ProjectsDashScreen from '../features/dasboard/screens/ProjectsDashScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DashboardStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: palette.mainColor,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Skills"
        component={SkillsDashScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="code-slash-outline" size={22} color={color} />,
          title: 'Skills',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Projects"
        component={ProjectsDashScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="rocket-outline" size={22} color={color} />,
          title: 'Projects',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DashboardStack;
