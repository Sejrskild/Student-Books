import React from "react";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import ProfileScreen from "../app/screens/ProfileScreen";

// Colors
import colors from "../assets/colors";

// Buttom Tabs
import TradingScreen from "../app/screens/TradingScreen";

// Utilities
import generateTabOptions from "../utilities/tabOptions";
import { options } from "../utilities/tabOptions";
import HomeScreenStack from "./HomeScreenStack";

const AfterLoginTabs = createBottomTabNavigator();

const AfterLoginTabNavigator = () => {
  return (
    <AfterLoginTabs.Navigator initialRouteName="Home" screenOptions={options}>
      <AfterLoginTabs.Screen
        name="Home"
        component={HomeScreenStack}
        options={generateTabOptions("Forside", "search1", "AntDesign")}
      />
      <AfterLoginTabs.Screen
        name="Trading"
        component={TradingScreen}
        options={generateTabOptions("Market", "pluscircleo", "AntDesign")}
      />
      <AfterLoginTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={generateTabOptions("Profil", "user", "AntDesign")}
      />
    </AfterLoginTabs.Navigator>
  );
};

export default AfterLoginTabNavigator;
