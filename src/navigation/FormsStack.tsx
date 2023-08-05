import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import LoginScreen from '../features/auth/screens/LoginScreen';
import { PermissionsScreen } from '../features/home/screens/PermissionsScreen';
import ResumeAndProjects from '../features/userRegistration/screens/ResumeAndProjects';
import UserCareerAndEducation from '../features/userRegistration/screens/UserCareerAndEducation';
import UserRegistrationHome from '../features/userRegistration/screens/UserRegistrationHome';

const Stack = createStackNavigator();

export function FormsStack() {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';

  return (
    <Stack.Navigator initialRouteName={showPermissionsPage ? 'PermissionsScreen' : 'UserRegistrationHome'}>
      <Stack.Screen
        name="PermissionsScreen"
        component={PermissionsScreen}
        options={{
          title: 'Permissions Screen',
        }}
      />

      {/* User Registration */}

      <Stack.Screen
        name="UserRegistrationHome"
        component={UserRegistrationHome}
        options={{
          title: 'User Registration',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UserCareerAndEducation"
        component={UserCareerAndEducation}
        options={{
          title: 'User career and education',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ResumeAndProjects"
        component={ResumeAndProjects}
        options={{
          title: 'Resume and projects',
          headerShown: false,
        }}
      />

      {/* Auth */}

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'User Registration',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
