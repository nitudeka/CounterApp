import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colorBlack, colorPrimary, colorWhite} from '../../util/styleVars';

export default props => {
  const {placeHolder, type, onChangeText} = props;
  const [isTextSecure, setTextSecure] = useState(true);

  return (
    <View>
      <TextInput
        style={{...styles.input, paddingRight: type === 'password' ? 43 : 12}}
        onChangeText={onChangeText}
        textContentType={type}
        secureTextEntry={type === 'password' && isTextSecure}
        placeholder={placeHolder}
      />
      {type === 'password' && (
        <Icon
          style={styles.icon}
          onPress={() => setTextSecure(!isTextSecure)}
          name={isTextSecure ? 'eye-slash' : 'eye'}
          color={colorBlack.fade(0.3).toString()}
          size={25}
        />
      )}
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
  icon: {
    position: 'absolute',
    right: 10,
    top: 11,
  },
});
