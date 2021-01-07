import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

function ProductReview(props) {
  const goToWriteReview = () => {
    props.navigation.navigate('writeReview');
  };

  const goToReviewDetail = (index) => {
    const target = props.state.review[index];
    props.navigation.navigate('reviewDetail', { target });
  };

  return (
    <ViewContainer>
      <WriteButtonBox onPress={goToWriteReview}>
        <ButtonText>후기 쓰기</ButtonText>
      </WriteButtonBox>
      {props.state.review.map((reviewSet, index) => (
        <ReviewBox key={index} onPress={() => goToReviewDetail(index)}>
          <Title>{reviewSet._title}</Title>
          <Description>
            <Writer>{reviewSet._writer}</Writer>
            <Date>
              {reviewSet._date.split(' ')[3] +
                '. 01 .' +
                reviewSet._date.split(' ')[2]}
            </Date>
          </Description>
        </ReviewBox>
      ))}
    </ViewContainer>
  );
}

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
