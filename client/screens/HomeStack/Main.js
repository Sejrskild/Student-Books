import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  RefreshControl,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "../../components/HomeStack/Main/Welcome";
import { useAppContext } from "../../context/appContext";
import Feed from "../../components/HomeStack/Main/Feed";

const Main = ({ items, onRefresh, navigation }) => {
  const { user } = useAppContext();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh(); // dette kalder getItems funktionen fra HomeStack
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light_background }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Welcome user={user.user} navigation={navigation} />
        <Feed items={items} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light_background,
  },
  container: {
    backgroundColor: COLORS.light_background,
    flex: 1,
    padding: 18,
  },
});
