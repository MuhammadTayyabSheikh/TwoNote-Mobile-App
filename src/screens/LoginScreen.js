import React, { useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/forms';
import { login } from "../redux/actions/userActions"
import colors from '../config/colors';
import ActivityIndicator from '../components/ActivityIndicator';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../components/MainScreen';
import AppText from '../components/AppText';
import routes from '../navigation/routes';
// import AuthApi from '../api/auth';
// import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password")
});

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // console.log(typeof userInfo._W);
    if (userInfo) navigation.navigate(routes.NOTES);
  }, [userInfo, navigation]);

  const handleSubmit = async ({ email, password }) => {
    Keyboard.dismiss();
    dispatch(login(email, password));
  }

  return (
    <>
      <ActivityIndicator visible={loading} animation={require("../assets/animations/person1.json")} />
      <Screen style={styles.screen}>
        <MainScreen heading="Login">
          <ErrorMessage error={error} visible={error} />
          <AppForm
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              KeyboardType="email-address"
              icon='email'
              name='email'
              placeholder='Email'
            />
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              icon='lock'
              name='password'
              placeholder='Password'
              secureTextEntry
            />
            <SubmitButton title="Login" />
          </AppForm>
        </MainScreen>
        <AppText style={{ color: colors.medium, marginTop: 10 }}>Don't have an account? <AppText onPress={navigation.navigate(routes.REGISTER)} style={{ color: colors.primary }}>Register here</AppText></AppText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 40
  },
})

export default LoginScreen;