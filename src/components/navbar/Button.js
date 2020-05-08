import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {signout, activeScreen} from '../../store/actions';
import {navigationRef} from './BottomNavbar';
import {colorPrimary, bottomNavHeight, colorWhite} from '../../util/styleVars';

const Button = ({label, iconName, screenName, signoutBtn}) => {
  const dispatch = useDispatch();
  const activeScreenName = useSelector(state => state.activeScreen);

  const handlePress = () => {
    if (signoutBtn) return dispatch(signout());
    navigationRef.current?.navigate(screenName);
    dispatch(activeScreen(screenName));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={{
        ...styles.container,
        backgroundColor:
          activeScreenName === screenName
            ? colorPrimary.darken(0.2).toString()
            : colorPrimary.toString(),
      }}>
      <Icon name={iconName} color="#fff" size={30} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: bottomNavHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    marginTop: -3,
    color: colorWhite.toString(),
    fontWeight: '700',
  },
});

export default Button;
