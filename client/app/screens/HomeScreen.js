import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StyleSheet, SafeAreaView, Button, Text } from "react-native";
import HeaderComponent from "../../components/HomeScreen/HeaderComponent";
import FeaturedBooks2 from "../../components/HomeScreen/FeaturedBooks2";

export default function HomeScreen({ navigation }) {
  const { fetchAllItems, isLoading, token } = useAppContext();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await fetchAllItems();
    setBooks(res);
  };

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <FeaturedBooks2 title="Nyeste 📘" books={books} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
