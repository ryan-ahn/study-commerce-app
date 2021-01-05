import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import ProductReviewHeader from '../components/ProductReviewHeader';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const WriteReview = (props) => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [addImage, setAddImage] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    currentDate();
  }, []);

  const goBack = () => {
    props.navigation.goBack();
  };

  const currentDate = () => {
    setDate(new Date().toString());
  };

  const addReview = () => {
    if (!title) {
      Alert.alert('타이틀을 입력하세요');
    } else if (bodyText < 10) {
      Alert.alert('내용을 10글자 이상 입력하세요');
    } else {
      1;
      const reviewSet = {
        _title: title,
        _bodyText: bodyText,
        _addImage: addImage,
        _writer: '안상혁',
        _date: date,
      };
      props.dispatch({
        type: 'addReview',
        payload: reviewSet,
      });
      props.navigation.goBack();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const prevImage = [...addImage];
      prevImage.push(result.uri);
      setAddImage(prevImage);
    }
  };

  return (
    <>
      <ProductReviewHeader goBack={goBack} />
      <ViewContainer>
        <ProductNameBox>
          <ProductName>{props.state.name}</ProductName>
        </ProductNameBox>
        <Title>
          <StyledText>후기 쓰기</StyledText>
          <InputTitle
            onChangeText={(e) => setTitle(e)}
            placeholder='제목을 입력해주세요'
          />
        </Title>
        <Body>
          <InputBody
            onChangeText={(e) => setBodyText(e)}
            placeholder='자세한 후기는 다른 고객의 구매에 많은 도움이 되며, 일반식품의 효능이나 효과 등에 오해의 소지가 있는 내용을 작성 시 검토 후 비공개 조치될 수 있습니다. 반품/환불 문의는 1:1문의로 가능합니다.'
            multiline={true}
          />
          <CountCheck
            style={{ color: bodyText.length >= 10 ? '#666666' : 'red' }}>
            {bodyText.length}자 / 최소 10자
          </CountCheck>
        </Body>
        <Photo>
          <TitlePhoto>
            <StyledText>사진 등록</StyledText>
            <CountCheck
              style={{ color: addImage.length > 0 ? '#666666' : 'red' }}>
              {addImage.length}장 / 최대 8장
            </CountCheck>
          </TitlePhoto>
          <AddPhoto onPress={pickImage}>
            {addImage.map((image, index) => (
              <ImageBox key={index} source={{ uri: image }} />
            ))}
            <IconBox>
              <Fontisto name='plus-a' size={20} style={{ color: '#333' }} />
            </IconBox>
          </AddPhoto>
          <Notice>
            구매한 상품이 아니거나 캡쳐 사진을 첨부할 경우, 통보없이 삭제 및
            적립 혜택이 취소됩니다.
          </Notice>
        </Photo>
        <SubmitButton
          style={{
            backgroundColor:
              title !== 0 && bodyText.length >= 10 ? '#5f0180' : '#f1f1f1',
          }}
          onPress={addReview}>
          <ButtonText
            style={{
              color: title !== 0 && bodyText.length >= 10 ? 'white' : '#b1b1b1',
            }}>
            등록하기
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

export default connect(setRedux)(WriteReview);

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
  border: 0.5px solid ${Theme.colors.borderColor};
`;

const Body = styled(View)`
  margin-top: 20px;
`;

const InputBody = styled(TextInput)`
  height: 250px;
  padding: 10px;
  border: 0.5px solid ${Theme.colors.borderColor};
  font-size: 12px;
`;

const CountCheck = styled(Text)`
  margin: 5px 0px;
  font-size: 12px;
  text-align: right;
`;

const Photo = styled(View)`
  padding-top: 15px;
`;

const TitlePhoto = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')}
`;

const AddPhoto = styled(TouchableOpacity)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  width: 390px;
  height: 64px;
  margin: 5px 0px;
`;

const ImageBox = styled(Image)`
  width: 64px;
  height: 64px;
  margin-right: 5px;
  border-radius: 3px;
`;

const IconBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')}
  width: 64px;
  height: 100%;
  border: 0.5px solid ${Theme.colors.borderColor};
`;
const Notice = styled(Text)`
  padding-top: 20px;
  font-size: 12px;
`;

const SubmitButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')}
  width: 100%;
  height: 40px;
  margin-top: 60px;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  font-weight: 600;
`;
