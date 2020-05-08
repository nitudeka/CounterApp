import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import DefaultScreen from '../screens/DefaultScreen';
import HomeScreen from '../screens/HomeScreen';
import Register from '../components/forms/Register';
import Signin from '../components/forms/Signin';

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

const AuthScreens = () => (
  <>
    <Stack.Screen
      options={{headerShown: false}}
      name="DefaultScreen"
      component={DefaultScreen}
    />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Signin" component={Signin} />
  </>
);

const ProtectedScreens = () => (
  <>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </>
);

const MainRoute = () => {
  const isAuthenticated = useSelector(state => state.authenticated);

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      {isAuthenticated ? <ProtectedScreens /> : <AuthScreens />}
    </Stack.Navigator>
  );
};

export default MainRoute;
