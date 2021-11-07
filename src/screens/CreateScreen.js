import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { THEME } from "../theme";
import { useDispatch } from "react-redux";
import { addPost } from "../store/actions/post";
import PhotoPicker from "../components/PhotoPicker";

const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const handleSave = () => {
    const post = {
      img: imgRef.current,
      text: text,
      date: new Date().toJSON(),
      booked: false,
    };

    dispatch(addPost(post));
    navigation.navigate("Main");
  };

  const handlePhotoPick = (uri) => {
    imgRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create a new post</Text>
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            style={styles.textarea}
            placeholder={"Input post's test"}
          />
          <PhotoPicker onPick={handlePhotoPick} />
          <Button
            title={"Create a post"}
            color={THEME.MAIN_COLOR}
            onPress={handleSave}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "open-regular",
    marginVertical: 10,
    textAlign: "center",
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});

export default CreateScreen;
