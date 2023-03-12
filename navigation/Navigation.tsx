import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BookScreen } from '../screens/BookScreen';
import { ReaderScreen } from '../screens/ReaderScreen';

const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Main'>
                <Stack.Screen name="Main" component={BookScreen} options={{ title: 'Book' }} />
                <Stack.Screen name="Reader" component={ReaderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
