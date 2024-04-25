import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import { Icon } from 'react-native-elements';

export const CardItem = () => {
    const { user } = useAuth();

  return (
    <View className="mt-8 flex-col items-center">
      <View className="w-full px-4 py-6 bg-white rounded-lg shadow-lg">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{ uri: user.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />

                <View>
                    <Text className="text-lg font-semibold">Example 1</Text>
                    <Text className="text-gray-500">{user.username}</Text>
               </View>
            </View>
   
          <TouchableOpacity onPress={() => {}}>
            <Icon name='menu' type='material' size={24} color='black' />
          </TouchableOpacity>
        </View>

        {/* Content (Image with content) */}
        <View className="mt-4">
            <Text className="mt-2 mb-2 text-base">Teststst Text</Text>
            <Image source={{ uri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/34aa18b6-de4a-4b94-9fb2-2b250cea74d6bg2%20abc.jpg' }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
        </View>
      </View>
    </View>
  );
};
