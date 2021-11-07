import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.center}>
      <Text>This is the best app for personal notes</Text>
      <Text>
        Version <Text style={styles.version}>1.0.0</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  version: {
    fontFamily: "open-bold",
  },
});

export default AboutScreen;
