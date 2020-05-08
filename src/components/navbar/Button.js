import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {colorPrimary, bottomNavHeight, colorWhite} from '../../util/styleVars';

const Button = ({label, iconName, screenName}) => {
  const activeScreen = useSelector(state => state.activeScreen);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.container,
        backgroundColor:
          activeScreen === screenName
            ? colorPrimary.darken(0.2).toString()
            : colorPrimary.toString(),
      }}>
      <Icon name={iconName} color="#fff" size={30} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

// activeScreen
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
