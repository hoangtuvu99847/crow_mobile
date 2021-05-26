import AsyncStorage from "@react-native-async-storage/async-storage";


class StorageApp {
  async removeValue(key) {
    try {
      await AsyncStorage.removeItem(`@${key}`);
      console.log(`Remove data with key: ${key} from storage successful!!`);
    } catch (e) {
      console.log("ERROR: removeValue :: -> ", e);
    }
  }

  async setValue(key, data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
      console.log("ERROR: setValue :: -> ", e);
    }
  }

  async getValue(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("ERROR: setValue :: -> ", e);
    }
  }
}

export default new StorageApp();
