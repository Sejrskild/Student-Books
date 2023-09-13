import AsyncStorage from "@react-native-async-storage/async-storage";
const checkLoggedin = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    return value;
  } catch (error) {
    console.log("Error checkedLoggedin : ", error);
  }
};

const checkLoggedInStatus = async () => {
  const isLoggedIn = await checkLoggedin();
  return isLoggedIn;
};

export default checkLoggedInStatus;
