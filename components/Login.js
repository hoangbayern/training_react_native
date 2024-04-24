import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from './CustomForm/FormInput';

export default function Login({ navigation }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      const response = await axios.post('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/login', {
        username: loginEmail,
        password: loginPassword
      });

      console.log('Login response:', response.data);

      if (response.status === 200) {
        login();
        navigation.navigate('Main', {user: response.data.user.name});
      } else {
        Alert.alert('Login Failed', response.message);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
