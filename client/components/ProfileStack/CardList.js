import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { relativeTime } from "../../utils/moment";
import { useNavigation } from "@react-navigation/native";

const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.75, 400);

export default function CardList({ items, loading, refresh }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFCFF" }}>
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Mine Salgsopslag</Text>

            <TouchableOpacity
              onPress={() => {
                refresh();
              }}
            >
              <AntDesign
                name="reload1"
                size={20}
                color={COLORS.light_secondary}
              />
            </TouchableOpacity>
          </View>

          {items && items.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {items.map(
                (
                  {
                    image,
                    title,
                    author,
                    createdAt,
                    price,
                    location,
                    description,
                    _id,
                  },
                  index
                ) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Profile_Item", {
                        item: {
                          image,
                          title,
                          author,
                          createdAt,
                          price,
                          location,
                          description,
                          _id,
                        },
                      });
                    }}
                  >
                    <View style={styles.card}>
                      <View style={styles.cardTop}>
                        <View style={styles.cardIcon}>
                          <Image
                            style={styles.cardImage}
                            source={{
                              uri: `data:image/png;base64,${image}`,
                            }}
                          />
                        </View>

                        <View style={styles.cardBody}>
                          <Text style={styles.cardTitle}>{title}</Text>

                          <Text style={styles.cardSubtitle}>{author}</Text>
                        </View>
                      </View>

                      <View style={styles.cardFooter}>
                        <Text style={styles.cardFooterText}>{price} kr.</Text>

                        <Text style={styles.cardFooterText}>
                          Oprettet {relativeTime(createdAt)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          ) : (
            <View style={{ padding: 24 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#778599" }}
              >
                Du har ikke oprettet nogle salgsopslag endnu
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
    color: COLORS.light_primary,
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff1f5",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    color: "#121a26",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  list: {
    marginBottom: 24,
  },
});
