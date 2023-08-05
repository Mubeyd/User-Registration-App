import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import DashboardStack from './DashboardStack';
import { FormsStack } from './FormsStack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { palette } from '../constants/Layout';
import {
  IUserPersonalInfo,
  IUserResumeAndProjects,
  IUserWorkAndEducation,
} from '../features/userRegistration/db/types';

interface IUserContext {
  userPersonalInfo: IUserPersonalInfo | null;
  userWorkAndEducation: IUserWorkAndEducation | null;
  userResumeAndProjects: IUserResumeAndProjects | null;
  logout: () => Promise<void>;
  login: () => Promise<void>;
}

interface IAuthContext {
  isLoggedIn: boolean;
}

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

const Routes = () => {
  const [userPersonalInfo, setSerPersonalInfo] = useState<IUserPersonalInfo | null>(null);
  const [userWorkAndEducation, setUserWorkAndEducation] = useState<IUserWorkAndEducation | null>(null);
  const [userResumeAndProjects, setUserResumeAndProjects] = useState<IUserResumeAndProjects | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<IAuthContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        // AsyncStorage.removeItem('userPersonalInfo'),
        // AsyncStorage.removeItem('userWorkAndEducation'),
        // AsyncStorage.removeItem('userResumeAndProjects'),
        AsyncStorage.removeItem('isLoggedIn'),
      ]);
      setSerPersonalInfo(null);
      setUserWorkAndEducation(null);
      setUserResumeAndProjects(null);
      setIsLoggedIn(null);
    } catch (e) {
      // saving error
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true }));
      setIsLoggedIn({ isLoggedIn: true });
    } catch (e) {
      // saving error
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userPersonalInfoStr, userWorkAndEducationStr, userResumeAndProjectsStr, isLoggedInStr] =
          await Promise.all([
            AsyncStorage.getItem('userPersonalInfo'),
            AsyncStorage.getItem('userWorkAndEducation'),
            AsyncStorage.getItem('userResumeAndProjects'),
            AsyncStorage.getItem('isLoggedIn'),
          ]);

        if (userPersonalInfoStr) {
          const userPersonalInfoData = JSON.parse(userPersonalInfoStr) as IUserPersonalInfo;
          if (userPersonalInfoData) {
            setSerPersonalInfo(userPersonalInfoData);
          }
        }

        if (userWorkAndEducationStr) {
          const userWorkAndEducationData = JSON.parse(userWorkAndEducationStr) as IUserWorkAndEducation;
          if (userWorkAndEducationData) {
            setUserWorkAndEducation(userWorkAndEducationData);
          }
        }

        if (userResumeAndProjectsStr) {
          const userResumeAndProjectsData = JSON.parse(userResumeAndProjectsStr) as IUserResumeAndProjects;
          if (userResumeAndProjectsData) {
            setUserResumeAndProjects(userResumeAndProjectsData);
          }
        }

        if (isLoggedInStr) {
          const isLoggedInData = JSON.parse(isLoggedInStr);
          if (isLoggedInData !== null) {
            setIsLoggedIn(isLoggedInData);
          }
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator size="large" color={palette.mainColor} />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ userPersonalInfo, userWorkAndEducation, userResumeAndProjects, logout, login }}>
      <NavigationContainer>{isLoggedIn ? <DashboardStack /> : <FormsStack />}</NavigationContainer>
    </UserContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({
  containerIndicator: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
  },
});
