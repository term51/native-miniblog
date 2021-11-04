import React from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { DATA } from "../data";
import Post from "../components/Post";

// В пропсы попадает объект navigation, с методами навигации
const MainScreen = ({ navigation }) => {
  const goToPost = () => {
    // Перенаправляет на экран, 1й-параметр name из PostStack.Screen, AppNavigation. 2й- параметры
    navigation.navigate("Post");
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={DATA}
        keyExtractor={(post) => post.id.toString()} // откуда брать уникальные значения key
        renderItem={({ item }) => <Post post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});

export default MainScreen;
