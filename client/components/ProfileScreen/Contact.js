import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../assets/colors";

const Contact = ({ user }) => {
  const { phone_code, phone } = user;

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${phone_code}${phone}`);
        }}
        style={{ flex: 1, paddingHorizontal: 6 }}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Ring</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`sms:${user.phone_code}${user.phone}`);
        }}
        style={{ flex: 1, paddingHorizontal: 6 }}
      >
        <View style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Skriv SMS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: colors.PRUSSIAN_BLUE,
  },
  btnPrimary: {
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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.PRUSSIAN_BLUE,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
  },
});
