import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackHeader from '../components/StackHeader';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ITEM = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
];

function SelectProduct(props) {
  const [count, setCount] = useState(1);
  const [modal, setModal] = useState(false);
  const { name, discountPrice, price } = props.state;

  const addCart = async () => {
    try {
      const product = { ...props.state, count };
      const productList = await AsyncStorage.getItem('cartTest');
      const newProductList = JSON.parse(productList);
      newProductList.push(product);
      const jsonValue = JSON.stringify(newProductList);
      await AsyncStorage.setItem('cartTest', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const check = async () => {
    try {
      const productList = await AsyncStorage.getItem('cartTest');
      return console.log(productList != null ? JSON.parse(productList) : null);
    } catch (e) {
      console.log(e);
    }
  };

  const goToDetail = () => {
    props.navigation.navigate('productDetail');
  };

  const goToCart = () => {};

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
      <StackHeader goBack={goBack} title='상품 선택' />
      <ViewContainer>
        <ProductContainer>
          <ProductName>{name}</ProductName>
          <PriceBox>
            <FlexRowBox>
              <ProductDiscountPrice>
                {discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </ProductDiscountPrice>
              <ProductPrice>
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </ProductPrice>
            </FlexRowBox>
            <FlexRowBox>
              <CountTextBox>
                <CountText>수량선택</CountText>
              </CountTextBox>
              <PickerBox>
                <RNPickerSelect
                  style={{
                    inputIOS: {
                      fontSize: 13,
                    },
                  }}
                  placeholder={{
                    label: '수량선택',
                    value: null,
                  }}
                  items={ITEM}
                  onValueChange={(value) => {
                    setCount(value);
                  }}
                  value={count}
                />
              </PickerBox>
            </FlexRowBox>
          </PriceBox>
        </ProductContainer>
        <PointBox>
          <PointTextBox>
            <PointText>적립</PointText>
          </PointTextBox>
          <Point>구매시 {parseInt(discountPrice * count * 0.005)}원 적립</Point>
        </PointBox>
        <BuyButtonBox onPress={addCart}>
          <BuyButtonText>
            {(discountPrice * count)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원 장바구니 담기
          </BuyButtonText>
        </BuyButtonBox>
        <Modal animationType='fade' transparent={true} visible={modalVisible}>
          <CenteredView>
            <ModalView
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <ModalHeader>장바구니에 상품을 담았습니다.</ModalHeader>
              <ModalBody>
                동일 품질 상품의 주요 온/오프라인 유통사 가격과 비교하여 컬러가
                설정한 가격에서 할인된 가격입니다.
              </ModalBody>
              <ModalBody>
                적용된 할인가는 대표 상품의 가격으로 옵션에 따라 할인 혜택이
                다를 수 있습니다. 할인 혜택은 당사 사정에 따라 변경될 수
                있습니다.
              </ModalBody>
            </ModalView>
          </CenteredView>
        </Modal>
      </ViewContainer>
    </>
  );
}

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(SelectProduct);

const ViewContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'column')};
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: white;
`;

const ProductContainer = styled(View)`
  width: 100%;
  height: 115px;
  padding: 10px;
  padding-top: 20px;
  background-color: white;
  border-top-color: ${Theme.colors.containerColor};
  border-top-width: 1px;
  border-bottom-color: ${Theme.colors.containerColor};
  border-bottom-width: 1px;
`;
const ProductName = styled(Text)`
  font-weight: 500;
`;

const FlexRowBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
  border-radius: 5px;
`;

const PickerBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 50px;
  height: 20px;
  border: 1px solid #d7d7d7;
`;
const PriceBox = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  margin-top: 30px;
`;

const ProductDiscountPrice = styled(Text)`
  font-size: 15px;
  font-weight: 700;
`;

const ProductPrice = styled(Text)`
  margin-left: 5px;
  color: ${Theme.fontColors.discountColor};
  text-decoration: line-through;
  text-decoration-color: ${Theme.fontColors.discountColor};
  font-size: 12px;
`;

const CountTextBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 70px;
  height: 20px;
  border: 1px solid #d7d7d7;
  background-color: #dbdbdb;
`;

const CountText = styled(Text)`
  font-size: 12px;
`;

const PointBox = styled(View)`
  ${Mixin.flexSet('flex-end', 'center', 'row')};
  width: 100%;
  height: 30px;
  margin-top: 10px;
`;
const PointTextBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 30px;
  height: 20px;
  margin-right: 6px;
  background-color: orange;
  border-radius: 8px;
`;

const PointText = styled(Text)`
  color: white;
  font-size: 11px;
  font-weight: 700;
`;

const Point = styled(Text)``;
const BuyButtonBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 370px;
  height: 50px;
  top: 500px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 7px;
`;

const BuyButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const CenteredView = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 100%;
  height: 800px;
`;
const ModalView = styled(TouchableOpacity)`
  margin: 5px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #999999;
`;

const ModalHeader = styled(Text)`
  color: ${Theme.fontColors.mainColor};
  font-size: 11px;
`;

const ModalBody = styled(Text)`
  color: ${Theme.fontColors.descriptionColor};
  font-size: 10px;
`;
