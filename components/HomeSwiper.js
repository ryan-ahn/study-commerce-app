import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import { Mixin } from '../styles/Mixin';

export default HomeSwiper = (props) => {
  const renderPagination = (index, total) => {
    return (
      <StyledPagination>
        <StyledTotalText>
          <StyledPaginationText>{index + 1}</StyledPaginationText>/{total}
        </StyledTotalText>
      </StyledPagination>
    );
  };

  return (
    <Swiper
      style={styles.swiper}
      renderPagination={renderPagination}
      loop={false}
      autoplay={true}
      autoplayTimeout={3}
      showsButtons={false}>
      {props.data.map((url, index) => (
        <SlideContainer key={index}>
          <SlideImage source={{ uri: url }} />
        </SlideContainer>
      ))}
    </Swiper>
  );
};

const SlideContainer = styled(View)`
  width: 390px;
  height: 390px;
`;

const SlideImage = styled(Image)`
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledPagination = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  position: absolute;
  top: 350px;
  right: 20px;
  width: 40px;
  background-color: black;
  border-radius: 10px;
  opacity: 0.6;
`;

const StyledTotalText = styled(Text)`
  color: gray;
`;
const StyledPaginationText = styled(Text)`
  color: white;
  font-size: 14px;
`;

const styles = StyleSheet.create({
  swiper: {
    height: 390,
  },
});
