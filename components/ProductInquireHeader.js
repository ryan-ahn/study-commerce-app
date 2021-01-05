import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ProductReviewDetailHeader = (props) => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <StyledStatusBar />
      <ViewContainer>
        <StyledTouchableOpacity>
          <AntDesign name='left' size={20} onPress={props.goBack} />
        </StyledTouchableOpacity>
        <HeaderName>상품 문의하기</HeaderName>
      </ViewContainer>
    </>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(ProductReviewDetailHeader);

const StyledStatusBar = styled(SafeAreaView)`
  background-color: ${Theme.colors.white};
`;

const ViewContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  height: 50px;
  background-color: ${Theme.colors.white};
  border-bottom-width: 0.2px;
  border-bottom-color: ${Theme.fontColors.discountColor};
`;

const StyledTouchableOpacity = styled(TouchableOpacity)`
  margin-left: 10px;
`;

const HeaderName = styled(Text)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  color: ${Theme.fontColors.headerColor};
  width: 100%;
  margin-left: 30px;
  font-weight: 400;
  font-size: 15px;
`;
