import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Modal, ScrollView, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Task from './Task';
import { useAuth } from '../AuthContext';

export default function TaskScreen({navigation, route}) {
  const [content, setContent] = useState('');
  const [listContent, setListContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const { logout } = useAuth();
  // const { name } = navigation.params;

  const handleAdd = () => {
    if(content != '') {
      setListContent([...listContent, content]);
    }
    setContent('');
  }

  const handleDelete = (index) => {
    const updatedList = [...listContent];
    updatedList.splice(index, 1);
    setListContent(updatedList);
    setShowModal(false);
  }

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const renderRightActions = (progress, dragX, index) => {
    return (
      <TouchableOpacity onPress={() => handleLongPress(listContent[index])}>
        <View style={styles.deleteAction}>
          <Icon name="trash" type="font-awesome" color="#fff" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderTaskItem = (item, index) => {
    return (
      <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}>
        <Task key={`task-${index}`} text={item} />
      </Swipeable>
    );
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={handleHideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete?</Text>
            <TouchableOpacity onPress={() => handleDelete(listContent.indexOf(selectedItem))}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHideModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBody}>
        <View style={styles.logout}>
          <Animated.Text style={styles.title}>Today's tasks</Animated.Text>
          <TouchableOpacity onPress={() => {
            logout();
            navigation.navigate('Login');
          }}>
          <View style={styles.txtLogoutRadius}>
            <Text style={styles.txtLogout}>Logout</Text>
          </View>
        </TouchableOpacity>
        </View>
        <ScrollView style={styles.items}>
          {listContent.map((item, index) => renderTaskItem(item, index))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.iptWrite}>
        <TextInput
          style={styles.input}
          placeholder='Task Content'
          value={content}
          onChangeText={(text) => {
            setContent(text);
          }}
        />
        <TouchableOpacity onPress={handleAdd}>
          <View style={styles.touch}>
            <Text style={styles.textPlus}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {renderDeleteModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentBody: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  iptWrite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 60,
    width: '70%',
    marginLeft: 10
  },
  touch: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPlus: {
    fontSize: 20
  },
  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '70%',
    borderRadius: 10,
    marginRight: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cancelButton: {
    color: 'blue',
    fontSize: 16,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtLogoutRadius: {
    
  },
  txtLogout: {
    marginRight: 25,
    backgroundColor: '#ccc',
    padding: 15,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 15
  }
});
