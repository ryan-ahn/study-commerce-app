import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default Event = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://ifh.cc/g/DWQjqS.jpg' }}
        style={{ width: 390, height: '100%' }}
      />
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
