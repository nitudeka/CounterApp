import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {authenticate} from '../../store/actions';
import {
  colorDanger,
  colorBlack,
  colorWhite,
  colorIndigo,
  colorPrimary,
} from '../../util/styleVars';

const Register = props => {
  const {title, btnTitle, children, formData, authPath} = props;
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(state => state.isAuthenticating);
  const authErrors = useSelector(state => state.authErrors);

  const submit = async () => {
    dispatch(authenticate(authPath, formData));
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.form}>
          <Text style={styles.heading}>{title}</Text>
          <View>{children}</View>
          {Boolean(authErrors.length) && (
            <>
              {authErrors.map((msg, i) => {
                return (
                  <Text key={i} style={styles.error}>
                    {msg}
                  </Text>
                );
              })}
            </>
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={!isAuthenticating ? submit : () => {}}>
            <Text style={styles.btnTitle}>{btnTitle}</Text>
            {isAuthenticating && (
              <ActivityIndicator size="small" color={colorWhite.toString()} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: colorWhite.toString(),
    flex: 0.8,
    padding: 15,
    borderRadius: 4,
    elevation: 3,
  },
  heading: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    color: colorPrimary.toString(),
    marginBottom: 20,
    borderColor: colorPrimary.toString(),
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colorIndigo.toString(),
    borderRadius: 3,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colorWhite.toString(),
    fontWeight: '700',
    fontSize: 20,
    marginRight: 5,
  },
  error: {
    color: colorDanger.lighten(0.3).toString(),
    marginBottom: 5,
  },
});

export default Register;
