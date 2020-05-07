import React, {useState, useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StatusBar, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import store from './src/store/store';
import {authenticated} from './src/store/actions';
import {colorWhite} from './src/util/styleVars';
import Register from './src/components/forms/Register';
import Signin from './src/components/forms/Signin';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <View>
      <Text>Authenticated</Text>
    </View>
  );
};

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authenticated);

  useEffect(() => {
    AsyncStorage.getItem('token').then(() => {
      dispatch(authenticated(true));
      setLoading(false);
    });
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colorWhite.toString()}
        translucent={false}
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="Signin">
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
