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
  console.log("App Navigator", JSON.parse(userInfo._W));
  let user = null;
  if (userInfo)
    user = JSON.parse(userInfo._W)
  else
    user = null

  // console.log(userInfo);
  // console.log((JSON.parse(userInfo._W)));

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
        initialParams={{ user }}
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