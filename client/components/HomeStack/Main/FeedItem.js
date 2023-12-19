import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { relativeTime } from "../../../utils/moment";
import { COLORS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const FeedItem = ({ item }) => {
  const navigation = useNavigation();
  const createdAt = relativeTime(item.createdAt);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Home_Item", {
          item,
        });
      }}
    >
      {item.isPromoted && (
        <View style={styles.premiumBanner}>
          <Text style={styles.premiumBannerText}>Promoted</Text>
        </View>
      )}

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{ uri: `data:image/png;base64,${item.image}` }}
          />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text style={styles.cardPrice}>
              {item.price.toLocaleString("da-DK", {
                style: "currency",
                currency: "DKK",
              })}
            </Text>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.cardStatsItem}>
              <Text style={styles.cardStatsItemText}>{item.condition}</Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FontAwesome5
                color={COLORS.light_primary}
                name="graduation-cap"
                size={14}
              />

              <Text style={styles.cardStatsItemText}>{item.fieldOfStudy}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{item.location}</Text>

            <Text style={styles.cardFooterText}>{createdAt}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: COLORS.light_primary,
    maxWidth: "75%",
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.light_primary,
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#e9e9e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
  },
  premiumBanner: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
    backgroundColor: COLORS.light_primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumBannerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
});
