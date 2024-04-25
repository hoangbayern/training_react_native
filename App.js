import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import { AuthProvider, useAuth } from './AuthContext';
import MainTabNavigator from './components/MainTabNavigator';
import Register from './components/Register';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // const { isLoggedIn } = useAuth();
  
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.replace('Main');
  //   }
  // }, [isLoggedIn]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Register', headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login', headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
