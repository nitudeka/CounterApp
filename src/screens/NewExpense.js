import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  colorPrimary,
  colorWhite,
  colorDanger,
  colorBlack,
} from '../util/styleVars';

const Button = ({iconName, btnTxt, bgClr}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.btn, {backgroundColor: bgClr}]}>
      <Icon
        name={iconName}
        color={colorWhite.toString()}
        style={{marginRight: 10}}
        size={20}
      />
      <Text style={styles.btnText}>{btnTxt}</Text>
    </TouchableOpacity>
  );
};

const Card = ({children}) => {
  return (
    <View style={styles.card}>
      <TextInput placeholder="Item name" style={styles.input} />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        keyboardType="numeric"
        style={styles.input}
      />
      {children}
    </View>
  );
};

const SplashScree = ({}) => {
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.actions}>
          <Button
            iconName="plus"
            btnTxt="Add"
            bgClr={colorPrimary.toString()}
          />
          <Button
            iconName="window-close"
            btnTxt="Cancel"
            bgClr={colorDanger.toString()}
          />
          <Button
            iconName="trash"
            btnTxt="Discard"
            bgClr={colorBlack.toString()}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  btn: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  btnText: {
    fontWeight: '700',
    color: colorWhite.toString(),
    fontSize: 15,
  },
  actions: {},
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: colorWhite.toString(),
  },
  input: {
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: colorBlack.fade(0.8),
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: colorWhite.toString(),
  },
});

export default SplashScree;
