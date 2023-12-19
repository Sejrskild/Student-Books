import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants";

const HeaderInformation = ({ user }) => {
  const { avatar, firstName, lastName } = user;

  return (
    <View style={styles.profile}>
      <View style={styles.profileTop}>
        <View style={styles.avatar}>
          <View style={styles.avatarImg}>
            <Text style={styles.avatarText}>{avatar || "😊"}</Text>
          </View>
        </View>
        <View style={styles.profileBody}>
          <Text style={styles.profileTitle}>{`${firstName}\n${lastName}`}</Text>

          <Text style={styles.profileSubtitle}>Forhåbentlig studerende 🥲</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.light_primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 50,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
});
