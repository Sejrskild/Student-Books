import Reactotron from "reactotron-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

if (__DEV__) {
  // Only for development
  Reactotron.configure({ name: "Student Books App" })
    .useReactNative()
    .configure()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  // Clear if you want on every time it loads:
  Reactotron.clear();

  console.tron = Reactotron;
}
