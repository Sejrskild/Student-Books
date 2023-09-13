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
import { Ionicons } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";

// Undraw Image
import Undraw_forgot_password from "../../assets/images/undraw/forgot_password.png";

// Step Indicator
import StepIndicatorComponent from "../../components/StepIndicatorComponent";

// Toast
import Toast from "react-native-toast-message";

// Toast Hook
import useToastNotification from "../../hooks/useToastNotification";

const ForgotPasswordScreen = ({ navigation }) => {
  const { APIResponse } = useAppContext();

  useToastNotification(APIResponse);

  const [currentPage, setCurrentPage] = useState(0);

  const [fontsLoaded] = useFonts({
    MontserratMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color={colors.PRUSSIAN_BLUE}
          />
        </TouchableOpacity>
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
      <Toast />
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
    borderColor: colors.PRUSSIAN_BLUE,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: colors.PRUSSIAN_BLUE,
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
