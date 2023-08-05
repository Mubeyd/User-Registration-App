import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FacebookSVG from '../../../assets/images/misc/facebook.svg';
import GoogleSVG from '../../../assets/images/misc/google.svg';
import LoginSVG from '../../../assets/images/misc/LoginSVG.svg';
import TwitterSVG from '../../../assets/images/misc/twitter.svg';

import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/InputField';
import { useUserContext } from '../../../navigation/Routes';

const LoginScreen = () => {
  const { login } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(async () => {
    if (email === '' || password === '') {
      Alert.alert('Please enter email and password');
      return;
    }
    await login();
  }, [email, login, password]);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <LoginSVG height={300} width={300} style={{ transform: [{ rotate: '-5deg' }] }} />
        </View>

        <Text style={styles.headerTitle}>Login</Text>

        <InputField
          label={'Email ID'}
          icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label={'Password'}
          icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton label={'Login'} onPress={onLogin} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Or, login with ...</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity onPress={() => {}} style={styles.logoButton}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.logoButton}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.logoButton}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerTitle: {
    color: '#333',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 30,
  },
  logoButton: {
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
