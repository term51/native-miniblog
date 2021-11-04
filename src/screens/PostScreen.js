import React from "react";
import { View, StyleSheet, Text } from "react-native";

const PostScreen = () => {
   return (
      <View style={styles.center}>
         <Text>PostScreen</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default PostScreen;
