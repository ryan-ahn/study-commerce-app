import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';

export default function Header() {
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <View style={styles.headerContainer}>
        <Image
          style={styles.logoIcon}
          source={require('../images/logo_text.png')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#5f0180',
  },
  headerContainer: {
    alignItems: 'center',
    height: 44,
    backgroundColor: '#5f0180',
  },
  logoIcon: {
    height: 36,
    width: 50,
  },
});
