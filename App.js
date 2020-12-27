import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStack from './routers/BottomTabStack';

export default function App() {
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <BottomTabStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationContainer: {
    backgroundColor: '#dbdbdb',
  },
});
