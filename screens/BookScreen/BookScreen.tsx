import { View, Text, Button, PermissionsAndroid } from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { bookFile } from '../../assets/bookFile';
import { styles } from './styles';
import * as DocumentPicker from 'expo-document-picker';

export function BookScreen({ navigation }: any) {

    let filePath = FileSystem.documentDirectory + 'example.txt';
    // const [text, setText] = useState('Пусто');
    let content = bookFile.text;

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
        await FileSystem.readAsStringAsync(path)
            .then(text => navigation.navigate('Reader', { content: text }));
    }

    async function AddBookFromFile() {
        let result = await DocumentPicker.getDocumentAsync({ type: 'text/*' });

        if (result.type == 'success') {
            readText(FileSystem.cacheDirectory + result.name);
            console.log(result.uri);
        }


        // const cachePath = "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/5a593e44-1c98-4795-98cd-391687fc9f6f.txt";
        // FileSystem.readAsStringAsync(cachePath)
        //     .then(text => navigation.navigate('Reader', { content: text }));
    }

    const load = async () => {
        const res = await DocumentPicker.getDocumentAsync({ type: 'text/*' })
        if (res.type === "success") {
            readText(res.uri)
        } 
    }

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


    return (
        <View >
            <View style={styles.tools}>

                <Button title='Make file' onPress={makeFile} />
                <Button title='Give storage permission' onPress={requestReadExternalStoragePermission} />
                <Button title='read text' onPress={() => readText(filePath)} />
                <Button title='Add book from file' onPress={load} />

            </View>
        </View>
    )
}