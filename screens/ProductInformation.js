import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const ProductInformation = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    image,
    name,
    description,
    discountPrice,
    price,
    discount,
    typeOfDelivery,
  } = props.state;

  return (
    <ViewContainer>
      <StyledScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <MainImageBox>
          <MainImage source={{ uri: image }} />
        </MainImageBox>
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
          <FlexStartRowBox>
            <Modal
              animationType='fade'
              transparent={true}
              visible={modalVisible}>
              <CenteredView>
                <ModalView
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <ModalHeader>컬리 판매가 기준 할인</ModalHeader>
                  <ModalBody>
                    동일 품질 상품의 주요 온/오프라인 유통사 가격과 비교하여
                    컬러가 설정한 가격에서 할인된 가격입니다.
                  </ModalBody>
                  <ModalBody>
                    적용된 할인가는 대표 상품의 가격으로 옵션에 따라 할인 혜택이
                    다를 수 있습니다. 할인 혜택은 당사 사정에 따라 변경될 수
                    있습니다.
                  </ModalBody>
                </ModalView>
              </CenteredView>
            </Modal>
            <Price>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Price>
            <Question>
              <SimpleLineIcons
                name='question'
                size={11}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </Question>
          </FlexStartRowBox>
          <FlexStartRowBox>
            <SavePercentBox>
              <SavePercent>일반 0.5%</SavePercent>
            </SavePercentBox>
            <SavePoint>
              {'개당 ' + parseInt(discountPrice * 0.005) + '원 적립'}
            </SavePoint>
          </FlexStartRowBox>
        </ProductInfomation>
        <DetailedInformation>
          <FlexStartTableBox>
            <TextHeaderTable>판매단위</TextHeaderTable>
            <TextBodyTable>PK</TextBodyTable>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>중량/용량</TextHeaderTable>
            <TextBodyTable>옵션별 상이</TextBodyTable>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>배송구분</TextHeaderTable>
            <TextBodyTable>{typeOfDelivery}</TextBodyTable>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>포장타입</TextHeaderTable>
            <View>
              <TextBodyTable>냉동/종이포장</TextBodyTable>
              <TextBodyDescriptTable>
                택배 배송은 에코포장이 스티로폼으로 대체됩니다.
              </TextBodyDescriptTable>
            </View>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>알레르기정보</TextHeaderTable>
            <View>
              <TextBodyTable>
                - 과일류: 우유, 호두, 잣, 토마토 함유
              </TextBodyTable>
              <TextBodyTable>
                - 채소류: 우유, 호두, 잣, 토마토 함유
              </TextBodyTable>
            </View>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>유통기한</TextHeaderTable>
            <TextBodyTable>
              수령일 포함 최소 3일 남은 제품을 보내 드립니다.
            </TextBodyTable>
          </FlexStartTableBox>
          <FlexStartTableBox>
            <TextHeaderTable>안내사항</TextHeaderTable>
            <TextBodyTable>
              1월 7일 주문건부터 용기가 PET에서 투명비닐 형태의 패키지로
              변경됩니다.
            </TextBodyTable>
          </FlexStartTableBox>
        </DetailedInformation>
        <DeliveryInfomation>
          <FirstImage source={{ uri: 'https://ifh.cc/g/tMafHS.png' }} />
          <SecondImage source={{ uri: 'https://ifh.cc/g/uJo55z.jpg' }} />
          <ThirdImage source={{ uri: 'https://ifh.cc/g/eG3LI2.jpg' }} />
        </DeliveryInfomation>
      </StyledScrollView>
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
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
`;

const StyledScrollView = styled(ScrollView)`
  background-color: ${Theme.colors.bodyColor};
`;

const MainImageBox = styled(View)`
  width: 390px;
  height: 450px;
`;
const MainImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ProductInfomation = styled(View)`
  height: 185px;
  padding: 16px;
  background-color: ${Theme.colors.white};
`;

const FlexRowBox = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
`;

const FlexStartRowBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
`;

const FlexStartTableBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'flex-start', 'row')};
  margin-top: 10px;
`;

const ProductTextBox = styled(View)`
  ${Mixin.flexSet('center', 'flex-start', 'column')};
  height: 60px;
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

const Price = styled(Text)`
  color: ${Theme.fontColors.discountColor};
  text-decoration: line-through;
  text-decoration-color: ${Theme.fontColors.discountColor};
  font-size: 12px;
`;

const Question = styled(Text)`
  color: ${Theme.fontColors.discountColor};
  font-size: 12px;
  margin-left: 3px;
  margin-top: 2px;
`;

const SavePercentBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 60px;
  height: 16px;
  margin-top: 10px;
  border: 1px solid ${Theme.colors.discountColor};
  border-radius: 10px;
`;
const SavePercent = styled(Text)`
  color: ${Theme.colors.mainColor};
  font-size: 10px;
`;

const SavePoint = styled(Text)`
  width: 160px;
  height: 16px;
  margin-top: 12px;
  margin-left: 5px;
  color: ${Theme.fontColors.headerColor};
  font-size: 11px;
`;

const CenteredView = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 100%;
  height: 800px;
`;
const ModalView = styled(TouchableOpacity)`
  margin: 5px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #999999;
`;

const ModalHeader = styled(Text)`
  color: ${Theme.fontColors.mainColor};
  font-size: 11px;
`;

const ModalBody = styled(Text)`
  color: ${Theme.fontColors.descriptionColor};
  font-size: 10px;
`;

const DetailedInformation = styled(View)`
  padding: 16px;
  margin: 0.3px;
  width: 100%;
  height: 250px;
  background-color: white;
`;

const TextHeaderTable = styled(Text)`
  width: 75px;
  font-size: 12px;
  color: ${Theme.fontColors.descriptionColor};
`;

const TextBodyTable = styled(Text)`
  width: 280px;
  font-size: 12px;
  color: ${Theme.fontColors.headerColor};
`;

const TextBodyDescriptTable = styled(Text)`
  font-size: 10px;
  color: ${Theme.fontColors.descriptionColor};
`;

const DeliveryInfomation = styled(View)`
  width: 390px;
  height: 100%;
  margin-top: 5px;
`;

const FirstImage = styled(Image)`
  width: 390px;
  height: 260px;
`;

const SecondImage = styled(Image)`
  width: 390px;
  height: 775px;
`;

const ThirdImage = styled(Image)`
  width: 390px;
  height: 510px;
`;

const BuyButton = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 370px;
  height: 50px;
  top: -60px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 7px;
`;

const BuyButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
