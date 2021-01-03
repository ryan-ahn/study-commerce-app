import React from 'react';
import ProductDetailTab from '../components/ProductDetailTab';
import ProductDetailHeader from '../components/ProductDetailHeader';

export default ProductDetail = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ProductDetailHeader goBack={goBack} />
      <ProductDetailTab />
    </>
  );
};
