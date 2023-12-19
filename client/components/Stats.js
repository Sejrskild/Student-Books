import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { relativeTime } from "../utils/moment";

export default function Stats({ createdAt, rating, items, isProfile }) {
  const time = relativeTime(createdAt);

  return (
    <View style={isProfile ? styles.containerPadding : null}>
      <View style={styles.stats}>
        {[
          {
            label: "Salgsopslag",
            icon: "book-open",
            color: "#C9C9C9",
            value: items || 0,
          },
          {
            label: "Rating",
            icon: "star",
            color: "#FF9801",
            value: rating || 0,
          },
          {
            label: "Oprettet",
            icon: "clock",
            color: "#C9C9C9",
            value: time,
            multiline: true,
          },
        ].map(({ label, value, icon, color }, index) => (
          <View
            key={index}
            style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}
          >
            <Text style={styles.statsItemText}>{label}</Text>

            <View style={styles.statsItemContent}>
              <FeatherIcon color={color} name={icon} size={16} />

              <Text style={styles.statsItemValue}>{value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPadding: {
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  stats: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
    flexDirection: "row",
  },
  statsItem: {
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  statsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statsItemText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#323142",
    opacity: 0.7,
    marginBottom: 4,
  },
  statsItemValue: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 24,
    color: "#323142",
    marginLeft: 4,
  },
});
