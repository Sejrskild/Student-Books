import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../assets/colors";

const Book = ({
  book: { image, title, price, location },
  navigation,
  book,
}) => (
  <View style={styles.cardWrapper}>
    <TouchableOpacity
      onPress={() => navigation.navigate("HomeScreenStack__Item", { book })}
    >
      <Image
        style={styles.image}
        source={{
          uri: `data:image/png;base64,${image}`,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="coins"
              color={colors.STEEL_BLUE}
              size={14}
              style={styles.icon}
            />
            <Text style={styles.price}>{price.toFixed()} kr.</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="location-arrow"
              color={colors.STEEL_BLUE}
              size={14}
              style={styles.icon}
            />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cardWrapper: {
    width: 160,
    height: 220, // Increased height due to new content
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0D1F3C",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  price: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.STEEL_BLUE,
  },
  location: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.STEEL_BLUE,
  },
  detailsContainer: {
    marginTop: 16,
  },
  clickButton: {
    position: "absolute",
    bottom: -20, // Half the height of the button to make it appear half-embedded
    right: -20, // Half the width of the button
    width: 40, // Adjust based on desired size
    height: 40, // Adjust based on desired size
    borderRadius: 20, // Half of width/height to make it a perfect circle
    backgroundColor: "white",
    justifyContent: "center", // Centers the icon vertically
    alignItems: "center", // Centers the icon horizontally
    borderWidth: 1,
    borderColor: colors.STEEL_BLUE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // for Android shadow
  },
});

export default Book;
