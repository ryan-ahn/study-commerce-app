import React from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';

export default function ProductDescription() {
  return (
    <ViewContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StyledImage source={{ uri: 'https://ifh.cc/g/bSwXkE.jpg' }} />
      </ScrollView>
    </ViewContainer>
  );
}

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
`;

const StyledImage = styled(Image)`
  width: 390px;
  height: 1250px;
`;
