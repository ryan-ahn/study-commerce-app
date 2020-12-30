import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Shoppoig({ navigation, route }) {
  const goToProductDetail = (e) => {
    navigation.navigate('ProductDetail');
  };
  return (
    <View style={styles.container}>
      <Text>best</Text>
      <Button onPress={goToProductDetail} title='제품상세'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
