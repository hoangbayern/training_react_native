import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export default function Login({ navigation }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        navigation.navigate('Home', {name: response.data.user.name});
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text h1 style={styles.title}>Login</Text>
        <Input
          placeholder="Email"
          onChangeText={(text) => {
            setLoginEmail(text);
            setEmailError('');
          }}
          value={loginEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name='email' size={24} color='black' />}
          inputContainerStyle={styles.inputContainer}
          errorMessage={emailError}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => {
            setLoginPassword(text);
            setPasswordError('');
          }}
          value={loginPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          leftIcon={<Icon name='lock' size={24} color='black' />}
          rightIcon={
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              type='ionicon'
              size={24}
              color='black'
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          inputContainerStyle={styles.inputContainer}
          errorMessage={passwordError}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          buttonStyle={styles.button}
          loading={loading}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#1877f2',
    borderRadius: 20,
  },
});
