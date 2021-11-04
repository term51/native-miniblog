import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";
import { THEME } from "../theme";
import { Platform } from "react-native";

const PostStack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <PostStack.Navigator>
        <PostStack.Screen
          name={"Main"}
          options={{
            title: "My blog",
            headerStyle: {
              backgroundColor:
                Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
            },
            headerTintColor: // text color
              Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
          }}
          component={MainScreen}
        />
        <PostStack.Screen
          name={"Post"}
          options={{
            title: "Post #42",
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR,
            },
            headerTintColor: "#fff",
          }}
          component={PostScreen}
        />
      </PostStack.Navigator>
    </NavigationContainer>
  );
};
