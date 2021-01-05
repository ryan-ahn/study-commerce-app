import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ProductReview = (props) => {
  const goToWriteInquire = () => {
    props.navigation.navigate('inquire');
  };

  return (
    <ViewContainer>
      <WriteButtonBox onPress={goToWriteInquire}>
        <ButtonText>상품 문의하기</ButtonText>
      </WriteButtonBox>
      <ReviewBox>
        <Title>[공지] 판매 중단 제품 안내</Title>
        <Description>
          <Writer>마켓홀리 관리자</Writer>
          <Date>2021.01.01</Date>
        </Description>
      </ReviewBox>
      <ReviewBox>
        <Title>장사 그렇게 하지 마세요.</Title>
        <Description>
          <Writer>태현Kim</Writer>
          <Date>2020.12.28</Date>
        </Description>
      </ReviewBox>
      <ReviewBox>
        <Title>택배가 너무 늦게 옵니다.</Title>
        <Description>
          <Writer>Sewon Sin</Writer>
          <Date>2021.01.03</Date>
        </Description>
      </ReviewBox>
    </ViewContainer>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(ProductReview);

const ViewContainer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
`;

const WriteButtonBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'column')};
  height: 45px;
  margin: 7px 0px 20px 0px;
  background-color: #fff;
  border: 1px ${Theme.colors.mainColor};
  border-radius: 3px;
`;

const ButtonText = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  color: ${Theme.colors.mainColor};
`;

const ReviewBox = styled(TouchableOpacity)`
  width: 100%;
  height: 85px;
  padding: 7px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Theme.colors.bodyColor};
`;

const Title = styled(Text)`
  font-size: 14px;
  margin: 10px 0px;
`;

const Description = styled(View)``;

const Writer = styled(Text)`
  padding-right: 9px;
  font-size: 12px;
  color: ${Theme.fontColors.descriptionColor};
`;

const Date = styled(Text)`
  margin-top: 3px;
  font-size: 12px;
  color: ${Theme.fontColors.descriptionColor};
`;
