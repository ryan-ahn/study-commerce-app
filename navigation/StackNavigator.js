import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigator';
import { Theme } from '../styles/Theme';

const Stack = createStackNavigator();

export default StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.mainColor,
        },
        headerTintColor: Theme.colors.tintColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name='main'
        component={BottomTabNavigation}
        options={{
          title: (
            <View style={styles.headerContainer}>
              <Image
                style={styles.logoIcon}
                source={require('../images/logo_text.png')}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    marginRight: 12,
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
