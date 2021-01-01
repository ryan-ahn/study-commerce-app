import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import HomeFlatList from '../components/HomeFlatList';
import HomeSwiper from '../components/HomeSwiper';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';

const LIMIT = 4;

export default HomeRecommend = () => {
  const [productData, setProductData] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductData();
    getSwiperData();
  }, []);

  const getProductData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/46154f43cac6427be56955d7cdd0a6ab/raw/3a66a449e11dbfa3771a8a94896e6ee82436f956/productList.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setProductData([
          ...productData,
          ...result.slice(offset, offset + LIMIT),
        ]);
        setOffset(offset + LIMIT);
      });
    setLoading(false);
  };

  const getSwiperData = () => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/8bada8b057954b4c9b8b127c17328fd7/raw/c4b9e38e71615169ba70c07687172f73221d0ae8/slideUrl.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setSlideData(result);
      });
  };

  const onEndReached = () => {
    getProductData();
  };

  const goToProductDetail = (e) => {
    navigation.navigate('productDetail');
  };

  return (
    <ViewContainer>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <HomeSwiper data={slideData} />
        <HomeFlatList
          title={'태현의 추천 상품'}
          data={productData.filter((product) => product.recommend === true)}
          offset={offset}
          loading={loading}
          onEndReached={onEndReached}
        />
        <HomeFlatList
          title={'이달의 신규 상품'}
          data={productData.filter((product) => product.newProduct === true)}
          offset={offset}
          loading={loading}
          onEndReached={onEndReached}
        />
      </StyledScrollView>
    </ViewContainer>
  );
};

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
  height: 100%;
`;

const StyledScrollView = styled(ScrollView)`
  background-color: #f9f9f9;
`;
