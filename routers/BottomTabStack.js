import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Recommend from '../screens/Recommend';
import Categoty from '../screens/Category';
import Search from '../screens/Search';
import MyHolly from '../screens/MyHolly';
import ProductDetail from '../screens/ProductDetail';

const TabStack = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const RecommendStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MyHollyStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='home'
        component={Home}
        options={{
          title: '홈 화면',
        }}
      />
      <HomeStack.Screen name='ProductDetail' component={ProductDetail} />
    </HomeStack.Navigator>
  );
};

const RecommendStackScreen = () => {
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

const CategoryStackScreen = () => {
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

const SearchStackScreen = () => {
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

const MyHollyStackScreen = () => {
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
        component={HomeStackScreen}
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
