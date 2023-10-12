import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { relativeTime } from "../../utilities/moment";
import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";
import Stats from "../../components/ProfileScreen/Stats";
import HeaderInformation from "../../components/ProfileScreen/Header";
import Contact from "../../components/ProfileScreen/Contact";
import Header from "../../components/Header";

const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.75, 400);

export default function ProfileScreen({ navigation, route }) {
  const user = route.params.user;
  const items = route.params.items;
  const time = relativeTime(user.createdAt);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Header
          props={{ title: `${user.firstName} ${user.lastName}` }}
          navigation={navigation}
        />
        <HeaderInformation user={user} />
        <Stats
          createdAt={time}
          rating={user.user_rating / user.user_rating_count}
          items={items}
        />
        <Contact user={user} />

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>My Experience</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <Text style={styles.listAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {[
              {
                icon: "figma",
                label: "Senior UI/UX Designer",
                company: "Figma",
                jobType: "Full Time",
                years: "2019-2023",
              },
              {
                icon: "github",
                label: "Mid-level Designer",
                company: "GitHub",
                jobType: "Full Time",
                years: "2017-2019",
              },
              {
                icon: "twitter",
                label: "Junior Designer",
                company: "Twitter",
                jobType: "Full Time",
                years: "2015-2017",
              },
            ].map(({ icon, label, company, jobType, years }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <FeatherIcon color="#000" name={icon} size={24} />
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>

                    <Text style={styles.cardFooterText}>{years}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Recommended for you</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <Text style={styles.listAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {[
              {
                icon: "figma",
                label: "Senior UI/UX Designer",
                company: "Figma",
                jobType: "Full Time",
                years: "2019-2023",
              },
              {
                icon: "github",
                label: "Mid-level Designer",
                company: "GitHub",
                jobType: "Full Time",
                years: "2017-2019",
              },
              {
                icon: "twitter",
                label: "Junior Designer",
                company: "Twitter",
                jobType: "Full Time",
                years: "2015-2017",
              },
            ].map(({ icon, label, company, jobType, years }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <FeatherIcon color="#000" name={icon} size={24} />
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>

                    <Text style={styles.cardFooterText}>{years}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    borderColor: colors.PRUSSIAN_BLUE,
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
    color: colors.PRUSSIAN_BLUE,
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
    color: colors.PRUSSIAN_BLUE,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.PRUSSIAN_BLUE,
    borderColor: colors.PRUSSIAN_BLUE,
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
