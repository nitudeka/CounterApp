import {API_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

export default async (path, data) => {
  try {
    const res = await fetch(API_URL + path, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.status === 200) {
      await AsyncStorage.setItem('token', resData.token);
    }
  } catch (err) {
    console.log(err);
  }
};
