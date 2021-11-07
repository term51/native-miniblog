import React, { useEffect } from "react";
import Post from "../components/Post";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../store/actions/post";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../theme";

// В пропсы попадает объект navigation, с методами навигации
const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleOpenPost = (post) => {
    // Перенаправляет на экран, 1й-параметр name из PostStack.Screen, AppNavigation. 2й- props
    navigation.navigate("Post", {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color={THEME.MAIN_COLOR} />
      </View>
    );
  }

  return <PostList data={allPosts} onOpen={handleOpenPost} />;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
