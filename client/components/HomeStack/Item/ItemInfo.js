import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../constants";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const ItemInfo = ({ book }) => {
  const {
    title,
    description,
    condition,
    author,
    price,
    location,
    fieldOfStudy,
  } = book;
  const featureCount = 3;

  return (
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <View style={styles.line} />
        <Text style={styles.infoHeader}>{title}</Text>
        <Text style={styles.infoSubHeader}>Skrevet af {author}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuresContainer}
          alignItems="center"
        >
          <View style={styles.feature}>
            <MaterialIcons
              name="attach-money"
              style={styles.featureIcon}
              size={24}
              color={COLORS.light_primary}
            />
            <Text style={styles.featureText}>
              {price ? `${price} kr.` : "Gratis"}
            </Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons
              name="location-on"
              style={styles.featureIcon}
              size={24}
              color={COLORS.light_primary}
            />
            <Text style={styles.featureText}>
              {location
                ? location.length > 11
                  ? location.substring(0, 11) + "..."
                  : location
                : "Ikke angivet"}
            </Text>
          </View>
          <View style={styles.feature}>
            <FontAwesome5
              name="graduation-cap"
              style={styles.featureIcon}
              size={20}
              color={COLORS.light_primary}
            />
            <Text style={styles.featureText}>
              {fieldOfStudy ? fieldOfStudy : "Ikke angivet"}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.line} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Beskrivelse</Text>
          <Text style={styles.descriptionText}>{description}</Text>
          <View style={styles.itemSpecifications}>
            <View style={styles.specification}>
              <Text style={styles.specificationText}>Stand</Text>
              <Text style={styles.specificationValue}>{condition}</Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationText}>Pris</Text>
              <Text style={styles.specificationValue}>
                {price ? `${price} kr.` : "Gratis"}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationText}>Studieretning</Text>
              <Text style={styles.specificationValue}>
                {fieldOfStudy ? fieldOfStudy : "Ikke angivet"}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationText}>Forfatter</Text>
              <Text style={styles.specificationValue}>{author}</Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationText}>Lokation</Text>
              <Text style={styles.specificationValue}>{location}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemInfo;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: COLORS.light_primary,
    marginVertical: 16,
    opacity: 0.5,
  },
  info: {
    paddingHorizontal: 12,
  },
  infoHeader: {
    marginVertical: 4,
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.light_primary,
  },
  infoSubHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.light_primary,
    opacity: 0.5,
    margin: 0,
  },
  featuresContainer: {
    flexDirection: "row",
    marginVertical: 12,
    flex: 1,
  },
  feature: {
    height: 110,
    width: Dimensions.get("window").width / 3 - 28,
    borderRadius: 8,
    borderColor: "lightgrey",
    borderWidth: 1,
    marginRight: 12,
    position: "relative",
  },
  featureIcon: {
    margin: 12,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.light_primary,

    margin: 12,
    bottom: 0,
    position: "absolute",
  },
  descriptionContainer: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.light_primary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
  },
  itemSpecifications: {
    marginTop: 24,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  specification: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  specificationText: {
    fontWeight: "600",
    color: COLORS.light_primary,
  },
  specificationValue: {
    color: COLORS.light_primary,
  },
});
