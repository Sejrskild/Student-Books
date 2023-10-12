import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React from "react";
import { useAppContext } from "../../context/appContext";
import colors from "../../assets/colors";
import removeStorage from "../../utilities/removeStorage";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

const HeaderComponent = () => {
  const { user, isLoading } = useAppContext();

  return (
    <View style={styles.top}>
      {isLoading ? (
        <View>
          <View style={styles.header}>
            <Placeholder Animation={Fade}>
              <PlaceholderMedia Animation={Fade} style={{ borderRadius: 25 }} />
            </Placeholder>
          </View>
          <View style={styles.greeting}>
            <Placeholder Animation={Fade}>
              <PlaceholderLine
                width={80}
                height={20}
                style={styles.greetingTitle}
              />
              <PlaceholderLine width={60} style={styles.greetingText} />
            </Placeholder>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <Image
                alt=""
                source={{
                  uri:
                    user?.image ||
                    "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                removeStorage();
              }}
            >
              <FeatherIcon color={colors.PRUSSIAN_BLUE} name="bell" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.greeting}>
            <Text style={styles.greetingTitle}>Hej {user?.firstName} 👋</Text>
            <Text style={styles.greetingText}>
              Du har ingen aktive salgsopslag.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.search}>
        <TextInput
          placeholder="Hvad søger du efter?"
          placeholderTextColor={colors.PRUSSIAN_BLUE}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <View style={styles.searchFloating}>
          <TouchableOpacity>
            <View style={styles.searchButton}>
              <FeatherIcon name="search" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  greeting: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    marginBottom: 12,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a2525",
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a2525",
    marginTop: 8,
  },
  searchInput: {
    height: 56,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 16,
    color: "#1a2525",
    fontSize: 18,
    borderRadius: 999,
  },
  searchFloating: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  searchButton: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: colors.PRUSSIAN_BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
});
