/* eslint-disable prettier/prettier */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './views/home/home';
import APOD from './views/apod/apod';
import Preferences from './views/preferences/preferences';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="APOD" component={APOD} />
        <Stack.Screen name="Preferences" component={Preferences} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
