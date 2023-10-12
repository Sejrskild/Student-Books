import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../assets/colors";
import Book from "./Book";

const FeaturedBooks = ({ books, title, navigation }) => {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Book book={item} navigation={navigation} />}
      />
    </View>
  );
};

export default FeaturedBooks;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.PRUSSIAN_BLUE,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});
