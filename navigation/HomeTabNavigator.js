import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeRecommend from '../screens/HomeRecommend';
import NewProduct from '../screens/NewProduct';
import BestProduct from '../screens/BestProduct';
import Shopping from '../screens/Shopping';
import Event from '../screens/Event';
import { Theme } from '../styles/Theme';

const MainTabStack = createMaterialTopTabNavigator();

export default function HomeTabNavigator() {
  return (
    <>
      <MainTabStack.Navigator
        tabBarOptions={{
          activeTintColor: Theme.colors.mainColor,
          inactiveTintColor: Theme.colors.grayColor,
          pressColor: Theme.colors.mainColor,
          indicatorStyle: {
            borderBottomWidth: 2,
            borderBottomColor: Theme.colors.mainColor,
          },
          labelStyle: {
            fontSize: 13,
            fontWeight: '600',
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
