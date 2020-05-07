import React, {useState} from 'react';
import authenticate from './authenticate';
import Form from './Form';
import Input from './Input';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    await authenticate('app/user/signup', {email, username, password});
  };

  return (
    <Form
      navigation={navigation}
      navText="Existing user?"
      navScreen="Signin"
      title="Register"
      submit={submit}
      btnTitle="Sign up">
      <Input onChangeText={setEmail} placeHolder="Email" type="emailAddress" />
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

export default Register;
