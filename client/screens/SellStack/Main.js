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
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import InputField from "../../components/SellStack/Main/InputField";

import { useAppContext } from "../../context/appContext";
import { COLORS } from "../../constants";
import axios from "axios";

export default function TradingScreen({ navigation, route }) {
  const { user, handleUpdateUser } = useAppContext();
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
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const getTitleFromImage = async (base64Image) => {
    setIsLocalLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/items/get-text-from-image",
        {
          image: base64Image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      if (data.type === "success") {
        setForm((prev) => ({ ...prev, title: data.text }));
      }
    } catch (error) {
      Alert.alert("Hov ❌", "Der skete en fejl. Prøv igen. 🙏🏻 ");
    } finally {
      setIsLocalLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.photo) {
      setForm({ ...form, image: route.params.photo });
      getTitleFromImage(route.params.photo);
    }
  }, [route.params?.photo]);

  const generateDescription = async () => {
    const {
      title,
      author,
      price,
      image,
      condition,
      location,
      description,
      fieldOfStudy,
    } = form;

    if (
      !title ||
      !author ||
      !price ||
      !image ||
      !condition ||
      !location ||
      !fieldOfStudy
    ) {
      Alert.alert(
        "Hov ❌",
        "Du mangler at udfylde et eller flere felter. Det hjælper vores robot med at generere en nøjagtig beskrivelse. 🙏🏻 "
      );
      return;
    }

    setIsLocalLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/items/generate-description",
        {
          title,
          author,
          price,
          image,
          condition,
          location,
          description,
          fieldOfStudy,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.type === "success") {
        setForm((prev) => ({ ...prev, description: data.description }));
      } else {
        Alert.alert("Hov ❌", "Der skete en fejl. Prøv igen. 🙏🏻 ");
      }
      setIsLocalLoading(false);
    } catch (error) {
      Alert.alert("Hov ❌", "Der skete en fejl. Prøv igen. 😅 ");
      setIsLocalLoading(false);
    }
    setIsLocalLoading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 4],
      base64: true,
      quality: 0.2,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.base64 });
      getTitleFromImage(result.base64);
    }
  };

  const handleSubmit = async () => {
    const {
      title,
      author,
      price,
      image,
      condition,
      location,
      description,
      fieldOfStudy,
    } = form;

    if (
      !title ||
      !author ||
      !price ||
      !image ||
      !condition ||
      !location ||
      !description ||
      !fieldOfStudy
    ) {
      Alert.alert("Hov ❌", "Du mangler at udfylde et eller flere felter. 🙏🏻 ");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/items",
        {
          title,
          author,
          price,
          image,
          condition,
          location,
          description,
          fieldOfStudy,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.type === "success") {
        handleUpdateUser(data.user);
        Alert.alert(
          "Succes ✅",
          "Din bog er nu til salg. 🎉 - Gå til forside",
          [
            {
              text: "Wuuhuu 🎉",
              onPress: () =>
                navigation.navigate("Home", {
                  refreshItems: Math.random() * 1,
                }),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Hov ❌", "Der skete en fejl. Prøv igen. 🙏🏻 ");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sælg din Bog 📙</Text>
          <Text style={styles.subtitle}>
            Indtast så mange oplysninger på din bog som muligt, for at give
            køberen et godt indblik.
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
              disabled={isLocalLoading}
            >
              <Entypo name="images" size={24} color="black" />
              <Text style={styles.imagePickerText}>
                Vælg eksisterende billede
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imagePickerButton}>
              <Entypo name="camera" size={24} color="black" />
              <Text
                style={styles.imagePickerText}
                onPress={() => navigation.navigate("Sell_Camera")}
              >
                Tag et nyt billede
              </Text>
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
                isLocalLoading
                  ? "Henter bogens titel ud fra billedet.."
                  : "Titel"
              }
              editable={!isLocalLoading}
              selectTextOnFocus={!isLocalLoading}
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
              onChangeText={(description) => setForm({ ...form, description })}
              multiline={true}
              loading={isLocalLoading}
            />

            <TouchableOpacity
              style={styles.descriptionGenerator}
              onPress={generateDescription}
              disabled={isLocalLoading}
            >
              <FontAwesome5
                name="robot"
                size={24}
                color={COLORS.light_primary}
              />
              <Text style={styles.generatorText}>
                {isLocalLoading
                  ? "Genererer beskrivelse.."
                  : "Generer beskrivelse"}
              </Text>
            </TouchableOpacity>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sælg ✅</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
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
    color: COLORS.light_primary,
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
    backgroundColor: COLORS.light_primary,
    borderColor: COLORS.light_primary,
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
    width: 150,
    height: 150,
    marginTop: 8,
    resizeMode: "contain",
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
