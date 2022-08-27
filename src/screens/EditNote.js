import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import Screen from '../components/Screen';
import { AppForm, AppFormField, AppFormImagePicker, AppFormPicker, ErrorMessage, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';
import MainScreen from '../components/MainScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { register } from '../redux/actions/userActions';
import FlashMessage, { showMessage } from "react-native-flash-message";
import CategoryPickerItem from '../components/CategoryPickerItem';
import categories from '../config/categories';
import { createNoteAction, updateNoteAction } from '../redux/actions/notesActions';
import routes from '../navigation/routes';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("title"),
  category: Yup.string().label("category"),
  content: Yup.string().label("content"),
});

function EditNote({ route, navigation }) {
  const [categoryIcon, setCategoryIcon] = useState("apple-keyboard-command");
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const handleSubmit = ({ title, content, category }, { resetForm }) => {
    console.log("Edit Note", route.params._id, title, content, category);
    Keyboard.dismiss();
    dispatch(updateNoteAction(route.params._id, title, content, category));
    if (error)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });

    if (!error) {
      resetForm();
      navigation.navigate(routes.NOTES);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} animation={require("../assets/animations/person1.json")} />
      <Screen style={styles.screen}>
        <FlashMessage floating animationDuration={700} />
        <MainScreen heading="Edit Note">
          <AppForm
            initialValues={{
              title: route.params.title,
              category: route.params.category,
              content: route.params.content
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={255}
              icon='ansible'
              name='title'
              placeholder='Title'
            />
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
              maxLength={255}
              multiline
              name='content'
              numberOfLines={3}
              icon='order-bool-descending'
              placeholder='Content'
            />
            {/* <Fetching /> */}
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

export default EditNote;