import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Recommend({ navigation }) {
  const goToProductDetail = (e) => {
    navigation.navigate('productDetail');
  };
  return (
    <View style={styles.container}>
      <Text>recommend</Text>
      <Button
        title='제품상세로가기'
        onPress={() => navigation.navigate.setOptions({ title: 'aa' })}
      />
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
