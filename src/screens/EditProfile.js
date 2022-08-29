import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, AppFormImagePicker, ErrorMessage, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';
import MainScreen from '../components/MainScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout, register, updateUser } from '../redux/actions/userActions';
import FlashMessage, { showMessage } from "react-native-flash-message";
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  image: Yup.array()
});

function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const handleSubmit = async ({ name, email, password, image }) => {
    console.log(name, email, password, image[0]);
    dispatch(updateUser(name, email, password, image[0]));
    // if (error)
    //   navigation.navigate(routes.NOTES);
  };

  const handleLogout = () => {
    console.log("Edit Profile", "Logout");
    dispatch(logout());
    // navigation.navigate(routes.LOGIN);
  };

  useEffect(() => {
    if (error)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });

  }, [error]);

  useEffect(() => {
    if (success)
      showMessage({
        message: "Profile Changes Saved Successfully!",
        type: "success",
      });
  }, [success]);

  return (
    <>
      <ActivityIndicator visible={loading} loop={false} animation={require("../assets/animations/uploaded.json")} />
      <Screen style={styles.screen}>
        <FlashMessage floating animationDuration={700} />
        <MainScreen heading="Edit Profile" iconVisible={true} iconName="logout" search={false} iconOnPress={handleLogout}>
          <AppForm
            initialValues={{
              name: (route.params.user).name,
              email: (route.params.user).email,
              password: '',
              image: [((route.params.user).img)]
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
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
              placeholder='Re-Enter Password'
              secureTextEntry
            />
            <SubmitButton title="Save Changes" />
          </AppForm>
        </MainScreen>
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

export default EditProfile;