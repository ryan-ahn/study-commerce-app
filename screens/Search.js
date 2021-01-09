import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const TEXT = ['레몬', '블루베리', '문블리', '선물세트', '할인', '특가'];

function Search(props) {
  const [products, setProducts] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/46154f43cac6427be56955d7cdd0a6ab/raw/e5f918f5a20953b6cb6146c39f366b3fe98ad89c/productList.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        const filterData = result.filter((product) =>
          product.name.includes(userInput)
        );
        setProducts(filterData);
      });
  }, [userInput]);

  const onChange = (text) => {
    setUserInput(text);
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
        <FlatText>{item.name}</FlatText>
      </FlatContainer>
    );
  };

  return (
    <ViewContainer>
      <SearchContainer>
        <StyledTextInput onChangeText={(text) => onChange(text)} />
        <Feather
          name='search'
          size={13}
          style={{ position: 'absolute', top: 13, left: 13, color: 'gray' }}
        />
      </SearchContainer>
      {userInput.length !== 0 ? (
        <FlatList
          data={products}
          keyExtractor={(product) => String(product.id)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            props.loading ? <ActivityIndicator size='large' /> : null
          }
        />
      ) : null}
      <PopularTextBox>
        <PopularText>인기 검색어</PopularText>
      </PopularTextBox>
      {TEXT.map((ele, index) => (
        <TextTable key={index}>
          <SearchText>{ele}</SearchText>
        </TextTable>
      ))}
    </ViewContainer>
  );
}

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(Search);

const ViewContainer = styled(View)`
  width: 100%;
`;

const SearchContainer = styled(View)`
  width: 100%;
  height: 40px;
  padding: 7px;
  background-color: ${Theme.colors.containerColor};
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  height: 100%;
  padding-left: 25px;
  background-color: white;
`;

const FlatContainer = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 390px;
  height: 40px;
  padding-left: 10px;
  margin-bottom: 10px;
  background-color: ${Theme.colors.mainColor};
`;

const FlatText = styled(Text)`
  width: 100%;
  margin: 10px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const PopularTextBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: white;
`;

const PopularText = styled(Text)`
  font-size: 11px;
  color: ${Theme.fontColors.descriptionColor};
`;

const TextTable = styled(View)`
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.containerColor};
`;

const SearchText = styled(Text)`
  color: ${Theme.colors.mainColor};
  font-size: 13px;
`;
