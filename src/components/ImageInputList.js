import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  return (
    // <View style={styles.container}>
    <View style={styles.container} >
      {
        imageUris.map(uri => (
          <View key={uri + ''} style={styles.image}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          </View>
        ))
      }
      {imageUris.length <= 0 && <ImageInput onChangeImage={uri => onAddImage(uri)} />}
    </View >
    // {/* </View> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10
    // width: '100%',
  },
  image: {
    marginRight: 10
  }
})

export default ImageInputList;