import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ProductDetail() {
  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/8bada8b057954b4c9b8b127c17328fd7/raw/c4b9e38e71615169ba70c07687172f73221d0ae8/slideUrl.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setSlideData(result);
      });
  };
  return (
    <View style={styles.container}>
      <Text>ProductDetail</Text>
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
