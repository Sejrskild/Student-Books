import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from "rn-placeholder";

export default function UserProfileSkeleton() {
  return (
    <Placeholder
      Left={() => (
        <View style={styles.roundedPlaceholder}>
          <PlaceholderMedia style={styles.placeholderMedia} />
        </View>
      )}
      Animation={Fade}
      style={styles.container}
    >
      <PlaceholderLine width={28} />
      <PlaceholderLine width={50} />
      <PlaceholderLine width={60} />
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  roundedPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 16,
  },
  placeholderMedia: {
    width: 50,
    height: 50,
  },
});
