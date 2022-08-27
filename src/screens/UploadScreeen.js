import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

import colors from '../config/colors';
import AppText from '../components/AppText';
import { BaseNavigationContainer } from '@react-navigation/native';

function UploadScreeen({ progress = 0, visible = false, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <>
            <AppText style={{ color: colors.primary }}>Uploading...</AppText>
            <Progress.Bar color={colors.primary} progress={progress} width={200} />
          </>
        ) : (
          <LottieView
            autoPlay
            loop={false}
            source={require("../assets/animations/uploaded.json")}
            style={styles.animation}
            onAnimationFinish={() => onDone()}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    opacity: 0.95
  },
  animation: {
    width: 250
  }
})

export default UploadScreeen;