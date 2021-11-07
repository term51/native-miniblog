import React from "react";
import { StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { THEME } from "../theme";
import { Ionicons } from "@expo/vector-icons";

const AppHeaderIcon = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR}
    />
  );
};

const styles = StyleSheet.create({});

export default AppHeaderIcon;
