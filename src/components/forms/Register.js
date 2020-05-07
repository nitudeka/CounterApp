import React, {useState} from 'react';
import Form from './Form';
import Input from './Input';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      navigation={navigation}
      navText="Existing user?"
      navScreen="Signin"
      title="Register"
      authPath="app/user/signup"
      formData={{email, username, password}}
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
