import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import saxo from "../../../assets/icon.png";

const Advertisement = () => {
  const handlePress = () => {
    Linking.openURL("https://saxo.dk");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={saxo} style={styles.image} />
      <Text style={styles.sponsoredText}>Sponsoreret indhold</Text>
    </TouchableOpacity>
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  sponsoredText: {
    fontSize: 10,
    color: "#888",
    marginTop: 5,
  },
});
