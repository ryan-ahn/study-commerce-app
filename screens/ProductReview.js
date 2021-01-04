import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ProductReview = ({ navigation }) => {
  const goToWriteReview = () => {
    navigation.navigate('review');
  };

  return (
    <ViewContainer>
      <WriteButtonBox onPress={goToWriteReview}>
        <ButtonText>후기 쓰기</ButtonText>
      </WriteButtonBox>
    </ViewContainer>
  );
};

// {/* {reviewList.map((item, idx) => {
//     return (
//       <ReviewBox key={idx}>
//         <Subject
//           onPress={() =>
//             navigation.navigate('ReviewDetail', { item: item })
//           }>
//           {item.title}
//         </Subject>
//         <Info>
//           <Writer>{item.review_id}</Writer>
//           <Date>{item.date?.split('T')[0]}</Date>
//         </Info>
//       </ReviewBox>
//     );
//   })} */

function setRedux(state) {
  return {
    state: state.setProductData,
  };
}

export default connect(setRedux)(ProductReview);

const ViewContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 10px;
`;

const WriteButtonBox = styled.TouchableOpacity`
  ${Mixin.flexSet('center', 'center', 'column')};
  height: 45px;
  margin-bottom: 20px;
  margin-top: 7px;
  background-color: #fff;
  border: 1px solid #5f0080;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: #5f0080;
`;

const Writer = styled.Text`
  padding-right: 9px;
  font-size: 12px;
  color: #666;
  line-height: 18px;
`;

const Date = styled(Writer)``;
