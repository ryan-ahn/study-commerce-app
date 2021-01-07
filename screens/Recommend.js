import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

function Recommend(props) {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    await fetch(
      'https://gist.githubusercontent.com/Xednicoder/46154f43cac6427be56955d7cdd0a6ab/raw/e5f918f5a20953b6cb6146c39f366b3fe98ad89c/productList.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setProductData(result);
      });
  };
  const renderItem = ({ item }) => {
    return (
      <FlatContainer>
        <RankingSticky style={{ position: 'absolute' }}>
          <RankNumber>{item.id}</RankNumber>
        </RankingSticky>
        <FlatImage source={{ uri: item.image }} />
        <FlatText>{item.name}</FlatText>
        <FlatDiscountPrice>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
        </FlatDiscountPrice>
        {item.discount ? (
          <FlatPrice>
            {item.discountPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
          </FlatPrice>
        ) : null}
        <DescriptionText>
          왜 추천인지 써야하는 공간인데 서버 만들때 예정에 없던 데이터라 안
          넣었고 어쩔 수 없이 하드코딩 하고 있는데 길게 써야 좀 있어 보일 것
          같고 그래서 아무말이나 계속 쓰고 있고
        </DescriptionText>
      </FlatContainer>
    );
  };

  return (
    <StyledSafeAreaView>
      <HeaderView>
        <HeaderText>겨울에 많이 찾는 과일 랭킹</HeaderText>
      </HeaderView>
      <FlatList
        data={productData}
        keyExtractor={(product) => String(product.id)}
        onEndReachedThreshold={0.8}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={
          props.loading ? <ActivityIndicator size='large' /> : null
        }
      />
    </StyledSafeAreaView>
  );
}

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(Recommend);

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-start', 'column')};
  width: 100%;
  height: 60px;
  padding-left: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.fontColors.headerColor};
`;

const FlatContainer = styled(TouchableOpacity)`
  width: 300px;
  height: 590px;
  margin-left: 15px;
  margin-top: 12px;
  padding: 20px;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;

const RankingSticky = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  z-index: 1;
`;

const RankNumber = styled(Text)`
  color: white;
  font-size: 150px;
  text-shadow: 1px 0 #999999;
`;

const FlatImage = styled(Image)`
  width: 100%;
  height: 350px;
`;

const FlatText = styled(Text)`
  width: 250px;
  margin-top: 20px;
  color: ${Theme.fontColors.mainColor};
  font-size: 15px;
  margin-bottom: 5px;
`;

const FlatDiscountPrice = styled(Text)`
  color: ${Theme.fontColors.headerColor};
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
`;

const FlatPrice = styled(Text)`
  color: ${Theme.fontColors.discountColor};
  text-decoration: line-through;
  text-decoration-color: ${Theme.fontColors.discountColor};
  font-size: 12px;
`;

const DescriptionText = styled(Text)`
  margin-top: 15px;
  color: #666666;
  font-size: 13px;
`;
