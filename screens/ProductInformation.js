import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ProductInformation = (props) => {
  const {
    image,
    name,
    description,
    discountPrice,
    price,
    discount,
  } = props.state.productDetailData;
  return (
    <ViewContainer>
      <MainImage source={{ uri: image }} />
      <ProductInfomation>
        <FlexRowBox>
          <ProductTextBox>
            <ProductName>{name}</ProductName>
            <ProductDescription>{description}</ProductDescription>
          </ProductTextBox>
          <IconBox>
            <Ionicons name='share-social-outline' size={20} />
          </IconBox>
        </FlexRowBox>
        <DiscountBox>
          <DiscountText>회원할인가</DiscountText>
          <FlexRowBox>
            <DiscountPrice>
              {discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </DiscountPrice>
            <WonText>원</WonText>
            <DiscountPercent>{discount + '%'}</DiscountPercent>
          </FlexRowBox>
        </DiscountBox>
        <Price>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Price>
        <SavePoint></SavePoint>
      </ProductInfomation>
    </ViewContainer>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(ProductInformation);

const ViewContainer = styled(View)`
  width: 390px;
  height: 450px;
`;

const ProductInfomation = styled(View)`
  padding: 16px;
`;

const FlexRowBox = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
`;

const MainImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ProductTextBox = styled(View)`
  ${Mixin.flexSet('center', 'flex-start', 'column')};
  height: 60px;
  /* background-color: red; */
`;

const ProductName = styled(Text)`
  color: ${Theme.fontColors.headerColor};
  font-size: 14px;
  margin-bottom: 5px;
`;

const ProductDescription = styled(Text)`
  color: ${Theme.fontColors.descriptionColor};
  font-size: 11px;
`;

const IconBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 33px;
  height: 33px;
  border: 1px solid ${Theme.fontColors.discountColor};
  border-radius: 50px;
`;

const DiscountBox = styled(View)`
  ${Mixin.flexSet('center', 'flex-start', 'column')};
  height: 40px;
`;

const DiscountText = styled(Text)`
  margin-bottom: 3px;
  color: ${Theme.fontColors.headerColor};
  font-size: 11px;
`;

const DiscountPrice = styled(Text)`
  color: ${Theme.fontColors.headerColor};
  font-size: 18px;
  font-weight: 600;
`;

const WonText = styled(Text)`
  margin-top: 3px;
  margin-right: 5px;
  font-size: 13px;
  font-weight: 600;
`;
const DiscountPercent = styled(Text)`
  color: #f55333;
  font-size: 18px;
  font-weight: 600;
`;

const Price = styled(Text)``;

const SavePoint = styled(Text)``;
