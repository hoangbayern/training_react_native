import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from './CustomForm/FormInput';
import { getUser, loginAuth } from '../lib/appwrite';

export default function Login({ navigation }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn,login,setUser } = useAuth();

  const handleLogin = async () => {
    let isValid = true;

    if (!loginEmail) {
      setEmailError('Please enter your email');
      isValid = false;
    }

    if (!loginPassword) {
      setPasswordError('Please enter your password');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginAuth(loginEmail, loginPassword);
      const result = await getUser();

      console.log('Login response:', response);
      if(response) {
        setIsLoggedIn(true);
        setUser(result);
        login();
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView className="bg-blue-950 h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full justify-center my-6 px-4">
        <Text className="text-5xl mb-10 mt-10 text-white font-bold">Login</Text>
        <FormInput title="Email" value={loginEmail} placeholder="Email" handleChangeText={(text) => {
            setLoginEmail(text);
            setEmailError('');
          }} leftIcon={<Icon name='email' size={24} color='white' />} errorMessage={emailError}/>
        <FormInput title="Password" value={loginPassword} placeholder="Password" handleChangeText={(text) => {
            setLoginPassword(text);
            setPasswordError('');
          }} leftIcon={<Icon name='lock' size={24} color='white' />} errorMessage={passwordError}/>
        <Button
          style={{ borderRadius: 20 }}
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        <TouchableOpacity onPress={handleSignUp}>
            <Text className="mt-8 text-white text-center">Don't have an account? <Text className="text-lime-700 text-base font-bold">Sign Up</Text></Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
