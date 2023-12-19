import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../constants";

export default function UserProfile({ navigation, user, items }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home_Item_Profile", {
            user,
            items,
          })
        }
      >
        <View style={styles.profile}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatar}>{user.avatar || "😊"}</Text>
          </View>

          <View style={styles.profileBody}>
            <Text style={styles.profileHandle}>Sælges af</Text>
            <Text style={styles.profileName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.profileHandle}>{user.email}</Text>
          </View>
          <Entypo
            name="chevron-right"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginLeft: "auto",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light_primary,
  },
  avatar: {
    fontSize: 40,
    transform: [{ translateX: 1 }],
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
