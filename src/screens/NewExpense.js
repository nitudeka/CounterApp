import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
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
  const addingExpense = useSelector(state => state.addingExpense);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Unit');

  const add = () => {
    const timestamp = moment(
      moment(moment().valueOf()).format('DD-MM-YYYY'),
      'DD-MM-YYYY',
    ).valueOf();
    dispatch(
      addExpense({
        itemName,
        timestamp,
        price: Number(price),
        quantity: Number(quantity),
        unit: unit.toLowerCase(),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {addingExpense && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={colorPrimary.toString()}
          />
        )}
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
            iconName="trash"
            btnTxt="Discard"
            bgClr={colorDanger.toString()}
            onPress={navigation.goBack}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loader: {
    margin: 15,
    backgroundColor: colorWhite.fade(0.2).toString(),
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
  },
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
