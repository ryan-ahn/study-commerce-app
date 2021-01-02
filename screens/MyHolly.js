import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default MyHolly = ({ navigation }) => {
  const goToProductDetail = (e) => {
    navigation.navigate('login');
  };

  const logOut = async () => {
    const keys = ['ACCESS_TOKEN', 'USER_IMAGE', 'USER_NAME'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text>MyHolly</Text>
      <Button title='로그인/회원가입' onPress={goToProductDetail} />
      <Button title='로그아웃' onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
