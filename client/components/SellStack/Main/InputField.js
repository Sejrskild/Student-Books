import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  loading,
  ...props
}) => (
  <View style={styles.input}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      placeholder={
        loading ? "Prøver at danne en fed beskrivelse for dig.." : placeholder
      }
      placeholderTextColor="#6b7280"
      editable={!loading}
      style={
        props.multiline
          ? [styles.inputControl, { height: 100 }]
          : styles.inputControl
      }
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
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

export default InputField;
