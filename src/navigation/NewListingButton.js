import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name='plus-circle' color={colors.secondary} size={35} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderColor: colors.secondary,
    borderWidth: 10,
    borderRadius: 40,
    bottom: 17
  }
})

export default NewListingButton;