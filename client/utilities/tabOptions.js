import React from "react";
import { Text } from "react-native";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";

const generateTabOptions = (label, iconName, iconFamily = "Entypo") => {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      const iconColor = focused ? colors.PRUSSIAN_BLUE : colors.STEEL_BLUE;
      const iconOpacity = focused ? 1 : 0.3;

      switch (iconFamily) {
        case "AntDesign":
          return (
            <AntDesign
              name={iconName}
              size={24}
              color={iconColor}
              style={{ opacity: iconOpacity }}
            />
          );
        case "FontAwesome":
          return (
            <FontAwesome
              name={iconName}
              size={24}
              color={iconColor}
              style={{ opacity: iconOpacity }}
            />
          );
        case "FontAwesome5":
          return (
            <FontAwesome5
              name={iconName}
              size={24}
              color={iconColor}
              style={{ opacity: iconOpacity }}
            />
          );
        default:
          return null;
      }
    },
  };
};

export const options = {
  headerShown: false,
  tabBarStyle: {
    // marginTop: 10,
    borderTopWidth: 0,
    backgroundColor: "white",
  },
  tabBarActiveTintColor: colors.PRUSSIAN_BLUE,
  tabBarInactiveTintColor: colors.STEEL_BLUE,
  tabBarShowLabel: false,
};

export default generateTabOptions;
