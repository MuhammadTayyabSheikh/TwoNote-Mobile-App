import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function NoteDeleteAction({ onPress, large }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.containerEdit}>
        <MaterialCommunityIcons
          name='pencil'
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containerEdit: {
    backgroundColor: colors.primaryButton,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
})

export default NoteDeleteAction;