import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from './CustomForm/FormInput';
import { register } from '../lib/appwrite';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  const resetData = () => {
    setUsername('');
    setLoginEmail('');
    setLoginPassword('');
  }
  const handleLogin = async () => {
    let isValid = true;

    if (!username) {
      setUserNameError('Please enter your username');
      isValid = false;
    }

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
      register(loginEmail, loginPassword, username);
      navigation.navigate('Login');
      resetData();
      Alert.alert('Success', 'Register Sucessfully.');
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="bg-blue-950 h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full justify-center my-6 px-4">
        <Text className="text-5xl mb-10 mt-10 text-white font-bold">Register</Text>
        <FormInput title="Username" value={username} placeholder="Username" handleChangeText={(text) => {
            setUsername(text);
            setUserNameError('');
          }} leftIcon={<Icon name='person' size={24} color='white' />} errorMessage={userNameError}/>
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
          title="Register"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
            <Text style={{ color: 'white' }}>Have an account already? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={{ color: '#00FF00', fontWeight: 'bold', fontSize: 15, alignItems: 'center' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
