import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThreeDotsMenu = () => {
  // for dev
  const handleClick = async () => {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleClick}>
      <Entypo
        name="dots-three-vertical"
        size={24}
        color={COLORS.light_primary}
      />
    </TouchableOpacity>
  );
};

export default ThreeDotsMenu;

const styles = StyleSheet.create({
  btn: {
    marginRight: 16,
  },
});
