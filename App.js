import "react-native-gesture-handler";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./src/store";
import { bootstrap } from "./src/bootstrap";
//TODO: add format date func

export default function App() {
  const [isReady, setIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    "open-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={console.log}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
