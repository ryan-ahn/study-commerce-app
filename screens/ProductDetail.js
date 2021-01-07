import React from 'react';
import ProductDetailTab from '../navigation/ProductDetailTab';
import ProductDetailHeader from '../components/ProductDetailHeader';

export default function ProductDetail({ navigation }) {
  const goBack = () => {
    navigation.goBack();
  };

  const goToSelectProduct = () => {
    navigation.navigate('select');
  };

  return (
    <>
      <ProductDetailHeader goBack={goBack} />
      <ProductDetailTab goToSelectProduct={goToSelectProduct} />
    </>
  );
}
