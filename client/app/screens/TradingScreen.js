import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Loading from "../../components/Loading.js";
import CameraComponent from "../../components/TradingScreen/CameraComponent.js";

import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";
import InputField from "../../components/TradingScreen/InputField.js";

export default function TradingScreen({ navigation }) {
  const { createItem, generateDescriptionWithAI, isLoading, getTextWithAI } =
    useAppContext();
  const [displayCamera, setDisplayCamera] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    condition: "🤩",
    location: "",
    fieldOfStudy: "",
    semester: "",
    description: "",
  });

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const title = await getTextWithAI(result.base64);
    setForm({ ...form, image: result.base64, title });
  };

  const handleTakePicture = async (base64) => {
    setDisplayCamera(false);
    const title = await getTextWithAI(base64);

    setForm({ ...form, image: base64, title });
  };

  const cancelCamera = () => {
    setDisplayCamera(false);
  };

  const generateDescription = async (form) => {
    const message = await generateDescriptionWithAI(form);
    setForm({ ...form, description: message });
  };

  const isValidCondition = (condition) =>
    ["😭", "😕", "😄", "🤩"].includes(condition);

  const handleCreateItem = () => {
    if (form.title && form.price && isValidCondition(form.condition)) {
      try {
        createItem(form);
        setForm({
          title: "",
          author: "",
          price: "",
          image: "",
          condition: "🤩",
          location: "",
          fieldOfStudy: "",
          semester: "",
          description: "",
        });
        Alert.alert(
          "Bogen er nu til salg! 🥳",
          "Andre studerende kan nu se din bog og kontakte dig, hvis de er interesseret.",
          [{ text: "OK", onPress: () => navigation.navigate("Home") }]
        );
      } catch (error) {
        Alert.alert("Der skete en fejl", error.response.data);
      }
    }
  };

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setDisplayCamera(true);
    } else {
      Alert.alert(
        "Kunne ikke få adgang til kameraet",
        "Du skal give adgang til kameraet for at kunne tage et billede af bogen."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {displayCamera ? (
        <CameraComponent
          onTakePicture={handleTakePicture}
          onBack={cancelCamera}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sælg din Bog 📘</Text>
            <Text style={styles.subtitle}>
              Indtast så mange oplysninger på din bog som muligt, for at give
              køberen et godt indblik.
            </Text>
          </View>

          <KeyboardAwareScrollView>
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={pickImageFromGallery}
              >
                <Entypo name="images" size={24} color="black" />
                <Text style={styles.imagePickerText}>
                  Vælg eksisterende billede
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={openCamera}
              >
                <Entypo name="camera" size={24} color="black" />
                <Text style={styles.imagePickerText}>Tag et nyt billede</Text>
              </TouchableOpacity>
              {form.image && (
                <Image
                  source={{ uri: `data:image/png;base64,${form.image}` }}
                  style={styles.image}
                />
              )}
            </View>
            <View style={styles.form}>
              <InputField
                label="Title"
                placeholder={
                  isLoading ? "Prøver at finde titlen..." : "Titel på bogen"
                }
                value={form.title}
                onChangeText={(title) => setForm({ ...form, title })}
              />

              <InputField
                label="Forfatter"
                placeholder="Forfatterens navn"
                value={form.author}
                onChangeText={(author) => setForm({ ...form, author })}
              />
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Bogens stand</Text>
                <Picker
                  selectedValue={form.condition}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, _) =>
                    setForm({ ...form, condition: itemValue })
                  }
                >
                  <Picker.Item label="🤩" value="🤩" />
                  <Picker.Item label="😄" value="😄" />
                  <Picker.Item label="😕" value="😕" />
                  <Picker.Item label="😭" value="😭" />
                </Picker>
              </View>
              <InputField
                label="Pris i kr."
                placeholder="129"
                value={form.price}
                onChangeText={(price) => setForm({ ...form, price })}
                keyboardType="numeric"
              />

              <InputField
                label="Område"
                placeholder="København S, København Ø..."
                value={form.location}
                onChangeText={(location) => setForm({ ...form, location })}
              />

              <InputField
                label="Studieretning"
                placeholder="Din studieretning"
                value={form.fieldOfStudy}
                onChangeText={(fieldOfStudy) =>
                  setForm({ ...form, fieldOfStudy })
                }
              />

              <InputField
                label="Semester"
                placeholder="Dit Semester"
                value={form.semester}
                onChangeText={(semester) => setForm({ ...form, semester })}
              />

              <InputField
                label="Beskrivelse"
                placeholder="Beskriv lidt om bogen.."
                value={form.description}
                onChangeText={(description) =>
                  setForm({ ...form, description })
                }
                multiline={true}
              />
              <TouchableOpacity
                style={styles.descriptionGenerator}
                disabled={isLoading}
                onPress={() => generateDescription(form)}
              >
                <FontAwesome5
                  name="robot"
                  size={24}
                  color={colors.PRUSSIAN_BLUE}
                />
                <Text style={styles.generatorText}>
                  {isLoading
                    ? "Bib Bub - Genererer Beskrivelse..."
                    : "Lad Robert Generere en Beskrivelse"}
                </Text>
              </TouchableOpacity>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleCreateItem}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sælg ✅</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      )}
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#929292",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.PRUSSIAN_BLUE,
    borderColor: colors.PRUSSIAN_BLUE,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  pickerStyle: {
    // height: 44,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    color: "#222",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginTop: 8,
  },
  imagePickerContainer: {
    marginBottom: 16,
    marginTop: 16,
    alignItems: "center",
  },

  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },

  imagePickerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginLeft: 8,
  },
  descriptionGenerator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },

  generatorText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginLeft: 8,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
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
});
