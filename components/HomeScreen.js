import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, Alert, Image } from 'react-native';
import { useAuth } from '../AuthContext';
import { FlatList } from 'react-native-gesture-handler';
import { CardItem } from './CardItem';
import { getAllPosts } from '../lib/appwrite';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import ProfileScreen from './ProfileScreen';
import StoryNews from './StoryNew';

export default function HomeScreen({ navigation, route }) {
  const [dataPost, setDataPost] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    fetchDataPost();
  }, []);

  const fetchDataPost = async () => {
    try {
      const res = await getAllPosts();
      console.log(res);
      setDataPost(res);
    } catch (error) {
      console.log(error);
    }
  };

  const data = [
    {
      url: 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_1280.jpg'
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: '#e3e3ff' }}>
      <FlatList 
      data={dataPost} renderItem={({item}) => ( <CardItem posts={item}/> )} keyExtractor={(item) => item.$id}
      ListHeaderComponent={() => (
        <View className="mt-8 px-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-col">
              <Text className="font-semibold">Welcome Back</Text>
              <Text className="font-bold text-2xl text-sky-300">Play Social</Text>
            </View>
            <View>
              <Avatar
                rounded
                source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
                size="small"
              />
              <Badge
                status="success"
                containerStyle={{ position: 'absolute', top: 25, left: 24 }}
              />
            </View>
          </View>
          <View className="w-full pt-5">
            <Text className="text-lg">Story News</Text>
            <StoryNews />
          </View>
        </View>
  )}
      />
    </SafeAreaView>
  );
}
