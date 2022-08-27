import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import SearchNote from './SearchNote';

function MainScreen({ heading, children, iconName, iconVisible = false, iconOnPress, search = true, query, handleSearch }) {
  const [searchVisible, setSearchVisible] = useState(false)
  return (
    <>
      <View>
        <View style={styles.container}>
          <AppText style={styles.heading} >{heading}</AppText>
          {iconVisible &&
            <Icon
              name={iconName}
              iconColor={colors.quaternary}
              backgroundColor="transparent" size={50}
              onPress={() => {
                if (search) setSearchVisible(!searchVisible)
                else iconOnPress();
              }
              } />}
        </View>
        {searchVisible && search && <SearchNote query={query} handleSearch={handleSearch} />}
      </View>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row',
    borderBottomColor: colors.quaternary,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  heading: {
    color: colors.quaternary,
    fontSize: 40,
    fontWeight: "200",
  }
})

export default MainScreen;