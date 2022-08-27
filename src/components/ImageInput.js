import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import FlashMessage from 'react-native-flash-message';
// import logger from '../utility/logger';

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted)
      alert("You need to enable permission to access the library")
  }

  const handlePress = () => {
    if (!imageUri) selectImage();
    else Alert.alert("Delete", "Are you sure want to delete this image?", [
      { text: 'No' },
      { text: 'Yes', onPress: () => onChangeImage(null) },
    ]);

  }
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        onChangeImage(result.uri)
      }
    } catch (error) {
      console.log("Error reading an image", error);
      useEffect(() => {
        if (error)
          showMessage({
            message: "Error Occurred: ",
            content: error,
            type: "danger",
          });

      }, [error]);
    }
  }

  return (
    <>
      <FlashMessage floating animationDuration={700} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {imageUri ?
            <Image source={{ uri: imageUri }} style={styles.image} />
            :
            <MaterialCommunityIcons name='camera' size={40} color={colors.medium} />
          }
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.quaternary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: "100%",
    overflow: 'hidden'
  },
  image: {
    height: "100%",
    width: "100%",
  }
})

export default ImageInput;