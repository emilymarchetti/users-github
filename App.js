import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./pages/DetailScreen";
import ListFollowersScreen from "./pages/ListFollowersScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: 'Inicio' }} component={HomeScreen} />
        <Stack.Screen name="Detail" options={{ title: 'Detalhes' }} component={DetailScreen} />
        <Stack.Screen name="ListFollowersScreen" options={{ title: 'Seguidores' }} component={ListFollowersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;