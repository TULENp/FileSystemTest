import { View, Text, Button, PermissionsAndroid } from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { bookFile } from '../../assets/bookFile';
import { styles } from './styles';
import * as DocumentPicker from 'expo-document-picker';
import { StorageAccessFramework } from 'expo-file-system';

export function BookScreen({ navigation }: any) {

    let filePath = FileSystem.documentDirectory + 'example.txt';
    let content = bookFile.text;

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
        // await FileSystem.readAsStringAsync(path)
        //     .then(text => navigation.navigate('Reader', { content: text }));
        await FileSystem.StorageAccessFramework.readAsStringAsync(path)
            .then(text => navigation.navigate('Reader', { content: text }));
    }
    

    async function AddFromFile() {
        const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false, type: 'text/*' });
        if (res.type === "success") {
            // await FileSystem.copyAsync({ from: res.uri, to: FileSystem.documentDirectory });
            // console.log(FileSystem.documentDirectory + res.name);
            
            readText(res.uri);
            
        }
    }

    


    return (
        <View >
            <View style={styles.tools}>

                <Button title='Make file' onPress={makeFile} />
                <Button title='Give storage permission' onPress={requestReadExternalStoragePermission} />
                <Button title='read text' onPress={() => readText(filePath)} />
                <Button title='Add book from file' onPress={AddFromFile} />

            </View>
        </View>
    )
}