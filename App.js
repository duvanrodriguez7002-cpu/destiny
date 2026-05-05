import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DestinationScreen from './src/screens/DestinationScreen';
import StatusScreen from './src/screens/StatusScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mapa' }}
        />

        <Stack.Screen
          name="Destination"
          component={DestinationScreen}
          options={{ title: 'Destino' }}
        />

        <Stack.Screen
          name="Status"
          component={StatusScreen}
          options={{ title: 'Estado' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}