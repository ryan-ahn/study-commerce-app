import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default BestProduct = ({ navigation }) => {
  const goToProductDetail = (e) => {
    navigation.navigate('productDetail');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>12333</Text>
      </View>
      <Text>best</Text>
      <Button title='제품상세로가기' onPress={goToProductDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 7,
  },
});
