import AsyncStorage from "@react-native-async-storage/async-storage";

export default checkOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem("hasSeenOnboarding");
    return value;
  } catch (error) {
    console.log("Error hasSeenOnboarding : ", error);
  }
};
