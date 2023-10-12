import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React from "react";

const Header = ({ props, navigation }) => {
  const { title } = props;
  const truncatedTitle = title.length > 25 ? title.slice(0, 25) + "..." : title;

  return (
    <View style={styles.header}>
      <View style={styles.headerAction}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FeatherIcon name="arrow-left" size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>{truncatedTitle}</Text>

      <View style={[styles.headerAction, { alignItems: "flex-end" }]}>
        <TouchableOpacity
          onPress={() => {
            alert("More Options will be displayed later, maybe?");
          }}
        >
          <FeatherIcon name="more-vertical" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
