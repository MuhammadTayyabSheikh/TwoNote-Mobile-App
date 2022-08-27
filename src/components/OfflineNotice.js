import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';
import AppText from './AppText';

function OfflineNotice() {
  const netInfo = useNetInfo();
  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>
          No Internet Connection
        </AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    width: '100%',
    height: 50,
    position: 'absolute',
    top: Constants.statusBarHeight,
    zIndex: 1,
  },
  text: {
    color: colors.white
  }
})

export default OfflineNotice;