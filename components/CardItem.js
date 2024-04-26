import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import { Icon } from 'react-native-elements';

export const CardItem = ({ posts: {title, thumbnail, content, creator: { avatar, username }} }) => {

  return (
    <View className="mt-3 flex-col items-center">
      <View className="w-full px-4 py-6 bg-white rounded-lg shadow-lg">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{ uri: avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />

                <View>
                    <Text className="text-lg font-semibold">{title}</Text>
                    <Text className="text-gray-500">{username}</Text>
               </View>
            </View>
   
          <TouchableOpacity onPress={() => {}}>
            <Icon name='menu' type='material' size={24} color='black' />
          </TouchableOpacity>
        </View>

        {/* Content (Image with content) */}
        <View className="mt-4">
            <Text className="mt-2 mb-2 text-base">{content}</Text>
            <Image source={{ uri: thumbnail }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
        </View>
      </View>
    </View>
  );
};
