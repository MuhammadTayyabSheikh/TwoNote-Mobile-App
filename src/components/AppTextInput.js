import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles'
import colors from '../config/colors';

function AppTextInput({ icon, width = '100%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>

      {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[styles.textInput, defaultStyles.text]} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.quaternary,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    width: '100%',
    height: '100%'
  }
})

export default AppTextInput;