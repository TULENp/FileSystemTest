import { View, Text, Button, PermissionsAndroid } from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { bookFile } from '../../assets/bookFile';
import { styles } from './styles';
import * as DocumentPicker from 'expo-document-picker';
import { StorageAccessFramework } from 'expo-file-system';

export function BookScreen({ navigation }: any) {

    let filePath = FileSystem.documentDirectory + 'example.txt';
    let booksPath = FileSystem.documentDirectory + '/files/' + 'prest.txt';
    let content = bookFile.text;

    async function GetFiles() {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + '/files/');
        console.log(files);
        alert(files);
    }

    

    //? may not be needed
    const requestReadExternalStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Access granted');
            } else {
                console.log('Access denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    //? may not be needed
    async function makeFile() {
        try {
            //create a file at filePath. Write the content data to it
            await FileSystem.writeAsStringAsync(filePath, content);
            console.log("written to file");
        }
        catch (error) { //if the function throws an error, log it out.
            console.log(error);
        }
    };

    async function readText(path: string) {
        await FileSystem.StorageAccessFramework.readAsStringAsync(path)
            .then(text => navigation.navigate('Reader', { content: text }));
    }

    async function AddFromFile() {
        const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false, type: 'text/*' });
        if (res.type === "success" && FileSystem.documentDirectory) {
            //copy file to app's dir/files
            await FileSystem.StorageAccessFramework.copyAsync({ from: res.uri, to: FileSystem.documentDirectory+'/files' });
            const path = FileSystem.documentDirectory + res.name;
            readText(path);
        }
    }


    return (
        <View >
            <View style={styles.tools}>
                <Button title='Make file' onPress={makeFile} />
                <Button title='Give storage permission' onPress={requestReadExternalStoragePermission} />
                <Button title='read text' onPress={() => readText(booksPath)} />
                <Button title='Add book from file' onPress={AddFromFile} />
                <Button title='Show files' onPress={GetFiles} />
            </View>
        </View>
    )
}