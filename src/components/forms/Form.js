import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {colorBlack, colorWhite, colorPrimary} from '../../util/styleVars';

const Register = props => {
  const {
    title,
    btnTitle,
    children,
    navigation,
    navText,
    navScreen,
    submit,
  } = props;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.form}>
          <Text style={styles.heading}>{title}</Text>
          <View>{children}</View>
          <Button title={btnTitle} onPress={submit} color="black" />
          <Text
            style={styles.navText}
            onPress={() => navigation.navigate(navScreen)}>
            {navText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: colorWhite.toString(),
    flex: 0.8,
    padding: 15,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  heading: {
    fontWeight: '100',
    fontSize: 30,
    textAlign: 'center',
    color: colorWhite.lighten(0.5).toString(),
    backgroundColor: colorBlack.toString(),
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },
  navText: {
    marginTop: 5,
    color: colorPrimary.toString(),
    fontWeight: '700',
  },
});

export default Register;
