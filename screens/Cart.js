import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import StackHeader from '../components/StackHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';
import { ScrollView } from 'react-native-gesture-handler';

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
export default function Cart({ navigation }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const productList = await AsyncStorage.getItem('cart');
      const newProductList = JSON.parse(productList);
      setSelectedProducts(newProductList);
    } catch (e) {}
  };

  const clearAll = async () => {
    try {
      const jsonValue = JSON.stringify([]);
      await AsyncStorage.setItem('cart', jsonValue);
      getData();
    } catch (e) {}
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StackHeader title='장바구니' goBack={goBack} />
      <ViewContainer>
        <StyledScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <HeaderContainer>
            <SelectBox>
              <Ionicons
                name='ios-checkmark-circle'
                size={20}
                style={{ color: 'purple' }}
              />
              <AllSelect>전체선택</AllSelect>
            </SelectBox>
            <DeleteBox onPress={clearAll}>
              <DeleteButton>선택 삭제</DeleteButton>
            </DeleteBox>
          </HeaderContainer>
          {selectedProducts.length
            ? selectedProducts.map((product, index) => (
                <ProductContainer key={index}>
                  <Ionicons
                    name='ios-checkmark-circle'
                    size={20}
                    style={{ color: 'purple' }}
                  />
                  <ProductInfomation>
                    <ProductName>{product.name}</ProductName>
                    <PriceBox>
                      <ProductImage source={{ uri: product.image }} />
                      <FlexColumnBox>
                        <ProductDiscountPrice>
                          {product.discountPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </ProductDiscountPrice>
                        <ProductPrice>
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </ProductPrice>
                        <FlexRowBox>
                          <CountTextBox>
                            <CountText>수량</CountText>
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
                              value={product.count}
                            />
                          </PickerBox>
                        </FlexRowBox>
                      </FlexColumnBox>
                    </PriceBox>
                  </ProductInfomation>
                </ProductContainer>
              ))
            : null}
          <Calcurator>
            <Price>
              <CalcuratorText>상품금액</CalcuratorText>
              <PriceReduce>
                {selectedProducts
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price * currentValue.count,
                    0
                  )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
              </PriceReduce>
            </Price>
            <TotalSale>
              <CalcuratorText>상품할인금액</CalcuratorText>
              <PriceReduce>
                -
                {selectedProducts
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      (currentValue.price - currentValue.discountPrice) *
                        currentValue.count,
                    0
                  )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
              </PriceReduce>
            </TotalSale>
            <TotalPrice>
              <CalcuratorText>결제예정금액</CalcuratorText>
              <Result>
                {selectedProducts
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      currentValue.discountPrice * currentValue.count,
                    0
                  )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
              </Result>
            </TotalPrice>
            <PointContainer>
              <PointBox>
                <PointTextBox>
                  <PointText>적립</PointText>
                </PointTextBox>
                <Point>
                  구매시{' '}
                  {parseInt(
                    selectedProducts.reduce(
                      (accumulator, currentValue) =>
                        accumulator +
                        currentValue.discountPrice * currentValue.count,
                      0
                    ) * 0.005
                  )}
                  원 적립
                </Point>
              </PointBox>
              <PointNotice>
                쿠폰/적립금은 주문서에서 사용 가능합니다
              </PointNotice>
            </PointContainer>
          </Calcurator>
          <BuyButtonBox>
            <BuyButtonText>
              {selectedProducts
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    currentValue.discountPrice * currentValue.count,
                  0
                )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원 장바구니 담기
            </BuyButtonText>
          </BuyButtonBox>
        </StyledScrollView>
      </ViewContainer>
    </>
  );
}
const ViewContainer = styled(View)`
  width: 100%;
  height: 100%;
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;
const HeaderContainer = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 45px;
  padding: 10px;
  background-color: white;
`;

const SelectBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
`;

const AllSelect = styled(Text)`
  margin-left: 5px;
`;

const DeleteBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
`;

const DeleteButton = styled(Text)`
  font-size: 13px;
  font-weight: 500;
`;
const ProductContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'flex-start', 'row')};
  margin-top: 10px;
  padding: 10px;
  background-color: white;
`;

const ProductInfomation = styled(View)`
  ${Mixin.flexSet('flex-start', 'flex-start', 'column')};
  padding: 10px;
  background-color: white;
`;
const ProductName = styled(Text)`
  font-weight: 500;
`;

const FlexColumnBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'flex-start', 'column')};
  border-radius: 5px;
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
  ${Mixin.flexSet('flex-start', 'flex-start', 'row')};
  margin-top: 15px;
`;

const ProductImage = styled(Image)`
  width: 65px;
  height: 80px;
  margin-right: 20px;
`;
const ProductDiscountPrice = styled(Text)`
  font-size: 15px;
  font-weight: 700;
`;

const ProductPrice = styled(Text)`
  margin: 5px 0px 20px 0px;
  color: ${Theme.fontColors.discountColor};
  text-decoration: line-through;
  text-decoration-color: ${Theme.fontColors.discountColor};
  font-size: 12px;
`;

const CountTextBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 35px;
  height: 20px;
  border: 1px solid #d7d7d7;
  background-color: #dbdbdb;
`;

const CountText = styled(Text)`
  font-size: 12px;
`;

const Calcurator = styled(View)`
  width: 100%;
  height: 310px;
  padding: 10px;
  background-color: white;
  margin-top: 10px;
`;

const Price = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 30px;
`;

const TotalSale = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
`;

const TotalPrice = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 40px;
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: #f1f1f1;
`;

const CalcuratorText = styled(Text)``;

const PointBox = styled(View)`
  ${Mixin.flexSet('flex-end', 'center', 'row')};
  width: 100%;
  margin: 10px 0;
  margin-bottom: 10px;
`;
const PointTextBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 30px;
  height: 17px;
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

const PriceReduce = styled(Text)`
  font-weight: 500;
`;

const Result = styled(Text)`
  font-size: 15px;
  font-weight: 700;
`;

const PointContainer = styled(View)`
  ${Mixin.flexSet('center', 'flex-end', 'column')};
`;

const PointNotice = styled(Text)`
  color: #555555;
  font-size: 11px;
`;

const BuyButtonBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 370px;
  height: 50px;
  top: -110px;
  margin: 10px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 7px;
`;

const BuyButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
