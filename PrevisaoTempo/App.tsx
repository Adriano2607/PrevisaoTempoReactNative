
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaHome from './src/screens/TelaHome';
import OutraTela from './src/screens/Telainformacoes';
import React from 'react';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TelaHome} />
        <Stack.Screen name="TelaInformacoes" component={OutraTela} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
