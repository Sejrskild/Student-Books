import { createStackNavigator } from "@react-navigation/stack";
import ScreenHeaderButton from "../components/ScreenHeaderButton";

import Avatar from "../components/Avatar";
import Item from "../screens/HomeStack/Item";
import Main from "../screens/SellStack/Main";
import Camera from "../screens/SellStack/Camera";

const Stack = createStackNavigator();

const SellStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sell_Main"
        component={Main}
        options={({ navigation }) => ({
          headerRight: () => <Avatar navigation={navigation} />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Sell_Camera"
        component={Camera}
        options={{
          headerShown: false,

          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SellStack;
