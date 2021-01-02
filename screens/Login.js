import React from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

export default function Login({ navigation }) {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '894480752561-6jq1oi61i9f26mssi4ppjho8crcolla9.apps.googleusercontent.com',
      });

      if (result.type === 'success') {
        await AsyncStorage.setItem('ACCESS_TOKEN', result.accessToken);
        await AsyncStorage.setItem('USER_NAME', result.user.name);
        await AsyncStorage.setItem('USER_IMAGE', result.user.photoUrl);
        navigation.navigate('홈');
      } else {
        return { cancelled: true };
      }
    } catch (e) {}
  }

  const getUserData = async () => {
    try {
      const userName = await AsyncStorage.getItem('USER_NAME');
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (accessToken !== null) {
        console.log(userName, accessToken);
      }
    } catch (e) {}
  };

  const socialLogin = () => {
    signInWithGoogleAsync();
  };

  return (
    <Container>
      <Wrapper>
        <Button title='hihi' onPress={socialLogin} />
        <Button title='get' onPress={getUserData} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  margin: 30px 24px 0px;
`;
