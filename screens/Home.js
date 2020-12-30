import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeRecommend from '../screens/HomeRecommend';
import HomeNewProduct from '../screens/HomeNewProduct';
import HomeBestProduct from '../screens/HomeBestProduct';
import HomeShopping from '../screens/HomeShopping';
import HomeEvent from '../screens/HomeEvent';
import Header from '../components/Header';

const MainTabStack = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <>
      <Header />
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
        <MainTabStack.Screen name='신상품' component={HomeNewProduct} />
        <MainTabStack.Screen name='베스트' component={HomeBestProduct} />
        <MainTabStack.Screen name='알뜰쇼핑' component={HomeShopping} />
        <MainTabStack.Screen name='이벤트' component={HomeEvent} />
      </MainTabStack.Navigator>
    </>
  );
}
