import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import FeedNavigator from './FeedNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';
import AddNewNote from '../screens/AddNewNote';
import EditProfile from '../screens/EditProfile';
import colors from '../config/colors';
import storage from '../utilities/storage';
import AuthNavigator from './AuthNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userInfo1 = storage.getItem("userInfo");

  console.log("App Navigator", userInfo1)
  let user = null;
  if (userInfo)
    user = userInfo
  else if (userInfo1)
    user = userInfo1
  user = user

  if (user._W)
    user = JSON.parse(user._W)
  else
    user = user
  // user = JSON.parse(user._W)
  console.log(typeof user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.quaternary,
        tabBarActiveBackgroundColor: colors.tershary,
        tabBarInactiveBackgroundColor: colors.secondary,
      }}
    >
      <Tab.Screen
        name={routes.NOTES}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name='clipboard'
              color={color}
              size={size}
            />,

        }}
      />
      <Tab.Screen
        name={routes.NEW_NOTE}
        component={AddNewNote}
        options={({ navigation }) => ({
          // tabBarButton: () => <NewListingButton onPress={() => navigation.navigate(routes.EDIT_NOTE)} />,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              // onPress={() => navigation.navigate(routes.EDIT_NOTE)}
              name='plus-circle'
              color={color}
              size={size}
            />,
        })}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={EditProfile}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name='account'
              color={color}
              size={size}
            />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;