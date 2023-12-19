import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";

import ImageComponent from "../../components/HomeStack/Item/ImageComponent";
import UserProfile from "../../components/HomeStack/Item/UserProfile";
import ItemInfo from "../../components/HomeStack/Item/ItemInfo";
import Contact from "../../components/HomeStack/Item_Profile/Contact";

export default function Item(props) {
  const {
    image,
    location,
    price,
    title,
    description,
    stand,
    soldBy: user,
  } = props.route.params.item;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <ImageComponent image={image} />
            <UserProfile
              navigation={props.navigation}
              user={user}
              items={user.items}
            />
            <Contact user={user} />
            <ItemInfo book={props.route.params.item} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
