import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, AppFormImagePicker, AppFormPicker, ErrorMessage, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';
import MainScreen from '../components/MainScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions';
import FlashMessage, { showMessage } from "react-native-flash-message";
import CategoryPickerItem from '../components/CategoryPickerItem';
import categories from '../config/categories';
import { createNoteAction } from '../redux/actions/notesActions';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("title"),
  category: Yup.string().label("category"),
  content: Yup.string().label("content"),
});


function AddNewNote({ navigation }) {
  const [categoryIcon, setCategoryIcon] = useState("apple-keyboard-command");

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const handleSubmit = ({ title, content, category }, { resetForm }) => {
    console.log(title, content, category);
    Keyboard.dismiss();
    dispatch(createNoteAction(title, content, category));
    if (!error) {
      resetForm();
      navigation.navigate(routes.NOTES);
    }
  };

  useEffect(() => {
    if (error)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });
  }, [error])

  return (
    <>
      {/* <ActivityIndicator visible={loading} animation={require("../assets/animations/uploaded.json")} /> */}
      <ActivityIndicator visible={loading} loop={false} animation={require("../assets/animations/uploaded.json")} />
      <Screen style={styles.screen}>
        <FlashMessage floating animationDuration={700} />
        <MainScreen heading="Add New Note">
          <AppForm
            initialValues={{
              title: "",
              category: '',
              content: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormPicker
              items={categories}
              name="category"
              icon={categoryIcon}
              setIcon={(ico) => setCategoryIcon(ico)}
              placeholder="Category"
              width="100%"
              PickerItemComponent={CategoryPickerItem}
              numberOfColumns={3}
            />
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={255}
              icon='ansible'
              name='title'
              placeholder='Title'
            />
            <AppFormField
              maxLength={255}
              multiline
              name='content'
              numberOfLines={3}
              icon='order-bool-descending'
              placeholder='Content'
            />
            <SubmitButton title="Add" />
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

export default AddNewNote;