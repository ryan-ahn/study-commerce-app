import React from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { Theme } from '../styles/Theme';

export default function HomeNewProduct({ navigation }) {
  const goToProductDetail = (e) => {
    navigation.navigate('productDetail');
  };
  return (
    <View style={styles.container}>
      <ScrollView endFillColor={Theme.colors.white}>
        <Text>zz</Text>
        <Text>best</Text>
        <Button title='제품상세로가기' onPress={goToProductDetail} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 7,
  },
});
