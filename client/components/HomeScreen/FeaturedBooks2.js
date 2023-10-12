import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { useAppContext } from "../../context/appContext";

const FeaturedBooksSkeleton = () => {
  return (
    <Placeholder
      Left={() => <PlaceholderMedia style={styles.placeholderMedia} />}
      Animation={Fade}
      style={styles.card}
    >
      <View style={styles.cardBody}>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={50} />
        <PlaceholderLine width={50} />
        <PlaceholderMedia
          style={
            ([styles.btn], { backgroundColor: "white", width: 100, height: 30 })
          }
        />
      </View>
    </Placeholder>
  );
};

export default function FeaturedBooks({ books, title, navigation }) {
  const { isLoading } = useAppContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, index) => <FeaturedBooksSkeleton key={index} />)
        : books.map((book, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("HomeScreenStack__Item", { book });
              }}
            >
              <View style={styles.card}>
                <Image
                  alt=""
                  resizeMode="cover"
                  source={{ uri: `data:image/png;base64,${book.image}` }}
                  style={styles.cardImg}
                />

                <View style={styles.cardBody}>
                  <Text>
                    <Text style={styles.cardTitle}>{book.title}</Text>{" "}
                  </Text>

                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <FontAwesome
                        color={colors.BABY_BLUE}
                        name="location-arrow"
                        size={10}
                      />

                      <Text style={styles.cardRowItemText}>
                        {book.location}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cardPrice}>
                    <Text style={styles.cardPriceValue}>
                      {book.price.toLocaleString("da-DK", {
                        style: "currency",
                        currency: "DKK",
                      })}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HomeScreenStack__Item", { book });
                    }}
                  >
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Læs mere</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      {books.map((book, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("HomeScreenStack__Item", { book });
            }}
          >
            <View style={styles.card}>
              <Image
                alt=""
                resizeMode="cover"
                source={{ uri: `data:image/png;base64,${book.image}` }}
                style={styles.cardImg}
              />

              <View style={styles.cardBody}>
                <Text>
                  <Text style={styles.cardTitle}>{book.title}</Text>{" "}
                </Text>

                <View style={styles.cardRow}>
                  <View style={styles.cardRowItem}>
                    <FontAwesome
                      color={colors.BABY_BLUE}
                      name="location-arrow"
                      size={10}
                    />

                    <Text style={styles.cardRowItemText}>{book.location}</Text>
                  </View>
                </View>

                <Text style={styles.cardPrice}>
                  <Text style={styles.cardPriceValue}>
                    {book.price.toLocaleString("da-DK", {
                      style: "currency",
                      currency: "DKK",
                    })}
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomeScreenStack__Item", { book });
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Læs mere</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.PRUSSIAN_BLUE,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  cardImg: {
    width: 120,
    height: 154,
    borderRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173153",
    marginRight: 8,
  },
  cardAirport: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5f697d",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -8,
    flexWrap: "wrap",
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#5f697d",
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "500",
    color: "#5f697d",
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: "700",
    color: "#173153",
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: "bold",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: "#173153",
    borderColor: "#173153",
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#fff",
  },
  placeholderMedia: {
    width: 120,
    height: 154,
    borderRadius: 12,
  },
});
