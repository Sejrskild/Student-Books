import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedItem from "./FeedItem";

const Feed = ({ items }) => {
  return (
    <View style={styles.feedContainer}>
      <View style={styles.feedItems}>
        {items.map((item) => {
          return <FeedItem key={item._id} item={item} />;
        })}
      </View>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  feedContainer: {
    marginTop: 20,
  },
  feedItems: {
    padding: 0,
  },
});
