import { View, Text, Button, PermissionsAndroid, FlatList, Pressable } from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { bookFile } from '../../assets/bookFile';
import { styles } from './styles';
import * as DocumentPicker from 'expo-document-picker';
// import { StorageAccessFramework } from 'expo-file-system';

export function BookScreen({ navigation }: any) {

    //TODO get info about file
    // type TBooks = {
    //     title: string,

    // }
    const [books, setBooks] = useState<string[]>([]);
    let booksDirPath = FileSystem.documentDirectory + 'books/';
    let filePath = booksDirPath + 'prest.txt';
    let content = bookFile.text;

    useEffect(() => {
        GetFiles();
    }, [])

    async function GetFiles() {
        const books = await FileSystem.readDirectoryAsync(booksDirPath);
        setBooks(books);
    }

    //? may not be needed
    const requestReadExternalStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
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
            //* copy file to app's dir/books
            await FileSystem.StorageAccessFramework.copyAsync(
                {
                    from: res.uri,
                    to: booksDirPath
                });
        }
    }

    async function getInfo(path: string) {
        const file = await FileSystem.getInfoAsync(path);
        if (file.exists) {
            alert(JSON.stringify(file));
        }
    }

    function Item({ book }: { book: string }) {
        const path = booksDirPath + book;
        return (
            <Pressable style={styles.bookCard} onPress={() => readText(path)}>
                <Text style={styles.buttonText}>{book}</Text>
                <Button title='remove' onPress={() => FileSystem.deleteAsync(path)} />
                <Button title='info' onPress={() => getInfo(path)} />

            </Pressable>
        )
    }

    return (
        <View >
            <View style={styles.tools}>
                <FlatList
                    data={books}
                    renderItem={({ item }) => <Item book={item} />} />

                {/* <Button title='Make file' onPress={makeFile} />
                <Button title='Give storage permission' onPress={requestReadExternalStoragePermission} /> */}
                <Button title='Add book from file' onPress={AddFromFile} />
                <Button title='Show files' onPress={GetFiles} />
            </View>
        </View>
    )
}