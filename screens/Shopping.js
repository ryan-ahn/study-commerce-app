import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import { Mixin } from '../styles/Mixin';

const ITEM = [
  {
    label: '할인율순',
    value: 'sale',
  },
  {
    label: '샛별배송',
    value: 'low',
  },
  {
    label: 'Holly Only',
    value: 'holly',
  },
];

const Shopping = (props) => {
  const [productData, setProductData] = useState([]);
  const [sort, setSort] = useState('sale');

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    await fetch(
      'https://gist.githubusercontent.com/Xednicoder/1814a123299c8bff1eb57a5bbdeb3726/raw/5ef96fcd4de71ca03594a84896fea822115d8a74/saleProducts.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => setProductData(result));
  };

  const getProductHighPriceData = async (value) => {
    console.log(value);
    if (value === 'sale') {
      await fetch(
        'https://gist.githubusercontent.com/Xednicoder/1814a123299c8bff1eb57a5bbdeb3726/raw/5ef96fcd4de71ca03594a84896fea822115d8a74/saleProducts.json',
        { method: 'GET' }
      )
        .then((res) => res.json())
        .then((result) => setProductData(result));
    } else if (value === 'holly') {
      await fetch(
        'https://gist.githubusercontent.com/Xednicoder/23e5d95f496b75ab9a98626a9bdbeb6a/raw/d3e90606e29417b49a43009be14c37a6dbd326c2/onlyProducts.json',
        { method: 'GET' }
      )
        .then((res) => res.json())
        .then((result) => setProductData(result));
    } else {
      await fetch(
        'https://gist.githubusercontent.com/Xednicoder/3fb7d54a0a47dc6acf019acd4c5b1400/raw/8ca0ae7d7005e416b21b8672507e2cf9abebdace/newProductsRec.json',
        { method: 'GET' }
      )
        .then((res) => res.json())
        .then((result) => setProductData(result));
    }
  };

  const handleSelect = (value) => {
    getProductHighPriceData(value);
  };

  const goToDetail = () => {
    props.navigation.navigate('productDetail');
  };

  const renderItem = ({ item }) => {
    return (
      <FlatContainer
        onPress={() => {
          goToDetail();
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
        <IconBox>
          <Ionicons
            name='ios-cart-outline'
            size={25}
            style={{ color: 'white' }}
          />
        </IconBox>
        <FlatText>{item.name}</FlatText>
        <PriceBox>
          {item.discount ? (
            <FlatPrice>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                '원'}
            </FlatPrice>
          ) : null}
          <FlatDiscountPrice>
            {item.discountPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
          </FlatDiscountPrice>
        </PriceBox>
        <TagBox
          style={{ position: 'absolute', opacity: item.tagName ? '1' : '0' }}>
          <TagText>{item.tagName}</TagText>
        </TagBox>
      </FlatContainer>
    );
  };

  return (
    <ViewContainer>
      <StyledScrollView>
        <HeaderView>
          <RNPickerSelect
            style={{
              inputIOS: {
                fontSize: 13,
                marginTop: 20,
              },
            }}
            placeholder={{
              label: '정렬필터',
              value: null,
            }}
            items={ITEM}
            onValueChange={(value) => {
              handleSelect(value);
              setSort(value);
            }}
            value={sort}
          />
          <AntDesign
            name='down'
            size={11}
            style={{ marginBottom: 8, margin: 3 }}
          />
        </HeaderView>
        <StyledFlatList
          data={productData}
          numColumns={2}
          onEndReached={props.onEndReached}
          keyExtractor={(product) => String(product.id)}
          onEndReachedThreshold={0.8}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            props.loading ? <ActivityIndicator size='large' /> : null
          }
        />
      </StyledScrollView>
    </ViewContainer>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(Shopping);

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100%;
`;

const StyledScrollView = styled(View)`
  margin: 7px 2px 5px 14px;
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-end', 'row')};
  width: 100%;
  height: 40px;
  padding-right: 17px;
  font-size: 11px;
`;

const StyledFlatList = styled(FlatList)`
  width: 390px;
`;
const FlatContainer = styled(TouchableOpacity)`
  width: 178px;
  height: 325px;
  margin: 5px 5px 15px 5px;
  background-color: white;
`;

const DiscountSticky = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  top: 0;
  width: 43px;
  height: 40px;
  background-color: ${Theme.colors.discountColor};
  z-index: 1;
`;

const SaleText = styled(Text)`
  font-size: 10px;
  font-weight: 500;
  color: white;
`;

const CountBox = styled(View)`
  ${Mixin.flexSet('center', 'flex-end', 'row')};
`;
const CountText = styled(Text)`
  color: white;
  font-size: 15px;
  font-weight: 700;
`;

const PercentText = styled(Text)`
  color: white;
  font-size: 11px;
`;

const IconBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  position: absolute;
  top: 187px;
  right: 5px;
  width: 35px;
  height: 35px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 20px;
  opacity: 0.8;
`;
const FlatImage = styled(Image)`
  width: 180px;
  height: 230px;
`;

const FlatText = styled(Text)`
  width: 150px;
  margin: 10px 6px 5px 8px;
  color: ${Theme.fontColors.mainColor};
  font-size: 13px;
`;

const PriceBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'flex-end', 'row')};
`;

const FlatDiscountPrice = styled(Text)`
  margin-left: 8px;
  color: ${Theme.fontColors.headerColor};
  font-weight: 700;
  font-size: 14px;
`;

const FlatPrice = styled(Text)`
  margin-left: 8px;
  color: ${Theme.fontColors.discountColor};
  text-decoration: line-through;
  text-decoration-color: ${Theme.fontColors.discountColor};
  font-size: 14px;
`;

const TagBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  bottom: 2px;
  width: 45px;
  height: 13px;
  margin: 7px 3px 8px 8px;
  border: 1px solid purple;
`;

const TagText = styled(Text)`
  color: ${Theme.colors.mainColor};
  font-size: 7.5px;
  font-weight: 600;
`;
