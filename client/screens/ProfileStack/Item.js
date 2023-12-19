import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import ImageComponent from "../../components/HomeStack/Item/ImageComponent";
import { AntDesign } from "@expo/vector-icons";

import ItemInfo from "../../components/HomeStack/Item/ItemInfo";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

export default function Item(props) {
  const sheet = React.useRef();
  const { user, handleUpdateUser } = useAppContext();

  console.log(props.route.params.item._id);

  const deleteItem = async () => {
    try {
      const { data, status } = await axios.delete(
        `http://localhost:3000/api/v1/items/${props.route.params.item._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      handleUpdateUser(data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <ImageComponent image={props.route.params.item.image} />
            <ItemInfo book={props.route.params.item} />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sheet.current.open();
                }}
              >
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.btnText}>Slet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <RBSheet
            customStyles={{ sheetContainer: styles.sheet }}
            height={300}
            openDuration={250}
            ref={sheet}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Helt sikker?</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.bodyText}>
                Er du helt sikker at du ønsker
                <Text style={{ fontWeight: "600" }}>at slette dit opslag</Text>?
                {"\n"}
                Det er ikke muligt at gendanne senere.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  deleteItem();
                  sheet.current.close();
                  Alert.alert("Dit opslag er nu slettet.");
                }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Ja, jeg er sikker.</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.bodyGap} />

              <TouchableOpacity
                onPress={() => {
                  sheet.current.close();
                }}
              >
                <View style={styles.btnSecondary}>
                  <Text style={styles.btnSecondaryText}>Nej</Text>
                </View>
              </TouchableOpacity>
            </View>
          </RBSheet>
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
  btnContainer: {
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#ff3c2f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ff3c2f",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
  sheetContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "#efefef",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  body: {
    padding: 24,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: "#0e0e0e",
    marginBottom: 24,
    textAlign: "center",
  },
  bodyGap: {
    marginBottom: 12,
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#dddce0",
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000",
  },
});
