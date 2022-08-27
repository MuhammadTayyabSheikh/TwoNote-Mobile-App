import * as SecureStore from 'expo-secure-store';
// import jwtDecode from 'jwt-decode';
// import console from './logger';

const key = "authToken";

const setItem = async (key, data) => {
  try {
    await SecureStore.setItemAsync(key, data);
  } catch (error) {
    console.log('Error storing login details', error);
  }
}

const getItem = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting login details", error);
  }
}

const getUser = async () => {
  const token = await getItem("userInfo");
  return (token) ? token : null;
}

const removeItem = async () => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.log("Error removing login details", error);
  }
}

export default {
  getItem,
  getUser,
  setItem,
  removeItem
}