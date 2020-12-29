import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStack from './routers/BottomTabStack';

const Theme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(230, 230, 230)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <StatusBar barStyle='light-content' />
      <BottomTabStack />
    </NavigationContainer>
  );
}
