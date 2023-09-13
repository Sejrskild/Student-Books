import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Waves from "../../components/Waves";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";
import CountrySelection from "../../components/CountrySelection";

const Register = ({ navigation }) => {
  const { handleRegister, isLoading, hasRegistered } = useAppContext();

  const [fontsLoaded] = useFonts({
    MontserratMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone_code: "+45",
    phone: "",
    email: "",
    password: "",
  });

  const [countryFlag, setCountryFlag] = useState("🇩🇰");

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
        <Text style={styles.headerText}>Hej med dig</Text>
        <Text style={[styles.headerText, styles.headerTextMain]}>
          Velkommen!
        </Text>
      </View>
      <View style={styles.registerForm}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.PRUSSIAN_BLUE}
            style={styles.icon}
          />
          <TextInput
            placeholder="Fornavn"
            style={styles.inputIcon}
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.PRUSSIAN_BLUE}
            style={styles.icon}
          />
          <TextInput
            placeholder="Efternavn"
            style={styles.inputIcon}
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <CountrySelection
            phone_code={formData.phone_code}
            setFormData={setFormData}
            setCountryFlag={setCountryFlag}
            countryFlag={countryFlag}
          />

          <TextInput
            placeholder="Telefonnummer"
            keyboardType="phone-pad"
            style={styles.inputIcon}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
        </View>
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
            style={styles.inputIcon}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>
        <TouchableOpacity
          style={[
            styles.registerButton,
            {
              backgroundColor: hasRegistered
                ? "green"
                : isLoading
                ? "#ccc"
                : colors.PRUSSIAN_BLUE,
            },
          ]}
          onPress={
            hasRegistered
              ? () => navigation.navigate("LoginScreen")
              : () => handleRegister(formData)
          }
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? (
              <ActivityIndicator />
            ) : hasRegistered ? (
              <>
                Gå til Login
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            ) : (
              "Opret konto"
            )}
          </Text>
        </TouchableOpacity>
      </View>
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
    flex: 0.3,
    justifyContent: "center",
    paddingLeft: 40,
  },
  headerText: {
    fontSize: 25,
    letterSpacing: 1,
    color: colors.PRUSSIAN_BLUE,
    fontFamily: "MontserratMedium",
    textTransform: "uppercase",
  },
  headerTextMain: {
    fontSize: 35,
  },
  registerForm: {
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

export default Register;
