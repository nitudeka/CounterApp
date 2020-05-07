import React, {useState} from 'react';
import Form from './Form';
import Input from './Input';

const Signin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      navigation={navigation}
      title="Sign In"
      authPath="app/user/signin"
      formData={{username, password}}
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
