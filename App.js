import React, {useState, useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import store from './src/store/store';
import {authenticated} from './src/store/actions';
import {colorWhite} from './src/util/styleVars';
import Register from './src/components/forms/Register';
import Signin from './src/components/forms/Signin';
import SplashScreen from './src/screens/SplashScreen';
import DefaultScreen from './src/screens/DefaultScreen';
import BottomNavbar from './src/components/navbar/BottomNavbar';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
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
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="DefaultScreen"
              component={DefaultScreen}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Signin" component={Signin} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
      <BottomNavbar />
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
