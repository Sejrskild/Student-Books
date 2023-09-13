import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

const CountrySelection = ({
  phone_code,
  setFormData,
  countryFlag,
  setCountryFlag,
}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={styles.font}>
          {countryFlag} <AntDesign name="down" />
        </Text>
      </TouchableOpacity>
      <CountryPicker
        showOnly={["DK", "SE", "NO"]}
        show={show}
        lang="en"
        searchMessage="Søg efter dit land.."
        inputPlaceholder="Søg efter dit land.."
        popularCountries={["DK"]}
        enableModalAvoiding={true}
        pickerButtonOnPress={(item) => {
          setFormData({ ...phone_code, phone_code: item.dial_code });
          setCountryFlag(item.flag);
          setShow(false);
        }}
      />
    </View>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
  },
  font: {
    fontSize: 20,
  },
});
