import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';

const ProductImage = (props) => {
  const { detailImage } = props.state.productDetailData;
  return (
    <ViewContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StyledImage source={{ uri: detailImage }} />
      </ScrollView>
    </ViewContainer>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(ProductImage);

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  background-color: white;
  width: 390px;
  height: 100%;
`;

const StyledImage = styled(Image)`
  width: 360px;
  height: 600px;
`;
