import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {addExpense} from '../store/actions';
import Dropdown from '../components/dropdown';
import {
  colorPrimary,
  colorWhite,
  colorDanger,
  colorBlack,
} from '../util/styleVars';

const Button = ({iconName, btnTxt, bgClr, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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

const NewExpense = ({navigation}) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Unit');

  const add = () => {
    dispatch(
      addExpense({
        itemName,
        price: Number(price),
        quantity: Number(quantity),
        timestamp: Date.now(),
        unit: unit.toLowerCase(),
      }),
    );
  };

  const discard = () => {
    setItemName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          value={itemName}
          onChangeText={text => setItemName(text)}
          placeholder="Item name"
          style={styles.input}
        />
        <TextInput
          value={price}
          onChangeText={text => setPrice(text)}
          placeholder="Price"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          value={quantity}
          onChangeText={text => setQuantity(text)}
          placeholder="Quantity"
          keyboardType="numeric"
          style={styles.input}
        />
        <Dropdown selectedValue={unit} onChange={setUnit} />
        <View style={styles.actions}>
          <Button
            iconName="plus"
            btnTxt="Add"
            bgClr={colorPrimary.toString()}
            onPress={add}
          />
          <Button
            iconName="window-close"
            btnTxt="Cancel"
            bgClr={colorDanger.toString()}
            onPress={navigation.goBack}
          />
          <Button
            iconName="trash"
            btnTxt="Discard"
            bgClr={colorBlack.toString()}
            onPress={discard}
          />
        </View>
      </View>
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

export default NewExpense;
