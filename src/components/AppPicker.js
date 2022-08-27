import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableWithoutFeedback, Button, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles'
import AppText from './AppText';
import Screen from './Screen';
import PickerItem from './PickerItem';
import colors from '../config/colors';

function AppPicker({ icon, setIcon, placeholder, items, selectedItem, onSelectItem, width = '100%', PickerItemComponent = PickerItem, numberOfColumns = 1 }) {
  const [modalVisible, setmodalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setmodalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}

          {selectedItem ?
            <AppText style={styles.text}>{selectedItem}</AppText>
            :
            <AppText style={styles.placeholder}>{placeholder}</AppText>}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen>
          <Button title='Close' color={colors.primaryButton} onPress={() => setmodalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) =>
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setmodalVisible(false);
                  onSelectItem(item.label);
                  setIcon(item.icon);
                }}
              />
            }
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.quaternary,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  },
  text: {
    flex: 1,
    color: colors.secondary
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1
  }
})

export default AppPicker;