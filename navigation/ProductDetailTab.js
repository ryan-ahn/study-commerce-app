import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductInformation from '../screens/ProductInformation';
import ProductImage from '../screens/ProductImage';
import ProductDescription from '../screens/ProductDescription';
import ProductReview from '../screens/ProductReview';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const TabStack = createMaterialTopTabNavigator();

export default ProductDetailTab = () => {
  return (
    <>
      <TabStack.Navigator
        initialRouteName={'상품설명'}
        tabBarOptions={{
          activeTintColor: Theme.colors.mainColor,
          inactiveTintColor: Theme.colors.grayColor,
          pressColor: Theme.colors.mainColor,
          indicatorStyle: {
            borderBottomWidth: 2,
            borderBottomColor: Theme.colors.mainColor,
          },
          style: {
            borderBottomColor: '#d8d8d8',
            borderBottomWidth: 0.5,
          },
          labelStyle: { width: 100 },
        }}>
        <TabStack.Screen name='상품설명' component={ProductInformation} />
        <TabStack.Screen name='상품이미지' component={ProductImage} />
        <TabStack.Screen name='상세정보' component={ProductDescription} />
        <TabStack.Screen name='구매후기' component={ProductReview} />
        <TabStack.Screen name='상품문의' component={ProductImage} />
      </TabStack.Navigator>
      <ViewContainer>
        <BuyButtonBox>
          <BuyButtonText>구매하기</BuyButtonText>
        </BuyButtonBox>
      </ViewContainer>
    </>
  );
};

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
  height: 10px;
  background-color: white;
`;

const BuyButtonBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 370px;
  height: 50px;
  top: -55px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 7px;
`;

const BuyButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
