import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Task({ tasks: { content } }) {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
            <View style={styles.squareBT}></View>
            <Text style={styles.text}>{content}</Text>
        </View>
        <View style={styles.circleBT}></View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        marginRight: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    squareBT: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 20
    },
    text: {
        fontSize: 16
    },
    circleBT: {
        width: 12,
        height: 12,
        backgroundColor: '#55BCF6',
        borderRadius: 5,
        opacity: 0.4
    },
  });
