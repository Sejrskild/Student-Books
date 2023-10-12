import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function UserProfile({ navigation, user, items }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HomeScreenStack__Profile", {
            user,
            items,
          })
        }
      >
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri:
                user.image ||
                "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
            }}
            style={styles.profileAvatar}
          />

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
    marginRight: 12,
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
});
