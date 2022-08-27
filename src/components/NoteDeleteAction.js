import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


var height = false;
function NoteDeleteAction({ onPress, large }) {
  height = large;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.containerDelete]}>
        <MaterialCommunityIcons
          name='trash-can'
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback >

  );
}

const styles = StyleSheet.create({
  containerDelete: {
    backgroundColor: colors.danger,
    width: 50,
    height: height ? 130 : 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
});

export default NoteDeleteAction;