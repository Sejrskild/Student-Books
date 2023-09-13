import React from "react";
import { Text } from "react-native";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";

const generateTabOptions = (label, iconName, iconFamily = "Entypo") => {
  return {
    tabBarLabel: ({ focused, color }) => (
      <Text
        style={{
          color: focused ? colors.PRUSSIAN_BLUE : colors.STEEL_BLUE,
          opacity: focused ? 1 : 0.3,
        }}
      >
        {label}
      </Text>
    ),
    tabBarIcon: ({ focused, color, size }) => {
      const iconColor = focused ? colors.PRUSSIAN_BLUE : colors.STEEL_BLUE;
      const iconOpacity = focused ? 1 : 0.3;

      switch (iconFamily) {
        case "Entypo":
          return (
            <Entypo
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

export default generateTabOptions;
