import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';


export function ReaderScreen() {
    const { content } = useRoute().params; // get book text from params
    const pageChars: number = 600; // number of chars in one page 
    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(1);
    const bookPages = Math.ceil(content.length / pageChars); // number of pages in book

    useEffect(() => {
        ReadCurrentPage();
    }, [currentPage])

    function ReadCurrentPage() {
        if (content) {
            const readChar = (currentPage - 1) * pageChars;
            let text = '';
            for (let index = readChar; index < readChar + pageChars && index < content.length; index++) {
                text += content[index];
            }
            setPageText(text + '\n');
        }
        else {
            setPageText('Книга не найдена');
        }
    }

    function toNextPage() {
        if (currentPage < bookPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function toPrevPage() {
        if (currentPage > 1) {
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
                <Text style={[styles.buttonText, { color: 'black' }]}>{currentPage}</Text>
                <TouchableOpacity onPress={toNextPage} style={styles.button}>
                    <Text style={styles.buttonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

