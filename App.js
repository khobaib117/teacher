import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './Teacher/Signup';
import Login from './Teacher/Login';
import create_assignment from './Teacher/create_assignment';
import assignments from './Teacher/assignments';
import Tabletech from './Teacher/Tabletech';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Form1" component={assignments} />
        <Stack.Screen name="Form" component={create_assignment} />
        <Stack.Screen name="Tabletech" component={Tabletech} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
