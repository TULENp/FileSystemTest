import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    tools: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#5035FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    buttonText: {
        fontSize: 45,
        color: '#FFFFFF',
    },
    text: {
        fontSize: 25,
    },

})