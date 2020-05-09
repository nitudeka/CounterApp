import React from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import {colorWhite} from '../util/styleVars';

const SplashScree = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colorWhite.toString()}
        translucent={false}
        barStyle="dark-content"
      />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default SplashScree;
