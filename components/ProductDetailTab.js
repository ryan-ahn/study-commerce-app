import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductInformation from '../screens/ProductInformation';
import ProductImage from '../screens/ProductImage';
import ProductDescription from '../screens/ProductDescription';
import ProductReview from '../screens/ProductReview';
import ProductInquire from '../screens/ProductInquire';
import { Theme } from '../styles/Theme';

const TabStack = createMaterialTopTabNavigator();

export default ProductDetailTab = () => {
  return (
    <TabStack.Navigator
      initialRouteName={'상품설명'}
      tabBarOptions={{
        activeTintColor: Theme.colors.mainColor,
        inactiveTintColor: Theme.colors.grayColor,
        style: {
          borderBottomColor: '#d8d8d8',
          borderBottomWidth: 0.5,
        },
        labelStyle: { width: 100 },
      }}>
      <TabStack.Screen name='상품설명' component={ProductInformation} />
      <TabStack.Screen name='상품이미지' component={ProductImage} />
      <TabStack.Screen name='상세정보' component={ProductImage} />
      <TabStack.Screen name='구매후기' component={ProductReview} />
      <TabStack.Screen name='상품문의' component={ProductImage} />
    </TabStack.Navigator>
  );
};
