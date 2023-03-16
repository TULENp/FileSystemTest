import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BookScreen } from '../screens/BookScreen';
import { ReaderScreen } from '../screens/ReaderScreen';

const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main'
                screenOptions={
                    {
                        headerStyle: { backgroundColor: '#4781c8' },
                        headerTitleStyle: { color: 'white' }
                    }}>
                <Stack.Screen name="Main" component={BookScreen} options={{ title: 'Books' }} />
                <Stack.Screen name="Reader" component={ReaderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
