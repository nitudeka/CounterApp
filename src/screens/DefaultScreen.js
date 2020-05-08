import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetAuth} from '../store/actions';
import {colorPrimary, colorWhite, colorBlack} from '../util/styleVars';

const DefaultScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.default}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            dispatch(resetAuth());
            navigation.navigate('Register');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            dispatch(resetAuth());
            navigation.navigate('Signin');
          }}
          style={{
            ...styles.btn,
            backgroundColor: colorBlack.fade(0.2),
          }}>
          <Text style={styles.btnText}>Signin</Text>
        </TouchableOpacity>
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
    backgroundColor: colorPrimary.toString(),
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
