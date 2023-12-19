import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constants";
import axios from "axios";
import RadioButtons from "../../components/SignUp/RadioButtons";

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const handleSubmit = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword ||
      !selectedAvatar
    ) {
      return Alert.alert(
        "Hov ❌",
        "Du mangler at udfylde et eller flere felter"
      );
    }

    if (form.password !== form.confirmPassword) {
      return Alert.alert("Hov ❌", "Dine indtastede passwords er ikke ens");
    }

    if (form.password.length < 6) {
      return Alert.alert(
        "Dit password er lidt til den svage side 😬",
        "Er du sikker på at du vil bruge det her password? Det er lidt kort 🤔",
        [
          {
            text: "Ja",
            onPress: () => {
              handleCreateUser();
            },
          },
          {
            text: "Nej",
            onPress: () => {
              return;
            },
          },
        ]
      );
    }

    handleCreateUser();
  };

  const handleCreateUser = async () => {
    let avatar;

    // "🙎‍♂️",
    // "🙎‍♀️",
    // "🧑",
    // "🐸",
    // "🐶",
    // "🦄",
    // "👽",
    // "🤖",
    // "👾",
    // "🐱",
    // "🦉",
    // "🦁",

    switch (selectedAvatar) {
      case 0:
        avatar = "🙎‍♂️";
        break;
      case 1:
        avatar = "🙎‍♀️";
        break;
      case 2:
        avatar = "🧑";
        break;
      case 3:
        avatar = "🐸";
        break;
      case 4:
        avatar = "🐶";
        break;
      case 5:
        avatar = "🦄";
        break;
      case 6:
        avatar = "👽";
        break;
      case 7:
        avatar = "🤖";
        break;
      case 8:
        avatar = "👾";
        break;
      case 9:
        avatar = "🐱";
        break;
      case 10:
        avatar = "🦉";
        break;
      case 11:
        avatar = "🦁";
        break;
    }

    setIsLocalLoading(true);
    try {
      const { firstName, lastName, email, phone, password } = form;
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          avatar,
        }
      );

      if (response.status === 201) {
        Alert.alert(
          "Bruger oprettet ✅",
          "Din bruger er nu oprettet. Du kan nu logge ind \n Du vil modtage en email med et link til at bekræfte din email inden du kan logge ind."
        );
        navigation.navigate("LoginStack_Main");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Fejl", error);
    } finally {
      setIsLocalLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bliv en del af Student Books</Text>

          <Text style={styles.subtitle}>
            Opret en profil for at tilgå resten af siden!
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <RadioButtons
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Fornavn</Text>

              <TextInput
                onChangeText={(firstName) => setForm({ ...form, firstName })}
                placeholder="Egon"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.firstName}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Efternavn</Text>

              <TextInput
                onChangeText={(lastName) => setForm({ ...form, lastName })}
                placeholder="Olsen"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.lastName}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(email) => setForm({ ...form, email })}
                placeholder="egonolsen01@cbs.dk"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Telefon</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={(phone) => setForm({ ...form, phone })}
                placeholder="25251291"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phone}
                keyboardType="phone-pad"
              />
              <Text style={styles.subLabel}>
                Dit telefonnummer bliver kun delt med interesserede købere.
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Gentag Password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={(confirmPassword) =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword}
              />
            </View>

            <View style={styles.tos}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginStack_Terms")}
              >
                <Text style={styles.tosText}>
                  Ved at oprette en bruger accepterer du vores{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Vilkår og Betingelser
                  </Text>{" "}
                  og{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Privatlivspolitik
                  </Text>
                  .
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLocalLoading}
              >
                <View style={isLocalLoading ? styles.loadingBtn : styles.btn}>
                  <Text style={styles.btnText}>
                    {isLocalLoading ? (
                      <ActivityIndicator size={26} color={"#fff"} />
                    ) : (
                      "Opret bruger"
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginStack_Main");
              }}
            >
              <Text style={styles.formFooter}>
                Har du allerede en bruger?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.light_primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#929292",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.light_primary,
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  subLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#929292",
    marginVertical: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.light_secondary,
    borderColor: COLORS.light_secondary,
  },
  loadingBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.light_primary,
    borderColor: COLORS.light_primary,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
