import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../../constants";

const items = [
  {
    emoji: "🙎‍♂️",
  },
  {
    emoji: "🙎‍♀️",
  },
  {
    emoji: "🧑",
  },
  {
    emoji: "🐸",
  },
  {
    emoji: "🐶",
  },
  {
    emoji: "🦄",
  },
  {
    emoji: "👽",
  },
  {
    emoji: "🤖",
  },
  {
    emoji: "👾",
  },
  {
    emoji: "🐱",
  },
  {
    emoji: "🦉",
  },
  {
    emoji: "🦁",
  },
];

export default function RadioButtons({ selectedAvatar, setSelectedAvatar }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Vælg en avatar</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.content}
          showsHorizontalScrollIndicator={false}
        >
          {items.map(({ emoji, name }, index) => {
            const isActive = selectedAvatar === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedAvatar(index);
                }}
              >
                <View style={styles.radio}>
                  <View style={styles.radioImgWrapper}>
                    <View
                      style={[
                        styles.radioOverflow,
                        isActive && { display: "flex" },
                      ]}
                    >
                      <FontAwesome color="#fff" name="check" size={20} />
                    </View>

                    <Text style={styles.radioImg}>{emoji}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.light_primary,
    marginBottom: 8,
  },
  radio: {
    position: "relative",
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "column",
    alignItems: "center",
  },
  radioOverflow: {
    display: "none",
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.light_secondary,
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    zIndex: 9999,
  },
  radioImg: {
    fontSize: 45, // Set the font size according to your preference
    height: 60,
    width: 60,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 9999,
  },
  radioImgWrapper: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  radioName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1d1d1d",
    marginTop: 6,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
