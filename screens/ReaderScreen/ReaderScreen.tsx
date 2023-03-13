import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';


export function ReaderScreen() {
    const { content } = useRoute().params; // get book text from params
    const pageChars: number = 600; // number of chars in one page 
    const [pageText, setPageText] = useState(''); // text on one page
    const [currentPage, setCurrentPage] = useState(1); // starts from 1, not from 0
    const bookPages = Math.ceil(content.length / pageChars); // number of pages in book

    useEffect(() => {
        ReadCurrentPage();
    }, [currentPage])

    function ReadCurrentPage() {
        if (content) {
            const pageFirstCharNum: number = (currentPage - 1) * pageChars; // number of the first char of current page
            const nextPageFirstCharNum: number = pageFirstCharNum + pageChars; // number of the last char of current page
            let text: string = '';
            let index: number = pageFirstCharNum;

            // is needed to skip a piece of the last word, and read the next word from the beginning
            if (index !== 0) { // only if its not the first word of the book
                while (content[index] !== ' ' && index < content.length) {
                    index++;
                }
                index++; // to avoid space
            }

            
            // read the whole page
            while (index < nextPageFirstCharNum && index < content.length) {
                text += content[index];
                index++
            }
            // for (index; index < nextPageFirstCharNum && index < content.length; index++) {
            //     text += content[index];
            // }

            // is needed to read the last word completely
            while (content[index] !== ' ' && index < content.length) {
                text += content[index];
                index++;
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

