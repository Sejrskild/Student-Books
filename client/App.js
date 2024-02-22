import "react-native-gesture-handler";
import { AppProvider } from "./context/appContext";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    // AppProvider is a custom component that wraps the entire app, that makes the app context available to all components
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
