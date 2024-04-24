import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useAuth } from '../AuthContext';
import { FlatList } from 'react-native-gesture-handler';
import { CardItem } from './CardItem';

export default function HomeScreen({ navigation, route }) {
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <FlatList 
      data={[{id: 1}, {id: 2}, {id: 3}]} renderItem={({item}) => ( <CardItem /> )}/>
    </SafeAreaView>
  );
}
