import React from 'react';
import ProductDetailTab from '../navigation/ProductDetailTab';
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
