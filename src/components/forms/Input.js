import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colorBlack, colorWhite} from '../../util/styleVars';

export default props => {
  const {placeHolder, type, onChangeText} = props;

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        textContentType={type}
        secureTextEntry={type === 'password'}
        placeholder={placeHolder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    fontSize: 16,
    borderColor: colorBlack.fade(0.8),
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: colorWhite.toString(),
  },
});
