import React, { useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, AppFormImagePicker, ErrorMessage, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';
import MainScreen from '../components/MainScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions';
import FlashMessage, { showMessage } from "react-native-flash-message";
import routes from '../navigation/routes';


const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  image: Yup.array()
});

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const handleSubmit = async (values) => {
    Keyboard.dismiss();
    const { name, email, password } = values;
    dispatch(register(name, email, password, values.image[0]));
    if (error)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });
  };

  useEffect(() => {
    if (userInfo) navigation.navigate(routes.NOTES);
  }, [userInfo, navigation]);

  return (
    <>
      <ActivityIndicator visible={loading} animation={require("../assets/animations/person1.json")} />
      <Screen style={styles.screen}>
        <FlashMessage floating animationDuration={700} />
        <MainScreen heading="Register">
          <AppForm
            initialValues={{
              name: "",
              email: '',
              password: '',
              image: []
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {/* <ErrorMessage error={error} visible={error} /> */}
            <AppFormImagePicker name={"image"} />
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              icon='account'
              name='name'
              placeholder='Name'
            />
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
            <SubmitButton title="Register" />
          </AppForm>
        </MainScreen>
        <AppText style={{ color: colors.medium, marginTop: 10 }}>Already have an account? <AppText onPress={navigation.navigate(routes.LOGIN)} style={{ color: colors.primary }}>Login here</AppText></AppText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20
  }
})

export default RegisterScreen;