import "react-native-gesture-handler";
import { AppProvider } from "./context/appContext";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
