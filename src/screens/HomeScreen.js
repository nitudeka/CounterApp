import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  colorPrimary,
  colorWhite,
  colorBlack,
  bottomNavHeight,
} from '../util/styleVars';

const Card = ({itemName, price, quantity}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContainer}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.price}>
          ₹ {price} x {quantity} Bottle
        </Text>
      </View>
      <View style={styles.total}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 10,
              color: colorWhite.toString(),
              marginBottom: 3,
            }}>
            ₹{' '}
          </Text>
          <Text style={styles.totalPrice}>{price * quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const expenses = useSelector(state => state.expenses);
  const add = () => {
    navigation.navigate('NewExpense');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {expenses.map((expense, i) => {
          const {item_name: itemName, price, quantity} = expense;
          return (
            <Card
              key={i}
              itemName={itemName}
              price={price}
              quantity={quantity}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={add}
        style={styles.addIcon}>
        <Icon name="plus" color={colorWhite.toString()} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: bottomNavHeight + 20,
    backgroundColor: colorPrimary.toString(),
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    right: 20,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: colorWhite.toString(),
    marginHorizontal: 10,
    marginTop: 15,
  },
  cardContainer: {
    padding: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 25,
    color: colorPrimary.darken(0.1).toString(),
  },
  price: {
    fontWeight: '700',
    marginTop: 5,
    color: colorBlack.fade(0.3).toString(),
  },
  total: {
    backgroundColor: colorPrimary.darken(0.2).toString(),
    flexDirection: 'row',
    padding: 15,
    minWidth: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  totalPrice: {
    color: colorWhite.toString(),
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Home;
