import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import routes from './routes';
import MyNotes from '../screens/MyNotes';
import EditNote from '../screens/EditNote';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation='card' screenOptions={{ headerShown: false, headerMode: 'float' }} >
    <Stack.Screen name={routes.NOTES} component={MyNotes} />
    <Stack.Screen
      name={routes.EDIT_NOTE}
      component={EditNote}
      options={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }} />

  </Stack.Navigator >
);

export default FeedNavigator;