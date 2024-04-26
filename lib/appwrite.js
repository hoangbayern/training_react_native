import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.personhh.app',
    projectId: '662a0123b52556ee9434',
    databaseId: '662a0541b3fff29fce1b',
    userCollectionId: '662a05a29f8311967efd',
    postCollectionId: '662a05d2209564042310',
    taskCollectionId: '662b230c629c9439eb91',
    storageId: '662a09b1d20f7b2cd38f',
}
// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


    // Register User
export const register = async (email, password, username) => {
   try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
        }
    )
    return newUser;

   } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Register Failed!');
   }
}

export const loginAuth = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
       } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Login Failed!');
       }
 }

 export const getUser = async () => {
    try {
        const infoAccount = await account.get();
        if(!infoAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', infoAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0]; 
    } catch (error) {
        console.log(error);
    }
 }

 export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.postCollectionId,
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
 }

 export const createTask = async (content, creator) => {
    try {
        const newTask = await databases.createDocument(
            config.databaseId,
            config.taskCollectionId,
            ID.unique(),
            {
                content,
                creator
            }
        )
        return newTask;
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Create Failed!');
    }
 }

 export const getAllTasks = async () => {
    try {
        const infoAcc = await getUser();
        if(!infoAcc) throw Error;
        const tasks = await databases.listDocuments(
            config.databaseId,
            config.taskCollectionId,
            [Query.equal('creator', infoAcc.$id)]
        )
        return tasks.documents;
    } catch (error) {
        console.log(error);
    }
 }
