import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Button from './Button';

const BottomNavbar = () => {
  return (
    <View style={styles.container}>
      <Button iconName="home" label="Home" screenName="HomeScreen" />
      <Button iconName="sign-out" label="Logout" screenName="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#007bff',
    color: '#fff',
  },
});

export default BottomNavbar;
