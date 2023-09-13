import AsyncStorage from "@react-native-async-storage/async-storage";

const removeStorage = async () => {
  if (__DEV__) {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared");
  }
};

export default removeStorage;
