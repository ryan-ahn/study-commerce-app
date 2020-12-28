import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Recommend() {
  return (
    <View style={styles.container}>
      <Text>recommend</Text>
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
