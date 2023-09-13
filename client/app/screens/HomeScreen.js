import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import removeStorage from "../../utilities/removeStorage";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title="Clear AsyncStorage" onPress={removeStorage} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
