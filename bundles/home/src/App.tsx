import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Screen} from './Screen';
import React from 'react';
import { navigationRef } from './navigator';
import { ProfileScreen } from './Profile';
import { SettingsScreen } from './Settings';

const Stack = createNativeStackNavigator();

export const App = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Screen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};
