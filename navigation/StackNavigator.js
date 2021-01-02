import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigator';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import styled from 'styled-components/native';
import { Theme } from '../styles/Theme';
import { Mixin } from '../styles/Mixin';

const Stack = createStackNavigator();

export default StackNavigator = (props) => {
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
        options={{
          title: (
            <ImageContainer>
              <StyledImage source={require('../images/logo_text.png')} />
            </ImageContainer>
          ),
        }}
      />
      <Stack.Screen
        name='productDetail'
        component={ProductDetail}
        options={{
          title: '제품상세',
        }}
      />
      <Stack.Screen
        name='login'
        component={Login}
        options={{
          title: '로그인',
        }}
      />
    </Stack.Navigator>
  );
};

const ImageContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 36px;
`;
