import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import setProductData from './redux/reducers';

const store = createStore(setProductData);

export default App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};
