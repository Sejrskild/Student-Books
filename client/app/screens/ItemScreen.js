import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import ImageComponent from "../../components/ItemScreen/ImageComponent";
import UserProfile from "../../components/ItemScreen/UserProfile";
import ItemInfo from "../../components/ItemScreen/ItemInfo";
import Header from "../../components/Header";
import { useAppContext } from "../../context/appContext";
import UserProfileSkeleton from "../../components/ItemScreen/UserProfileSkeleton";

export default function ItemScreen(props) {
  const { getUserInformation } = useAppContext();
  const [user, setUser] = useState(null);
  const { image, location, price, title, description, stand, soldBy } =
    props.route.params.book;

  const getUser = async () => {
    const user = await getUserInformation(soldBy);
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <Header props={{ title }} navigation={props.navigation} />

          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <ImageComponent image={image} />
            {user ? (
              <UserProfile
                navigation={props.navigation}
                user={user.user}
                items={user.items}
              />
            ) : (
              <UserProfileSkeleton />
            )}

            <ItemInfo
              book={{ image, location, price, title, description, stand }}
            />
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
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  photos: {
    marginTop: 12,
    position: "relative",
    height: 240,
    overflow: "hidden",
    borderRadius: 12,
  },
  photosTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  photosTopItem: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photosPagination: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#000",
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fbfbfb",
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: 240,
  },
  picker: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 13,
    fontWeight: "500",
  },
  pickerAction: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerActionText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#4c6cfd",
  },
  info: {
    marginTop: 12,
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "#000000",
    marginBottom: 6,
  },
  infoRating: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoRatingLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    marginRight: 2,
  },
  infoRatingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8e8e93",
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: "#8e8e93",
  },
  stats: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderColor: "#fff",
  },
  statsItem: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: "#fff",
  },
  statsItemText: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    color: "#8e8e93",
    marginBottom: 4,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
  },
  overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  overlayContentPriceBefore: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#8e8e93",
    marginRight: 4,
    textDecorationLine: "line-through",
    textDecorationColor: "#8e8e93",
    textDecorationStyle: "solid",
  },
  overlayContentPrice: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "700",
    color: "#000",
  },
  overlayContentTotal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#4c6cfd",
    letterSpacing: -0.07,
    textDecorationLine: "underline",
    textDecorationColor: "#4c6cfd",
    textDecorationStyle: "solid",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
