import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { useFonts } from "expo-font";

export default function App() {

  let [fontsLoaded] = useFonts({
    "open-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return <AppNavigation />;
}
