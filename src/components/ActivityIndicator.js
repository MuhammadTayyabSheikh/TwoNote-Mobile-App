import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

function ActivityIndicator({ visible = false, loop = true, animation }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        id="firstLottie"
        autoPlay
        loop={loop}
        speed={0.8}
        source={animation}
        style={"@react"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    // opacity: 0.97,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1
  }
});

export default ActivityIndicator;