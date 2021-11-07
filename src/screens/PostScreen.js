import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { removePost, toggleBooked } from "../store/actions/post";

const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const postId = route.params.postId;

  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );

  const post = useSelector((state) =>
    state.post.allPosts.find((p) => p.id === postId)
  );

  const handleToggle = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  useEffect(() => {
      navigation.setParams({ booked });
  }, [booked]);

  useEffect(() => {
    if (post) {
      navigation.setParams({ handleToggle });
    }
  }, [handleToggle]);

  const handleRemove = () => {
    Alert.alert(
      "Post deleting",
      `Are you sure you want to delete the post?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress() {
            navigation.navigate("Main");
            dispatch(removePost(postId));
          },
        },
      ],
      { cancelable: false } // клик по фону вокруг модального окна не закроет его
    );
  };

  if (!post) {
    return null;
  }

  return (
    <ScrollView style={styles.center}>
      <Image style={styles.image} source={{ uri: post.img }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        onPress={handleRemove}
        title={"Delete"}
        color={THEME.DANGER_COLOR}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});

export default PostScreen;
