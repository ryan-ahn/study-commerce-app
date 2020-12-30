import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeRecommend from '../screens/HomeRecommend';
import NewProduct from '../screens/NewProduct';
import BestProduct from '../screens/BestProduct';
import Shopping from '../screens/Shopping';
import Event from '../screens/Event';
import Header from '../components/Header';

const MainTabStack = createMaterialTopTabNavigator();

export default function HomeTabNavigator() {
  return (
    <>
      <MainTabStack.Navigator
        tabBarOptions={{
          activeTintColor: '#5f0180',
          inactiveTintColor: '#555555',
          pressColor: '#5f0180',
          indicatorStyle: {
            borderBottomWidth: 2,
            borderBottomColor: '#5f0180',
          },
        }}>
        <MainTabStack.Screen name='컬리추천' component={HomeRecommend} />
        <MainTabStack.Screen name='신상품' component={NewProduct} />
        <MainTabStack.Screen name='베스트' component={BestProduct} />
        <MainTabStack.Screen name='알뜰쇼핑' component={Shopping} />
        <MainTabStack.Screen name='이벤트' component={Event} />
      </MainTabStack.Navigator>
    </>
  );
}
