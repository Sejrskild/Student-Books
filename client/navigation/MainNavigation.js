import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

// Navigation Stacks
import HomeStack from "./HomeStack";
import SellStack from "./SellStack";
import ProfileStack from "./ProfileStack";
import { COLORS } from "../constants";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.light_secondary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Sell") {
            iconName = "pluscircleo";
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellStack}
        options={{
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerTitle: "",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
