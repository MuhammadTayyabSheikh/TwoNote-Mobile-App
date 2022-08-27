import React, { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import colors from '../config/colors';

import routes from '../navigation/routes';
import storage from '../utilities/storage';

function WelcomeScreen({ navigation }) {

  // useEffect(() => {
  //   const user = storage.getItem("userInfo");
  //   if (user)
  //     navigation.navigate(routes.NOTES);
  // }, [navigation]);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/TwoNote-1.png")} />
        <Text style={styles.title}>Welcome to twoNote</Text>
        <Text style={styles.tagLine}>One Safe Place for all your notes.</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title='Login'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Register'
          color="primary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  buttonsContainer: {
    padding: 20,
    width: '100%'

  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    color: colors.secondary,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 20
  },
  tagLine: {
    color: colors.secondary,
    fontSize: 25,
    fontWeight: '600',
  }
})

export default WelcomeScreen;