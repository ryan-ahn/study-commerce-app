import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ProductDetail from '../screens/ProductDetail';

export default Event = ({ navigation, route }) => {
  const goToProductDetail = (e) => {
    navigation.navigate('productDetail');
  };
  return (
    <View style={styles.container}>
      <Text>event</Text>
      <Button onPress={goToProductDetail} title='제품상세'></Button>
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
