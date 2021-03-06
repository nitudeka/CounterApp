import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from '../components/calendar';
import {
  colorPrimary,
  colorWhite,
  colorBlack,
  bottomNavHeight,
} from '../util/styleVars';

const Card = ({itemName, price, quantity, unit = 'unit'}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContainer}>
        <Text style={styles.itemName}>{itemName}</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={[styles.small]}>₹ </Text>
          <Text style={styles.price}>{price} </Text>
          <Text style={styles.small}>x </Text>
          <Text style={styles.price}>{quantity} </Text>
          <Text style={[styles.small, {textTransform: 'capitalize'}]}>
            {unit}
          </Text>
        </View>
      </View>
      <View style={styles.total}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={[
              styles.small,
              {color: colorWhite.toString(), marginBottom: 3, marginRight: 4},
            ]}>
            ₹
          </Text>
          <Text style={styles.totalPrice}>{price * quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const expenses = useSelector(state => state.expenses);
  const totalSpent = useSelector(state => state.totalSpent);
  const fetchingExpenses = useSelector(state => state.fetchingExpenses);
  const add = () => {
    navigation.navigate('NewExpense');
  };

  return (
    <View style={{flex: 1}}>
      <Calendar />
      <View style={styles.totalContainer}>
        <Text style={styles.totalSpentText}>Total spent today:</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={[
              styles.small,
              {color: colorWhite.toString(), marginBottom: 3, marginRight: 4},
            ]}>
            ₹
          </Text>
          <Text style={styles.totalPrice}>{totalSpent}</Text>
        </View>
      </View>
      {fetchingExpenses && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colorPrimary.toString()} />
        </View>
      )}
      {!expenses.length && !fetchingExpenses && (
        <View style={styles.noData}>
          <Text
            style={{
              color: colorBlack.fade(0.3).toString(),
              fontSize: 40,
            }}>
            <Icon
              name="folder-open"
              color={colorBlack.fade(0.2).toString()}
              size={100}
            />
          </Text>
        </View>
      )}
      {!fetchingExpenses && Boolean(expenses.length) && (
        <ScrollView
          style={{
            flex: 1,
            marginBottom: bottomNavHeight,
          }}>
          {expenses.map((expense, i) => {
            const {item_name: itemName, price, quantity, unit} = expense;
            return (
              <Card
                key={i}
                itemName={itemName}
                price={price}
                quantity={quantity}
                unit={unit}
              />
            );
          })}
        </ScrollView>
      )}
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
    marginBottom: 15,
  },
  cardContainer: {
    padding: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 25,
    color: colorPrimary.darken(0.1).toString(),
    marginBottom: 5,
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
  small: {
    fontSize: 12,
    marginBottom: 1,
    color: colorBlack.fade(0.2).toString(),
  },
  price: {
    fontWeight: '700',
    fontSize: 15,
  },
  totalPrice: {
    color: colorWhite.toString(),
    fontSize: 20,
    fontWeight: '700',
  },
  loader: {
    flex: 1,
    marginBottom: bottomNavHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    marginBottom: bottomNavHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalSpentText: {
    textTransform: 'uppercase',
    color: colorWhite.toString(),
  },
  totalContainer: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: colorPrimary.darken(0.3).toString(),
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Home;
