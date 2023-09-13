import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import versionConfig from "../../app.json";

// Icons
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Fonts
import { useFonts } from "expo-font";

import logo from "../../assets/images/student_books_logo.png";
import colors from "../../assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AuthScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    NatureBeauty: require("../../assets/fonts/NatureBeaty.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
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

  const displayVersion = async () => {
    const appName = versionConfig.expo.name;
    const version = versionConfig.expo.version;

    Alert.alert("Version", `${appName} version ${version}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Student Books</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Ionicons
            name="ios-lock-open-sharp"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={[styles.button, styles.registerButton]}
        >
          <AntDesign
            name="plus"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={[styles.buttonText, styles.forgotPasswordText]}>
            Glemt passord?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity delayLongPress={2000}>
        <Text onLongPress={displayVersion}>Version 1.0.0</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight + 20,
  },
  logoContainer: {
    flex: 1, // Adjusted flex value
    paddingTop: 40,
    justifyContent: "center", // Vertically center the logo
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.PRUSSIAN_BLUE,
    fontFamily: "NatureBeauty",
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1, // Adjusted flex value
    justifyContent: "flex-start", // Start from the top
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.PRUSSIAN_BLUE,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: 250,
  },
  buttonText: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: colors.STEEL_BLUE,
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: colors.PRUSSIAN_BLUE,
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "Montserrat",
  },
});

export default AuthScreen;
