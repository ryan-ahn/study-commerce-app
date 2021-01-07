import React from 'react';
import { View, Text } from 'react-native';
import StackHeader from '../components/StackHeader';
import styled from 'styled-components';

export default function Cart({ navigation }) {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StackHeader title='장바구니' goBack={goBack} />
      <ViewContainer>
        <Text>hi</Text>
      </ViewContainer>
    </>
  );
}
const ViewContainer = styled(View)``;
