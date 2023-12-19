import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import axios from "axios";

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
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const navigation = useNavigation();

  const handleStepOne = async () => {
    if (email === "") {
      return Alert.alert(
        "Hov ❌",
        "Noget tyder på at der mangler at blive udfyldt en korrekt email."
      );
    }

    try {
      setIsLocalLoading(true);
      const { status } = await axios.post(
        "http://localhost:3000/api/v1/users/forgot-password-code",
        {
          email,
        }
      );

      if (status === 200) {
        setCurrentPage(1);
      } else {
        Alert.alert("Hov ❌", "Der er sket en fejl, prøv igen senere.");
      }
      setIsLocalLoading(false);
    } catch (error) {
      console.error(error.response.status);
      Alert.alert(
        "Hov ❌",
        "Der skete en fejl, tjek om du har skrevet den rigtige email."
      );
      setIsLocalLoading(false);
    }
  };

  const handleStepTwo = async () => {
    if (passwordCode === "") {
      return Alert.alert(
        "Hov ❌",
        "Noget tyder på at der mangler at blive udfyldt en korrekt kode."
      );
    }

    try {
      setIsLocalLoading(true);
      const { status } = await axios.post(
        "http://localhost:3000/api/v1/users/forgot-password-code-verification",
        {
          email,
          code: passwordCode,
        }
      );

      if (status === 200) {
        setCurrentPage(2);
        setIsLocalLoading(false);

        return;
      }
    } catch (error) {
      console.error(error.response.status);
      Alert.alert(
        "Hov ❌",
        "Der skete en fejl, tjek om du har skrevet den rigtige kode."
      );
      setIsLocalLoading(false);
    }
    setIsLocalLoading(false);
  };

  const handleStepThree = async () => {
    if (newPassword === "") {
      return Alert.alert(
        "Hov ❌",
        "Noget tyder på at der mangler at blive udfyldt et korrekt kodeord."
      );
    }

    try {
      setIsLocalLoading(true);
      const { status } = await axios.post(
        "http://localhost:3000/api/v1/users/reset-password",
        {
          email,
          code: passwordCode,
          password: newPassword,
        }
      );

      if (status === 200) {
        // When alert is dismissed, navigate to login screen
        Alert.alert(
          "Success ✅",
          "Dit kodeord er blevet ændret, du kan nu logge ind med dit nye kodeord.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("LoginStack_Main");
              },
            },
          ]
        );
        return;
      }
      setIsLocalLoading(false);
    } catch (error) {
      console.error(error.response.status);
      Alert.alert(
        "Hov ❌",
        "Der skete en fejl, tjek om du har skrevet den rigtige kode."
      );
      setIsLocalLoading(false);
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
              onPress={handleStepOne}
              disabled={isLocalLoading}
            >
              <Text style={styles.actionButtonText}>Send Kode</Text>
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
              onPress={handleStepTwo}
              disabled={isLocalLoading}
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
              onPress={handleStepThree}
              disabled={isLocalLoading}
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
    backgroundColor: COLORS.light_background,
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
    color: COLORS.light_primary,
    marginBottom: 15,
  },
  pageDescription: {
    fontSize: 16,
    color: COLORS.light_primary,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputField: {
    width: "100%",
    height: 45,
    padding: 10,
    marginBottom: 20,
    borderColor: COLORS.light_primary,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  actionButton: {
    width: "100%",
    height: 45,
    backgroundColor: COLORS.light_secondary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: COLORS.light_primary,
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
    color: COLORS.light_primary,
  },
});
