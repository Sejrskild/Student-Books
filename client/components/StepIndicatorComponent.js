/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../context/appContext";
import { useNavigation } from "@react-navigation/native";

const PAGES = ["Email", "Code", "Reset Password"];

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#14384F",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#14384F",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#14384F",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#14384F",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#14384F",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#14384F",
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" : "#14384F",
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = "alternate-email";
      break;
    }
    case 1: {
      iconConfig.name = "security";
      break;
    }
    case 2: {
      iconConfig.name = "vpn-key";
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

export default function StepIndicatorComponent({
  currentPage,
  setCurrentPage,
}) {
  const [email, setEmail] = useState("");
  const [passwordCode, setPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  const navigation = useNavigation();

  const {
    handleSendPasswordCode,
    handlePasswordVerification,
    isLoading,
    handlePasswordChange,
  } = useAppContext();

  // Sends a password code to the user's email
  const sendPasswordCode = async () => {
    try {
      // TODO: Tjek lige om email er valid inden vi sender den afsted
      const response = await handleSendPasswordCode(email);
      if (response === 200) {
        setCurrentPage((prev) => (prev += 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Checks if the code is correct if yes then we can move on to the next page
  const handlePasswordCode = async () => {
    try {
      const response = await handlePasswordVerification(email, passwordCode);
      if (response) {
        setCurrentPage((prev) => (prev += 1));
      } else {
        console.log("Incorrect Password provided - try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Changes the password
  const changePassword = async () => {
    try {
      await handlePasswordChange(email, passwordCode, newPassword);
      // ChatGPT - I want to navigate to the login screen after the user has changed their password the screen is named LoginScreen
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const renderViewPagerPage = (data, index) => {
    switch (index) {
      case 0:
        return (
          <View key={data} style={styles.page}>
            <Text style={styles.pageTitle}>Nulstilling af adgangskode</Text>
            <Text style={styles.pageDescription}>
              Indtast din e-mail-adresse nedenfor, og vi sender dig en kode for
              at nulstille dit kodeord.
            </Text>
            <TextInput
              style={styles.inputField}
              placeholder="Din e-mail"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={sendPasswordCode}
              disabled={isLoading}
            >
              <Text style={styles.actionButtonText}>
                {isLoading ? <ActivityIndicator /> : "Send Kode"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 1:
        return (
          <View key={data} style={styles.page}>
            <Text style={styles.pageTitle}>Bekræft med kode</Text>
            <Text style={styles.pageDescription}>
              Indtast den kode, du har modtaget på din e-mail.
            </Text>
            <TextInput
              style={styles.inputField}
              placeholder="Din kode"
              autoCapitalize="none"
              autoCorrect={false}
              value={passwordCode}
              onChangeText={(text) => setPasswordCode(text)}
            />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePasswordCode}
            >
              <Text style={styles.actionButtonText}>Bekræft kode</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View key={data} style={styles.page}>
            <Text style={styles.pageTitle}>Indstil nyt kodeord</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Dit nye kodeord"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={changePassword}
            >
              <Text style={styles.actionButtonText}>Opdater kodeord</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const renderLabel = ({ position, label, currentPosition }) => {
    return (
      <Text
        style={[
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel,
        ]}
      >
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          stepCount={3}
          currentPosition={currentPage}
          // make it so that the labels are not clickable
          renderLabel={renderLabel}
          renderStepIndicator={renderStepIndicator}
          labels={["Email", "Kode", "Ny adgangskode"]}
        />
      </View>
      <Swiper
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
        scrollEnabled={false}
      >
        {PAGES.map((page, index) => renderViewPagerPage(page, index))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 0.5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#14384F",
    marginBottom: 15,
  },
  pageDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputField: {
    width: "100%",
    height: 45,
    padding: 10,
    marginBottom: 20,
    borderColor: "#14384F",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  actionButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#4682A9",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4682A9",
  },
});
