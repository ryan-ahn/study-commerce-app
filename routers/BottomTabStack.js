import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  RecommendStackScreen,
  CategoryStackScreen,
  SearchStackScreen,
  MyHollyStackScreen,
} from './StackNavigator';
import Home from '../screens/Home';

const TabStack = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <TabStack.Navigator
      initialRouteName={'홈'}
      tabBarOptions={{
        activeTintColor: '#5f0180',
        style: {
          backgroundColor: '#fff',
          paddingBottom: 25,
        },
      }}>
      <TabStack.Screen
        name='홈'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IoniconsIcon name='home-sharp' size={25} color='#5f0180' />
            ) : (
              <IoniconsIcon name='home-outline' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <TabStack.Screen
        name='추천'
        component={RecommendStackScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntdIcon name='star' size={25} color='#5f0180' />
            ) : (
              <AntdIcon name='staro' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <TabStack.Screen
        name='카테고리'
        component={CategoryStackScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FeatherIcon name='menu' size={25} color='#5f0180' />
            ) : (
              <FeatherIcon name='menu' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <TabStack.Screen
        name='검색'
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IoniconsIcon name='ios-search' size={27} color='#5f0180' />
            ) : (
              <AntdIcon name='search1' size={24} color='#4d4d4d' />
            ),
        }}
      />
      <TabStack.Screen
        name='마이홀리'
        component={MyHollyStackScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IoniconsIcon name='ios-people-sharp' size={25} color='#5f0180' />
            ) : (
              <IoniconsIcon
                name='ios-people-outline'
                size={25}
                color='#4d4d4d'
              />
            ),
        }}
      />
    </TabStack.Navigator>
  );
}
