import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../constants";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const Welcome = ({ user, navigation }) => {
  const [search, setSearch] = useState("");
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerName}>Hej {user.firstName}</Text>
        <Text style={styles.headerMessage}>Find dine studiebøger her</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Hvad søger du efter?"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            navigation.navigate("Home_Search", { search });
          }}
        >
          <AntDesign name="search1" size={24} color={COLORS.light_background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 0,
  },
  headerName: {
    fontSize: 24,
    color: COLORS.light_primary,
    marginBottom: 8,
  },
  headerMessage: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.light_primary,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.light_secondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
