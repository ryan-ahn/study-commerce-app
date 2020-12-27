import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Shop from '../screens/Shop';

const TabStack = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name='home' component={Home} />
      <TabStack.Screen name='shop' component={Shop} />
    </TabStack.Navigator>
  );
}
