import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Recommend from '../screens/Recommend';
import Categoty from '../screens/Category';
import Search from '../screens/Search';
import MyHolly from '../screens/MyHolly';
import ProductDetail from '../screens/ProductDetail';

const HomeStack = createStackNavigator();
const RecommendStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MyHollyStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f0180',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name='home'
        component={Home}
        options={{
          headerTitle: (
            <Image
              style={{ height: 36, width: 50 }}
              source={require('../images/logo_text.png')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.cartIcon}>
              <IoniconsIcon name='cart-outline' color='white' size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name='ProductDetail'
        component={ProductDetail}
        options={{ title: '홈' }}
      />
    </HomeStack.Navigator>
  );
};

export const RecommendStackScreen = () => {
  return (
    <RecommendStack.Navigator>
      <RecommendStack.Screen
        name='recommend'
        component={Recommend}
        options={{
          title: '추천',
        }}
      />
    </RecommendStack.Navigator>
  );
};

export const CategoryStackScreen = () => {
  return (
    <CategoryStack.Navigator>
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
    <SearchStack.Navigator>
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
    <MyHollyStack.Navigator>
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
