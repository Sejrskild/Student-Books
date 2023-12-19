import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const Avatar = ({ navigation }) => {
  const { user } = useAppContext();
  const { avatar } = user.user;

  useEffect(() => {
    console.log("User has changed..");
  }, [user]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Profile", {
          screen: "Profile_Main",
        });
      }}
    >
      <Text style={styles.avatarText}>{avatar || "🥷"}</Text>
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    backgroundColor: COLORS.light_primary,
    opacity: 1,
    borderRadius: 50,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    color: "black",
  },
});
