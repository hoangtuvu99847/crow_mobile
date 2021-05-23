import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@user');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('ERROR: getToken :: -> ', e);
  }
};

export const authHeader = async () => {
  const tokenString = await getToken();
  const token = JSON.parse(tokenString);
  console.log('TOKEN: ', token);
  if (token && token.access_token) {
    console.log('ACCESS: ', token.access_token);
    return {Authorization: 'Bearer ' + token.access_token};
  } else {
    return {};
  }
};
