import { createStackNavigator } from "@react-navigation/stack";
import ScreenHeaderButton from "../components/ScreenHeaderButton";
import Main from "../screens/ProfileStack/Main";

import Avatar from "../components/Avatar";
import ThreeDotsMenu from "../components/ThreeDotsMenu";
import Item from "../screens/ProfileStack/Item";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => <ThreeDotsMenu />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
        name="Profile_Main"
        component={Main}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),

          headerTitle: "",
          headerShadowVisible: false,
        })}
        name="Profile_Item"
        component={Item}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
