import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  HomeStackScreen,
  RecommendStackScreen,
  CategoryStackScreen,
  SearchStackScreen,
  MyHollyStackScreen,
} from './StackNavigator';

import HomeRecommend from '../screens/HomeRecommend';
import HomeNewProduct from '../screens/HomeNewProduct';
import HomeBestProduct from '../screens/HomeBestProduct';
import HomeShopping from '../screens/HomeShopping';
import HomeEvent from '../screens/HomeEvent';

const MainTabStack = createMaterialTopTabNavigator();

export default function TopTabStack() {
  return (
    <MainTabStack.Navigator>
      <MainTabStack.Screen name='컬리추천' component={HomeRecommend} />
      <MainTabStack.Screen name='신상품' component={HomeNewProduct} />
      <MainTabStack.Screen name='베스트' component={HomeBestProduct} />
      <MainTabStack.Screen name='알뜰쇼핑' component={HomeShopping} />
      <MainTabStack.Screen name='이벤트' component={HomeEvent} />
    </MainTabStack.Navigator>
  );
}
