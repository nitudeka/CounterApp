import React, {useState, useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import store from './src/store/store';
import {authenticated, getExpenses} from './src/store/actions';
import {colorWhite} from './src/util/styleVars';
import SplashScreen from './src/screens/SplashScreen';
import BottomNavbar, {
  navigationRef,
} from './src/components/navbar/BottomNavbar';
import MainRoute from './src/routes/routes';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authenticated);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        dispatch(authenticated(true));
        dispatch(getExpenses());
      }
      setLoading(false);
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
