import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

const MENULIST = [
  '배송 안내',
  '공지사항',
  '자주하는 질문',
  '고객센터',
  '이용안내',
  '컬리소개',
];

const USERMENULIST = ['개인정보 수정', '쿠폰 확인'];

export default function MyHolly({ navigation }) {
  const [loginToggle, setLoginToggle] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '894480752561-6jq1oi61i9f26mssi4ppjho8crcolla9.apps.googleusercontent.com',
      });

      if (result.type === 'success') {
        await AsyncStorage.setItem('ACCESS_TOKEN', result.accessToken);
        await AsyncStorage.setItem('USER_NAME', result.user.name);
        await AsyncStorage.setItem('USER_IMAGE', result.user.photoUrl);
        await getUserData();
        setLoginToggle(true);

        navigation.navigate('홈');
      } else {
        return { cancelled: true };
      }
    } catch (e) {}
  };

  const logOut = async () => {
    const keys = ['ACCESS_TOKEN', 'USER_IMAGE', 'USER_NAME'];
    try {
      await AsyncStorage.multiRemove(keys);
      setLoginToggle(false);
      setUserName('');
      setUserImage('');
    } catch (e) {}
  };

  const getUserData = async () => {
    try {
      const userName = await AsyncStorage.getItem('USER_NAME');
      const userImage = await AsyncStorage.getItem('USER_IMAGE');
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (accessToken !== null) {
        setUserName(userName);
        setUserImage(userImage);
      }
    } catch (e) {}
  };

  return (
    <ViewContainer>
      <ScrollView>
        {loginToggle ? (
          <LoginView>
            <UserInfoBox>
              <UserImage source={{ uri: userImage }} />
              <UserName>{userName}님</UserName>
              <Userpoint>적립금 : 0원</Userpoint>
            </UserInfoBox>
            <GradeBox>
              <GradeButton>
                <GradeButtonText>전체등급 보기</GradeButtonText>
              </GradeButton>
              <GradeButton>
                <GradeButtonText>다음 달 예상등급 보기</GradeButtonText>
              </GradeButton>
            </GradeBox>
          </LoginView>
        ) : (
          <LogoutView>
            <Notice>회원 가입하고</Notice>
            <Notice>다양한 혜택을 받아가세요!</Notice>
            <NoticeLink>다양한 혜택을 받아가세요!</NoticeLink>
            <LoginButton>
              <ButtonText onPress={signInWithGoogleAsync}>
                구글 로그인
              </ButtonText>
            </LoginButton>
          </LogoutView>
        )}
        {loginToggle ? null : (
          <SearchView>
            <MenuList>
              <MenuText>비회원 주문조회</MenuText>
              <AntDesign name='right' size={13} style={{ marginRight: 10 }} />
            </MenuList>
          </SearchView>
        )}

        <NoticeView>
          {MENULIST.map((MENU, index) => (
            <NoticeMenuList key={index}>
              <MenuText>{MENU}</MenuText>
              <AntDesign name='right' size={13} style={{ marginRight: 10 }} />
            </NoticeMenuList>
          ))}
        </NoticeView>
        <AlertView>
          <MenuList>
            <MenuText>알림 설정</MenuText>
            <AntDesign name='right' size={13} style={{ marginRight: 10 }} />
          </MenuList>
        </AlertView>

        {loginToggle ? (
          <>
            <NoticeView>
              {USERMENULIST.map((MENU, index) => (
                <NoticeMenuList key={index}>
                  <MenuText>{MENU}</MenuText>
                  <AntDesign
                    name='right'
                    size={13}
                    style={{ marginRight: 10 }}
                  />
                </NoticeMenuList>
              ))}
            </NoticeView>
            <LogoutButtonBox onPress={logOut}>
              <LoginButtonText>로그아웃</LoginButtonText>
            </LogoutButtonBox>
          </>
        ) : null}
      </ScrollView>
    </ViewContainer>
  );
}

const ViewContainer = styled(View)`
  flex: 1;
`;

const LogoutView = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  height: 290px;
  padding: 15px;
  padding-top: 35px;
  background-color: white;
`;

const Notice = styled(Text)`
  margin-top: 6px;
  color: ${Theme.fontColors.headerColor};
  font-size: 17px;
  font-weight: 500;
`;

const NoticeLink = styled(Text)`
  margin-top: 10px;
  font-size: 11px;
  color: ${Theme.fontColors.descriptionColor};
`;

const LoginButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'column')};
  margin-top: 35px;
  width: 100%;
  height: 45px;
  color: white;
  background-color: ${Theme.colors.mainColor};
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 600;
  font-size: 15px;
`;

const SearchView = styled(View)`
  width: 100%;
  margin-top: 15px;
`;

const MenuList = styled(TouchableOpacity)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  padding-left: 15px;
  width: 100%;
  height: 40px;
  background-color: white;
`;

const MenuText = styled(Text)`
  font-weight: 400;
`;

const NoticeView = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'column')};
  width: 100%;
  margin-top: 15px;
`;

const NoticeMenuList = styled(TouchableOpacity)`
  ${Mixin.flexSet('space-between', 'center', 'row')};
  padding-left: 15px;
  width: 100%;
  height: 40px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #f1f1f1;
`;

const AlertView = styled(View)`
  ${Mixin.flexSet('space-between', 'center', 'column')};
  width: 100%;
  margin-top: 15px;
`;

const LoginView = styled(View)`
  width: 100%;
  height: 160px;
  padding: 15px;
  background-color: white;
`;

const UserInfoBox = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
  margin-top: 25px;
`;
const UserImage = styled(Image)`
  width: 40px;
  height: 40px;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
`;

const UserName = styled(Text)`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 700;
`;

const Userpoint = styled(Text)`
  color: gray;
  margin-left: 170px;
`;

const GradeBox = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 30px;
  margin-top: 25px;
`;

const GradeButton = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 170px;
  height: 30px;
  margin: 5px;
  background-color: #f1f1f1;
  border-radius: 10px;
`;

const GradeButtonText = styled(Text)`
  font-size: 13px;
`;

const LogoutButtonBox = styled(TouchableOpacity)`
  ${Mixin.flexSet('center', 'center', 'column')};
  height: 40px;
  margin: 15px;
  background-color: ${Theme.colors.mainColor};
  border-radius: 5px;
`;

const LoginButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
