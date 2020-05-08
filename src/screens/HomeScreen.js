import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signout} from '../store/actions';
import {colorPrimary, bottomNavHeight} from '../util/styleVars';

const Home = () => {
  const dispatch = useDispatch();
  const clicked = () => {
    dispatch(signout());
  };

  return (
    <View style={{flex: 1}}>
      {/* <Text onPress={clicked}>Authenticated</Text> */}
      <View style={styles.addIcon}>
        <Icon name="plus-circle" color={colorPrimary.toString()} size={70} />
      </View>
      <ScrollView />
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    alignItems: 'center',
    position: 'absolute',
    bottom: bottomNavHeight + 20,
    right: 20,
  },
});

export default Home;
