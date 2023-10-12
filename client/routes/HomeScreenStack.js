// React Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../app/screens/HomeScreen";

// Utilities
import { options } from "../utilities/tabOptions";
import ItemScreen from "../app/screens/ItemScreen";
import ProfileScreen from "../app/screens/ProfileScreen";

export default function HomeScreenStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HomeScreenStack" screenOptions={options}>
      <Stack.Screen name="HomeScreenStack" component={HomeScreen} />
      <Stack.Screen name="HomeScreenStack__Item" component={ItemScreen} />
      <Stack.Screen name="HomeScreenStack__Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
