import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signout} from '../store/actions';
import {colorPrimary, colorWhite, bottomNavHeight} from '../util/styleVars';

const Home = () => {
  const dispatch = useDispatch();
  const clicked = () => {
    dispatch(signout());
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.addIcon}>
        <Icon name="plus" color={colorWhite.toString()} size={30} />
      </View>
      <ScrollView />
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: bottomNavHeight + 20,
    backgroundColor: colorPrimary.toString(),
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    right: 20,
    elevation: 4,
  },
});

export default Home;
