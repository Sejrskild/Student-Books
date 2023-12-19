import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Feed from "../../components/HomeStack/Main/Feed";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useAppContext } from "../../context/appContext";

const Search = ({ route }) => {
  const { user } = useAppContext();
  const [search, setSearch] = useState(route.params.search || "");
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/items/search",
        {
          params: {
            search,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
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
            handleSearch();
          }}
        >
          <AntDesign name="search1" size={24} color={COLORS.light_background} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {items.length > 0 ? `${items.length}` : "0"} resultater for {search}
        </Text>
      </View>

      <Feed items={items} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
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
  headerContainer: {
    marginTop: 12,
    paddingLeft: 12,
  },
  headerName: {
    fontSize: 24,
    color: COLORS.light_primary,
    marginBottom: 8,
  },
  headerText: {
    opacity: 0.5,
    color: COLORS.light_primary,
  },
});
