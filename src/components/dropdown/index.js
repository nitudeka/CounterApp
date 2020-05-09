import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {colorBlack, colorWhite} from '../../util/styleVars';

const Dropdown = ({selectedValue, onChange}) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedValue} onValueChange={onChange}>
        <Picker.Item label="Unit" value="unit" />
        <Picker.Item label="Packet" value="packet" />
        <Picker.Item label="Bottle" value="bottle" />
        <Picker.Item label="KG" value="kg" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite.toString(),
    marginBottom: 15,
    borderColor: colorBlack.fade(0.8),
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default Dropdown;
