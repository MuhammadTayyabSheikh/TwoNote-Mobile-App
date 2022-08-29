import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import storage from './src/utilities/storage';
import { navigationRef } from './src/navigation/rootNavigation';
import navigationTheme from './src/navigation/navigationTheme';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import { logout } from './src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

// logger.start();

export default function AppEntry() {
  const [user, setUser] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    // const users = await storage.getItem("userInfo");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo: users } = userLogin;

    // console.log("AppEntry", users);
    if (users) setUser(users);
  }

  if (!isReady)
    return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.log(console.warn)} />;
  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
        {/* <AuthNavigator /> */}
      </NavigationContainer>
    </>
  );
}