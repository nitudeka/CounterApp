import React, {useState, useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StatusBar, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import store from './src/store/store';
import {authenticated, signout} from './src/store/actions';
import {colorWhite} from './src/util/styleVars';
import Register from './src/components/forms/Register';
import Signin from './src/components/forms/Signin';
import SplashScreen from './src/components/SplashScreen';

const Stack = createStackNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const clicked = () => {
    dispatch(signout());
  };

  return (
    <View>
      <Text onPress={clicked}>Authenticated</Text>
    </View>
  );
};

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 10,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authenticated);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        dispatch(authenticated(true));
      }
      setLoading(false);
    });
  });

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colorWhite.toString()}
        translucent={false}
        barStyle="dark-content"
      />
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
        initialRouteName="Signin">
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Signin" component={Signin} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
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
