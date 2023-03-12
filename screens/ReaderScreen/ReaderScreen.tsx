import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';


export function ReaderScreen() {
    const { content } = useRoute().params;
    const pageChars: number = 500;
    const [pageText, setPageText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const bookPages = content.length / pageChars;

    useEffect(() => {
        ReadCurrentPage();
        console.log(bookPages);
        
    }, [currentPage])

    function ReadCurrentPage() {
        const readChar = currentPage * pageChars;
        let text = '';
        for (let index = readChar; index < readChar + pageChars && index < content.length; index++) {
            text += content[index];
        }

        setPageText(text);
    }

    function toNextPage() {
        setCurrentPage(currentPage + 1);
    }

    function toPrevPage() {
        if (currentPage !== 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>{pageText}</Text>
            </ScrollView>

            <View style={styles.tools}>
                <TouchableOpacity onPress={toPrevPage} style={styles.button}>
                    <Text style={styles.buttonText}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toNextPage} style={styles.button}>
                    <Text style={styles.buttonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

