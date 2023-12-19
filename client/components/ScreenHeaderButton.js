import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { Entypo } from "@expo/vector-icons";

const ScreenHeaderButton = ({ navigation, iconName }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.btnImg}
        onPress={() => navigation.goBack()}
      >
        <Entypo name={iconName} size={24} color={COLORS.light_secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeaderButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
