import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    tools: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#363636',
        height: '100%',
        padding: 10,
    },
    button: {
        backgroundColor: '#5035FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    buttonText: {
        fontSize: 25,
        color: '#FFFFFF',
    },
    bookCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        alignItems: 'center',
        marginBottom:10,
    },
})