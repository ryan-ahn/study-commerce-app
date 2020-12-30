import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import HomeTabNavigator from './HomeTabNavigator';
import Recommend from '../screens/Recommend';
import Category from '../screens/Category';
import Search from '../screens/Search';
import MyHolly from '../screens/MyHolly';
import { Theme } from '../styles/Theme';

const Tab = createBottomTabNavigator();

export default BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={'홈'}
      tabBarOptions={{
        activeTintColor: Theme.colors.mainColor,
        style: {
          backgroundColor: Theme.colors.white,
          paddingBottom: 25,
        },
      }}>
      <Tab.Screen
        name='홈'
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IoniconsIcon name='home-sharp' size={25} color='#5f0180' />
            ) : (
              <IoniconsIcon name='home-outline' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <Tab.Screen
        name='추천'
        component={Recommend}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntdIcon name='star' size={25} color='#5f0180' />
            ) : (
              <AntdIcon name='staro' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <Tab.Screen
        name='카테고리'
        component={Category}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FeatherIcon name='menu' size={25} color='#5f0180' />
            ) : (
              <FeatherIcon name='menu' size={25} color='#4d4d4d' />
            ),
        }}
      />
      <Tab.Screen
        name='검색'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IoniconsIcon name='ios-search' size={27} color='#5f0180' />
            ) : (
              <AntdIcon name='search1' size={24} color='#4d4d4d' />
            ),
        }}
      />
      <Tab.Screen
        name='마이홀리'
        component={MyHolly}
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
    </Tab.Navigator>
  );
};
