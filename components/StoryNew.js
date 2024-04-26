import React from 'react';
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const StoryItem = ({ imageUri, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.storyItem}>
    <Image source={{ uri: imageUri }} style={styles.storyImage} />
  </TouchableOpacity>
);

const StoryNews = () => {
  const stories = [
    { id: 1, imageUri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' },
    { id: 2, imageUri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' },
    { id: 3, imageUri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' },
    { id: 4, imageUri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' },
    { id: 5, imageUri: 'https://carebee-user-images-dev-dev.s3.ap-northeast-1.amazonaws.com/user_images/supporter/images/409fe62b-6aca-4dd0-b5a7-1f8fcc560b4ebg1.jpg' },
  ];

  const renderStoryItem = ({ item }) => (
    <StoryItem imageUri={item.imageUri} onPress={() => console.log('Story', item.id)} />
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
          horizontal
          data={stories}
          renderItem={renderStoryItem}
          keyExtractor={photo => photo.id}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          pagingEnabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  storyItem: {
    width: 100,
    height: 170,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
});

export default StoryNews;
