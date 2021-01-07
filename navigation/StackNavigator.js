import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigator';
import ProductDetail from '../screens/ProductDetail';
import WriteReview from '../screens/WriteReview';
import ReviewDetail from '../screens/ReviewDetail';
import WriteInquire from '../screens/WriteInquire';
import Login from '../screens/Login';
import Cart from '../screens/Cart';
import SelectProduct from '../screens/SelectProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import { Mixin } from '../styles/Mixin';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [productCount, setProductCount] = useState(null);

  const getUserData = async () => {
    try {
      const userName = await AsyncStorage.getItem('USER_NAME');
      const userImage = await AsyncStorage.getItem('USER_IMAGE');
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (accessToken !== null) {
        setUserName(userName);
        setUserImage(userImage);
      }
    } catch (e) {}
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.mainColor,
        },
        headerTintColor: Theme.colors.tintColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name='main'
        component={BottomTabNavigation}
        options={({ navigation }) => ({
          title: (
            <ImageContainer>
              <StyledImage source={require('../images/logo_text.png')} />
            </ImageContainer>
          ),
          headerRight: () => (
            <CartContainer onPress={() => navigation.navigate('cart')}>
              <Ionicons name='ios-cart-outline' size={23} color='white' />
              <Badge
                value={productCount}
                textStyle={{ color: 'puple' }}
                badgeStyle={{
                  textColor: 'black',
                  backgroundColor: 'white',
                  opacity: '0.8',
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -3,
                  right: 16,
                }}
              />
            </CartContainer>
          ),
        })}
      />
      <Stack.Screen
        name='productDetail'
        component={ProductDetail}
        options={{
          title: '제품상세',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='login'
        component={Login}
        options={{
          title: '로그인',
        }}
      />
      <Stack.Screen
        name='writeReview'
        component={WriteReview}
        options={{
          title: '구매후기작성',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='reviewDetail'
        component={ReviewDetail}
        options={{
          title: '리뷰보기',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='inquire'
        component={WriteInquire}
        options={{
          title: '문의하기',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='cart'
        component={Cart}
        options={{
          title: '장바구니',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='select'
        component={SelectProduct}
        options={{
          title: '제품선택',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const ImageContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 36px;
`;

const CartContainer = styled(TouchableOpacity)`
  margin-right: 10px;
`;
