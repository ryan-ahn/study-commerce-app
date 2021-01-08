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
  const [modalVisible, setModalVisible] = useState(false);
  const { name, discountPrice, price } = props.state;

  const addCart = async () => {
    try {
      const product = { ...props.state, count };
      const productList = await AsyncStorage.getItem('cart');
      const newProductList = JSON.parse(productList);
      newProductList.push(product);
      const jsonProduct = JSON.stringify(newProductList);
      await AsyncStorage.setItem('cart', jsonProduct);
      setModalVisible(true);
    } catch (e) {}
  };

  const goToDetail = () => {
    props.navigation.navigate('productDetail');
    setModalVisible(false);
  };

  const goToCart = () => {
    props.navigation.navigate('cart');
    setModalVisible(false);
  };

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
              <ModalHeader>장바구니에 상품을 담았습니다</ModalHeader>
              <ModalButton>
                <GoBackButton onPress={goToDetail}>
                  <BackButtonText>더 구매하기</BackButtonText>
                </GoBackButton>
                <GoCartButton>
                  <CartButtonText onPress={goToCart}>
                    장바구니로 가기
                  </CartButtonText>
                </GoCartButton>
              </ModalButton>
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
  top: 350px;
`;
const ModalView = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 300px;
  margin: 5px;
  padding: 13px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #999999;
`;

const ModalHeader = styled(Text)`
  color: ${Theme.fontColors.mainColor};
  margin-top: 15px;
  font-size: 14px;
`;

const ModalButton = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  margin-top: 15px;
`;

const GoBackButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 100px;
  height: 30px;
  margin: 5px;
  color: ${Theme.fontColors.descriptionColor};
  background-color: ${Theme.colors.containerColor};
  border-radius: 5px;
  font-size: 10px;
`;

const GoCartButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 100px;
  height: 30px;
  margin: 5px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 5px;
  font-size: 10px;
`;

const CartButtonText = styled(Text)`
  color: white;
  font-size: 13px;
  font-weight: 600;
`;

const BackButtonText = styled(Text)`
  color: ${Theme.colors.grayColor};
  font-size: 13px;
  font-weight: 600;
`;
