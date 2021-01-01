import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

export default HomeFlatList = (props) => {
  const renderItem = ({ item }) => {
    return (
      <FlatContainer>
        <FlatImage source={{ uri: item.image }} />
        <FlatText>{item.name}</FlatText>
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

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 255px;
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-start', 'column')};
  width: 390px;
  height: 50px;
  margin-left: 8px;
  margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.fontColors.headerColor};
`;

const FlatContainer = styled(View)`
  margin-left: 8px;
`;

const FlatImage = styled(Image)`
  width: 150px;
  height: 150px;
`;

const FlatText = styled(Text)`
  width: 150px;
  margin-top: 5px;
  color: ${Theme.fontColors.mainColor};
  font-size: 13px;
`;
