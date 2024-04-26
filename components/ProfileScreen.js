import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [posts, setPosts] = useState([]);

  // Hàm để mở thư viện ảnh và chọn ảnh
  const openImagePicker = (type) => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (!response.didCancel) {
        if (type === 'avatar') {
          setAvatar(response.assets[0].uri);
        } else if (type === 'coverPhoto') {
          setCoverPhoto(response.assets[0].uri);
        }
      }
    });
  };

  useEffect(() => {
    const mockPosts = [
      { id: '1', content: 'This is post 1' },
      { id: '2', content: 'This is post 2' },
      { id: '3', content: 'This is post 3' },
    ];
    setPosts(mockPosts);
  }, []);

  return (
    <View className="w-full py-10 rounded-lg shadow-lg">
      {/* Ảnh bìa */}
      <TouchableOpacity onPress={() => openImagePicker('coverPhoto')}>
        <Image source={{ uri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' }} style={styles.coverPhoto} />
      </TouchableOpacity>

      {/* Ảnh đại diện */}
      <TouchableOpacity onPress={() => openImagePicker('avatar')} style={styles.avatarContainer}>
        <Image source={{ uri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/7ab339b7-26e0-47e5-aaa5-9587f34373e9Baby-Face-02.jpg' }} style={styles.avatar} />
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 60,
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  postContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
