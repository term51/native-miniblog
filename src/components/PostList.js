import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Post from "./Post";

const PostList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>There are no posts yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(post) => post.id.toString()} // func for get uniq key
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    textAlign: "center",
    fontFamily:'open-regular',
    marginVertical:10,
    fontSize:18
  },
});

export default PostList;
