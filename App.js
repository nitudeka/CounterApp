import React, {useState, useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import store from './src/store/store';
import {authenticated, getExpenses, navigationRef} from './src/store/actions';
import {colorWhite} from './src/util/styleVars';
import SplashScreen from './src/screens/SplashScreen';
import BottomNavbar from './src/components/navbar/BottomNavbar';
import MainRoute from './src/routes/routes';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authenticated);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        const timestamp = moment(
          moment(moment().valueOf()).format('DD-MM-YYYY'),
          'DD-MM-YYYY',
        ).valueOf();
        dispatch(authenticated(true));
        dispatch(getExpenses(timestamp, setLoading));
      } else {
        setLoading(false);
      }
    });
  });

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor={colorWhite.toString()}
        translucent={false}
        barStyle="dark-content"
      />
      <MainRoute />
      {isAuthenticated && <BottomNavbar />}
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
