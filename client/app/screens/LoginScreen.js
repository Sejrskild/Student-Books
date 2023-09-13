import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Waves from "../../components/Waves";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";

// Alert
import Toast from "react-native-toast-message";

// Undraw Image
import Undraw_Login from "../../assets/images/undraw/login.png";

const LoginScreen = ({ navigation }) => {
  const { handleLogin, isLoading, APIResponse } = useAppContext();

  const [fontsLoaded] = useFonts({
    MontserratMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      position: "top",
      text1,
      text2,
      visibilityTime: 8000,
      autoHide: true,
    });
  };

  useEffect(() => {
    if (APIResponse) {
      showToast(APIResponse.type, APIResponse.title, APIResponse.message);
    }
  }, [APIResponse]);

  if (!fontsLoaded) {
    return undefined;
  } else {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Waves />
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
        <View style={styles.header}>
          <Text style={styles.headerText}>Velkommen</Text>
          <Text style={[styles.headerText, styles.headerTextMain]}>
            Tilbage!
          </Text>
        </View>
        <View style={{ flex: 0.3, alignItems: "center" }}>
          <Image
            source={Undraw_Login}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginForm}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.PRUSSIAN_BLUE}
              style={styles.icon}
            />

            <TextInput
              placeholder="E-mail"
              keyboardType="email-address"
              autoComplete="off"
              style={styles.inputIcon}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.PRUSSIAN_BLUE}
              style={styles.icon}
            />
            <TextInput
              placeholder="Adgangskode"
              secureTextEntry
              autoComplete="off"
              autoCapitalize="none"
              style={styles.inputIcon}
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
          </View>
          <TouchableOpacity
            style={[styles.registerButton]}
            onPress={() => handleLogin(formData)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
        </View>
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
  backButton: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flex: 0.15,
    justifyContent: "center",
    paddingLeft: 40,
  },
  headerText: {
    fontSize: 20,
    letterSpacing: 1,
    color: colors.PRUSSIAN_BLUE,
    fontFamily: "MontserratMedium",
    textTransform: "uppercase",
  },
  headerTextMain: {
    fontSize: 45,
  },
  loginForm: {
    flex: 0.5,
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: colors.PRUSSIAN_BLUE,
    fontFamily: "MontserratMedium",
  },
  icon: {
    marginRight: 10,
  },
  inputIcon: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: "MontserratMedium",
  },
  registerButton: {
    backgroundColor: colors.PRUSSIAN_BLUE,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "MontserratMedium",
  },
  flagIcon: {
    marginRight: 10,
  },
});

export default LoginScreen;
