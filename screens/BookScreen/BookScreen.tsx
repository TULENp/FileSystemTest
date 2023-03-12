import { View, Text, Button } from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { bookFile } from '../../assets/bookFile';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';


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

    async function readText() {
        await FileSystem.readAsStringAsync(filePath)
            .then(text => navigation.navigate('Reader', { content: text }));
    }
    return (
        <View style={styles.tools}>
            <Button title='Make file' onPress={makeFile} />
            <Button title='read text' onPress={readText} />
        </View>
    )
}