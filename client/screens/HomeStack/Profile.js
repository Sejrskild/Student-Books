import React from "react";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";

import Stats from "../../components/Stats";
import Contact from "../../components/HomeStack/Item_Profile/Contact";
import Advertisement from "../../components/HomeStack/Item_Profile/Advertisement";
import HeaderInformation from "../../components/HomeStack/Item_Profile/Header";

import { COLORS } from "../../constants";

const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.75, 400);

export default function Profile({ navigation, route }) {
  const user = route.params.user;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <HeaderInformation user={user} />
        <Stats
          createdAt={user.createdAt}
          rating={user.user_rating / user.user_rating_count}
          items={user.amountOfItemsListed}
          isProfile={false}
        />
        <Contact user={user} />
        <Advertisement />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: COLORS.light_primary,
  },
  list: {
    marginTop: 18,
    marginHorizontal: -6,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    width: CARD_WIDTH,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSearch: {
    position: "relative",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 40,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
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
  profileDescription: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  profileTags: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: COLORS.light_primary,
    marginRight: 4,
  },
  stats: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: "rgba(189, 189, 189, 0.32)",
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: "#778599",
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#121a26",
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.light_primary,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.light_primary,
    borderColor: COLORS.light_primary,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
    color: "#121a26",
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff1f5",
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    color: "#121a26",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
});
