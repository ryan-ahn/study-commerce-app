import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Recommend from '../screens/Recommend';
import Categoty from '../screens/Category';
import Search from '../screens/Search';
import MyHolly from '../screens/MyHolly';
import ProductDetail from '../screens/ProductDetail';

const RecommendStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MyHollyStack = createStackNavigator();

export const RecommendStackScreen = () => {
  return (
    <RecommendStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f0180',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <RecommendStack.Screen
        name='recommend'
        component={Recommend}
        options={{
          title: '추천',
        }}
      />
      <RecommendStack.Screen
        name='productDetail'
        component={ProductDetail}
        options={{
          title: '제품상세',
        }}
      />
    </RecommendStack.Navigator>
  );
};

export const CategoryStackScreen = () => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f0180',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <CategoryStack.Screen
        name='category'
        component={Categoty}
        options={{
          title: '카테고리',
        }}
      />
    </CategoryStack.Navigator>
  );
};

export const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f0180',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SearchStack.Screen
        name='Search'
        component={Search}
        options={{
          title: '검색',
        }}
      />
    </SearchStack.Navigator>
  );
};

export const MyHollyStackScreen = () => {
  return (
    <MyHollyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f0180',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MyHollyStack.Screen
        name='myholly'
        component={MyHolly}
        options={{
          title: '마이홀리',
        }}
      />
    </MyHollyStack.Navigator>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    marginRight: 12,
  },
});
