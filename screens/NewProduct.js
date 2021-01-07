import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import { Mixin } from '../styles/Mixin';

const LIMIT = 16;
const ITEM = [
  {
    label: '신상품순',
    value: 'new',
  },
  {
    label: '낮은가격순',
    value: 'low',
  },
  {
    label: '높은가격순',
    value: 'high',
  },
  {
    label: '추천순',
    value: 'recommend',
  },
];

const NewProduct = (props) => {
  const [productData, setProductData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState('new');

  useEffect(() => {
    getProductData();
  }, []);

  console.log(sorting);
  useEffect(() => {
    if (sorting === 'high') {
      const hightSort = productData.sort(function (a, b) {
        console.log(hightSort);
        return a['discountPrice'] > b['discountPrice'];
      });
      setProductData(hightSort);
    } else if (sorting === 'low') {
    } else if (sorting === 'new') {
      getProductData();
    } else if (sorting === 'recommend') {
      setProductData(
        productData.sort(function (a, b) {
          return a === b ? 0 : a ? -1 : 1;
        })
      );
    }
  }, [sorting]);

  const getProductData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await fetch(
      'https://gist.githubusercontent.com/Xednicoder/46154f43cac6427be56955d7cdd0a6ab/raw/e5f918f5a20953b6cb6146c39f366b3fe98ad89c/productList.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setProductData([
          ...productData,
          ...result
            .slice(offset, offset + LIMIT)
            .filter((product) => product.newProduct === true),
        ]);
        setOffset(offset + LIMIT);
      });
    setLoading(false);
  };

  const goToDetail = (e) => {
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
                fontSize: 11,
                marginTop: 20,
              },
            }}
            placeholder={{
              label: 'Select a product',
              value: null,
            }}
            items={ITEM}
            onValueChange={(value) => {
              setSorting(value);
            }}
            value={sorting}
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

export default connect(setRedux)(NewProduct);

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 100%;
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
