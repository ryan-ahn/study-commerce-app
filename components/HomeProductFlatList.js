import React from 'react';
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

const HomeProductFlatList = (props) => {
  const renderItem = ({ item }) => {
    return (
      <FlatContainer
        onPress={() => {
          props.goToDetail();
          props.dispatch({
            type: 'setDetailData',
            payload: item,
          });
        }}>
        <DiscountSticky
          style={{
            position: 'absolute',
            opacity: item.discount ? '1' : '0',
          }}>
          <SaleText>SALE</SaleText>
          <CountBox>
            <CountText>{item.discount}</CountText>
            <PercentText>%</PercentText>
          </CountBox>
        </DiscountSticky>
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
      </FlatContainer>
    );
  };

  return (
    <StyledSafeAreaView>
      <HeaderView>
        <HeaderText>{props.title}</HeaderText>
      </HeaderView>
      <FlatList
        data={props.data}
        onEndReached={props.onEndReached}
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
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(HomeProductFlatList);

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 350px;
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-start', 'column')};
  width: 100%;
  height: 60px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.fontColors.headerColor};
`;

const FlatContainer = styled(TouchableOpacity)`
  margin-left: 10px;
`;

const DiscountSticky = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  top: 0;
  width: 35px;
  height: 35px;
  background-color: ${Theme.colors.discountColor};
  z-index: 1;
`;

const SaleText = styled(Text)`
  font-size: 8px;
  font-weight: 500;
  color: white;
`;

const CountBox = styled(View)`
  ${Mixin.flexSet('center', 'flex-end', 'row')};
`;
const CountText = styled(Text)`
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

const PercentText = styled(Text)`
  color: white;
  font-size: 9px;
`;
const FlatImage = styled(Image)`
  width: 150px;
  height: 170px;
`;

const FlatText = styled(Text)`
  width: 150px;
  margin-top: 5px;
  color: ${Theme.fontColors.mainColor};
  font-size: 13px;
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
