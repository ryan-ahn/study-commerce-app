import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

export default function Footer() {
  return (
    <ViewContainer>
      <TabContainer>
        <TabText>컬리소개</TabText>
        <TabText>이용약관</TabText>
        <TabText>개인정보처리방침</TabText>
      </TabContainer>
      <BodyContainer>
        <BodyText>주식회사 홀리 | 대표이사 : 안상혁</BodyText>
        <BodyText>개인정보보호책임자 : 안상혁</BodyText>
        <BodyText>
          사업자등록번호 : 261-80-67771 <Link>사업자정보 확인</Link>
        </BodyText>
        <BodyText>통신판매업 : 제 2020-서울강남-13899 호</BodyText>
        <BodyText>
          주소 : 서울특별시 관악구 봉천동 어디쯤엔가 우리집이 있어, 5층
        </BodyText>
      </BodyContainer>
      <BodyContainer>
        <BodyText>
          입점문의 : <Link>입점문의하기</Link>
        </BodyText>
        <BodyText>
          제휴문의 : <Link>Xednicoder@github.com</Link>
        </BodyText>
        <BodyText>
          팩스 : 070-9779-6777 | 이메일 : <Link>help@xedni.com</Link>
        </BodyText>
      </BodyContainer>
      <BodyContainer>
        <BodyText>
          카카오톡 <Link>@마켓홀리 </Link>친구 추가하고 소식과 혜택을
          받아보세요.
        </BodyText>
      </BodyContainer>
      <IconBox>
        <Icon
          source={{
            uri:
              'https://res.kurly.com/mobile/service/common/1903/ico_instagram.png',
          }}
        />
        <Icon
          source={{
            uri: 'https://res.kurly.com/mobile/service/common/1903/ico_fb.png',
          }}
        />
        <Icon
          source={{
            uri:
              'https://res.kurly.com/mobile/service/common/1903/ico_blog.png',
          }}
        />
        <Icon
          source={{
            uri:
              'https://res.kurly.com/mobile/service/common/1903/ico_naverpost.png?v=1',
          }}
        />
        <Icon
          source={{
            uri:
              'https://res.kurly.com/mobile/service/common/1903/ico_youtube.png',
          }}
        />
      </IconBox>
    </ViewContainer>
  );
}

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'flex-start', 'column')}
  height: 290px;
  padding: 10px;
  background-color: ${Theme.colors.containerColor};
`;

const TabContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  height: 50px;
`;

const TabText = styled(Text)`
  margin-right: 10px;
  color: ${Theme.fontColors.mainColor};
  font-size: 11px;
  font-weight: 500;
`;

const BodyText = styled(Text)`
  font-size: 11.5px;
  color: ${Theme.fontColors.descriptionColor};
`;

const BodyContainer = styled(View)`
  margin-bottom: 20px;
`;

const IconBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')}
  margin-bottom: 20px;
`;

const Icon = styled(Image)`
  margin-right: 10px;
  width: 22px;
  height: 22px;
`;

const Link = styled(Text)`
  color: ${Theme.colors.mainColor};
`;
