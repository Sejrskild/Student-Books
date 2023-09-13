import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { AppProvider } from "./context/appContext";
import AppNavigator from "./utilities/AppNavigator";
import "./config/ReactotronConfig";

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AppProvider>
  );
}
