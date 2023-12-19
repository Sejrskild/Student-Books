import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import { COLORS } from "../../constants";

// Undraw Image
import Undraw_forgot_password from "../../assets/images/undraw/forgot_password.png";

// Step Indicator
import StepIndicatorComponent from "../../components/ForgotPassword/StepIndicatorComponent";

const ForgotPasswordScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={Undraw_forgot_password}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <StepIndicatorComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardContainer: {
    flex: 1,
  },
  backButton: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.light_primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: COLORS.light_primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
