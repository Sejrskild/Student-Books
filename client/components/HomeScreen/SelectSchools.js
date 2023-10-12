import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SelectSchools = ({ schools }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Søge filter</Text>
    </View>
  );
};

export default SelectSchools;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#0D1F3C",
  },
});
