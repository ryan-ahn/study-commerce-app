import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as MailComposer from 'expo-mail-composer';
import ProductInquireHeader from '../components/ProductInquireHeader';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const WriteInquire = (props) => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleEmail = () => {
    MailComposer.composeAsync({
      recipients: ['kaaiinn4@gmail.com'],
      subject: title,
      body: bodyText,
    });
  };

  return (
    <>
      <ProductInquireHeader goBack={goBack} />
      <ViewContainer>
        <ProductNameBox>
          <ProductName>{props.state.name}</ProductName>
        </ProductNameBox>
        <Title>
          <StyledText>문의 내용</StyledText>
          <InputTitle
            onChangeText={(e) => setTitle(e)}
            placeholder='제목을 입력해주세요'
          />
        </Title>
        <Body>
          <InputBody
            onChangeText={(e) => setBodyText(e)}
            placeholder='내용을 입력하세요'
            multiline={true}
          />
        </Body>
        <SubmitButton
          onPress={handleEmail}
          style={{
            backgroundColor:
              title.length !== 0 && bodyText.length !== 0
                ? '#5f0180'
                : '#f1f1f1',
          }}>
          <ButtonText
            style={{
              color:
                title.length !== 0 && bodyText.length !== 0
                  ? 'white'
                  : '#b1b1b1',
            }}>
            문의하기
          </ButtonText>
        </SubmitButton>
      </ViewContainer>
    </>
  );
};

function setRedux(state) {
  return {
    state: state,
  };
}

export default connect(setRedux)(WriteInquire);

const ViewContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding: 17px;
  background-color: ${Theme.colors.white};
`;

const ProductNameBox = styled(View)`
  padding: 10px;
  background-color: ${Theme.colors.containerColor};
`;
const ProductName = styled(Text)`
  color: ${Theme.colors.grayColor};
  font-size: 13px;
  font-weight: 500;
`;

const Title = styled(View)`
  margin-top: 20px;
`;

const StyledText = styled(Text)`
  margin: 5px 0px;
  font-size: 14px;
  font-weight: 500;
`;

const InputTitle = styled(TextInput)`
  height: 35px;
  padding: 10px;
  font-size: 12px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Theme.colors.borderColor};
`;

const Body = styled(View)`
  margin-top: 20px;
`;

const InputBody = styled(TextInput)`
  height: 450px;
  padding: 10px;
  border: 0.5px solid ${Theme.colors.borderColor};
  font-size: 12px;
`;

const SubmitButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')}
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  font-weight: 600;
`;
