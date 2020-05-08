import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetAuth} from '../store/actions';
import {colorPrimary, colorWhite, colorBlack} from '../util/styleVars';

const Button = ({navigation, screenName, btnText, backgroundColor}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        dispatch(resetAuth());
        navigation.navigate(screenName);
      }}
      style={[styles.btn, {backgroundColor: backgroundColor}]}>
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const DefaultScreen = ({navigation}) => {
  return (
    <View style={styles.default}>
      <View style={styles.container}>
        <Button
          backgroundColor={colorPrimary.toString()}
          navigation={navigation}
          screenName="Register"
          btnText="Register"
        />
        <Button
          backgroundColor={colorBlack.toString()}
          navigation={navigation}
          screenName="Signin"
          btnText="Signin"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: colorWhite.toString(),
  },
  container: {
    height: 100,
    flex: 0.9,
  },
  btn: {
    flex: 0.9,
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '500',
    color: colorWhite.toString(),
    fontSize: 20,
    padding: 10,
  },
});

export default DefaultScreen;
