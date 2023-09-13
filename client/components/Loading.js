import { ActivityIndicator, SafeAreaView, Text } from "react-native";

export default Loading = () => {
  <SafeAreaView
    style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
  >
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
  </SafeAreaView>;
};
