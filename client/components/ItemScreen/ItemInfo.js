import { StyleSheet, Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React from "react";
import colors from "../../assets/colors";

const ItemInfo = ({ book }) => {
  const { title, description, stand } = book;

  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{title}</Text>

      {/* <View style={styles.infoRating}>
        <Text style={styles.infoRatingLabel}>Bogens stand: </Text>

        <Text style={styles.infoRatingText}>{stand}</Text>
      </View> */}

      <Text style={styles.infoDescription}>{description}</Text>
    </View>
  );
};

export default ItemInfo;

const styles = StyleSheet.create({
  info: {
    marginTop: 12,
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "#000000",
    marginBottom: 6,
  },
  infoRating: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoRatingLabel: {
    fontSize: 13,
    // fontWeight: "bold",
    color: colors.PRUSSIAN_BLUE,
    marginRight: 2,
  },
  infoRatingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8e8e93",
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: "#8e8e93",
  },
});
