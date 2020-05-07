import React, {useState} from 'react';
import authenticate from './authenticate';
import Form from './Form';
import Input from './Input';

const Signin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    await authenticate('app/user/signin', {username, password});
  };

  return (
    <Form
      navigation={navigation}
      navText="New user?"
      navScreen="Register"
      title="Sign In"
      submit={submit}
      btnTitle="Sign in">
      <Input
        onChangeText={setUsername}
        placeHolder="Username"
        type="username"
      />
      <Input
        onChangeText={setPassword}
        placeHolder="Password"
        type="password"
      />
    </Form>
  );
};

export default Signin;
