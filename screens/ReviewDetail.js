import React from 'react';
import { View, Text, ScrollView, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackHeader from '../components/StackHeader';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

function ProductReview(props) {
  const { _addImage, _title, _bodyText, _date } = props.route.params.target;
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
      <StackHeader goBack={goBack} title='구매 후기 상세' />
      <ViewContainer>
        <StyledScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <ProductNameBox>
            <ProductName>{props.state.name}</ProductName>
          </ProductNameBox>
          <Body>
            <ImageBox>
              {_addImage.map((image, index) => (
                <BodyImage
                  key={index}
                  source={{
                    uri: image,
                  }}></BodyImage>
              ))}
            </ImageBox>
            <Title>{_title}</Title>
            <BodyText>{_bodyText}</BodyText>
            <NoticeBox>
              <Date>{_date.slice(0, 15)}</Date>
              <Notice>도움이 돼요 0</Notice>
            </NoticeBox>
          </Body>
          <WarningBox>
            <Ionicons
              name='warning-outline'
              size={15}
              style={{ color: '#5f0180' }}
            />
            <WarningText>신고</WarningText>
          </WarningBox>
        </StyledScrollView>
      </ViewContainer>
    </>
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
`;

const StyledScrollView = styled(ScrollView)`
  margin-top: 10px;
  padding: 15px;
  background-color: white;
`;
const ProductNameBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  height: 30px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Theme.colors.borderColor};
`;
const ProductName = styled(Text)`
  color: ${Theme.colors.grayColor};
  font-size: 13px;
  font-weight: 500;
`;

const Body = styled(View)`
  margin: 10px 0px 10px 0px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Theme.colors.borderColor};
`;
const ImageBox = styled(View)`
  margin: 10px 0px;
`;
const BodyImage = styled(Image)`
  width: 100%;
  height: 250px;
  margin-bottom: 5px;
`;

const Title = styled(Text)`
  margin: 10px 0px;
  font-size: 13px;
  font-weight: 600;
`;

const BodyText = styled(Text)`
  padding: 10px 0px;
  margin-bottom: 10px;
  font-size: 12px;
`;

const NoticeBox = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')}
  margin-bottom: 15px;
`;
const Date = styled(Text)`
  font-size: 10px;
  color: ${Theme.fontColors.descriptionColor};
`;
const Notice = styled(Text)`
  font-size: 10px;
  color: ${Theme.fontColors.descriptionColor};
`;

const WarningBox = styled(View)`
  ${Mixin.flexSet('flex-end', 'center', 'row')}
  margin: 3px;
`;

const WarningText = styled(Text)`
  margin-left: 5px;
  color: ${Theme.colors.mainColor};
  font-size: 13px;
`;
