import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";
import { THEME } from "../theme";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import BookedScreen from "../screens/BookedScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateScreen from "../screens/CreateScreen";
import AboutScreen from "../screens/AboutScreen";

const generalScreenOptions = (navigation) => ({
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
  },
  // text color
  headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
  // Menu button
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={"Toggle Drawer"}
        iconName={"ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
  // Create new post button
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={"Take photo"}
        iconName={"ios-camera"}
        onPress={() => navigation.navigate("CreatePage")}
      />
    </HeaderButtons>
  ),
});

const mainScreenOptions = ({ navigation }) => ({
  title: "My blog",
  ...generalScreenOptions(navigation),
});

const aboutScreenOptions = ({ navigation }) => ({
  title: "About",
  ...generalScreenOptions(navigation),
});

const createScreenOptions = ({ navigation }) => ({
  title: "Create a post",
  ...generalScreenOptions(navigation),
});

const bookedScreenOptions = ({ navigation }) => ({
  title: "Favourites",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
  },
  // text color
  headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={"Toggle Drawer"}
        iconName={"ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

const postScreenOptions = ({ navigation, route }) => {
  const iconName = route.params.booked ? "ios-star" : "ios-star-outline";
  const handleToggle = route.params.handleToggle;

  return {
    title: `Post ${route.params.postId} from ${new Date(
      route.params.date
    ).toLocaleDateString()}`,
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR,
    },
    headerTitleStyle: {
      width: "100%",
    },
    headerTintColor: "#fff",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title={"Take photo"}
          iconName={iconName}
          onPress={() => handleToggle()}
        />
      </HeaderButtons>
    ),
  };
};

const PostStack = createStackNavigator();

// обертка для экранов
function PostStackScreen() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name={"Main"}
        options={mainScreenOptions}
        component={MainScreen}
      />
      <PostStack.Screen
        name={"Post"}
        // опции можно задать просто объектом или функцией, что принимает те же props, что и Screen
        options={postScreenOptions}
        component={PostScreen}
      />
    </PostStack.Navigator>
  );
}

const BookedStack = createStackNavigator();

// обертка для экранов
function BookedStackScreen() {
  return (
    <BookedStack.Navigator>
      <BookedStack.Screen
        name={"Booked"}
        options={bookedScreenOptions}
        component={BookedScreen}
      />
      <BookedStack.Screen
        name={"Post"}
        options={postScreenOptions}
        component={PostScreen}
      />
    </BookedStack.Navigator>
  );
}

const MaterialTab = createMaterialBottomTabNavigator();
// Настраиваем главную страницу и табы в ней
const HomeNavigator = () => {
  return (
    <MaterialTab.Navigator
      activeColor="#fff"
      inactiveColor="#8F9290"
      barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
      shifting={true}
    >
      <MaterialTab.Screen
        name={"Posts group"}
        component={PostStackScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: THEME.MAIN_COLOR,
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-albums" color={color} size={20} />
          ),
        }}
      />
      <MaterialTab.Screen
        name={"Booked group"}
        component={BookedStackScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: THEME.MAIN_COLOR,
          tabBarLabel: "Favorites posts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"ios-star"} color={color} size={20} />
          ),
        }}
      />
    </MaterialTab.Navigator>
  );
};

const AboutStack = createStackNavigator();
// Настраиваем страницу About
const AboutNavigator = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name={"About"}
        options={aboutScreenOptions}
        component={AboutScreen}
      />
    </AboutStack.Navigator>
  );
};

const CreateStack = createStackNavigator();
// Настраиваем страницу Create
const CreateNavigator = () => {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name={"Create"}
        options={createScreenOptions}
        component={CreateScreen}
      />
    </CreateStack.Navigator>
  );
};

const DrawerMain = createDrawerNavigator();
// передаем обертки экранов как компоненты в DrawerMain - Screen
export const AppNavigation = () => (
  <NavigationContainer>
    <DrawerMain.Navigator>
      <DrawerMain.Screen
        name={"HomePage"}
        options={{
          drawerActiveTintColor: THEME.MAIN_COLOR,
          drawerLabelStyle: {
            fontFamily: "open-regular",
          },
          headerShown: false,
          drawerLabel: "Home page",
          drawerIcon: ({ color, size }) => (
            <Ionicons name={"ios-home"} color={color} size={size} />
          ),
        }}
        component={HomeNavigator}
      />
      <DrawerMain.Screen
        name={"AboutPage"}
        options={{
          drawerActiveTintColor: THEME.MAIN_COLOR,
          drawerLabelStyle: {
            fontFamily: "open-regular",
          },
          headerShown: false,
          drawerLabel: "About page",
          drawerIcon: ({ color, size }) => (
            <Ionicons name={"ios-home"} color={color} size={size} />
          ),
        }}
        component={AboutNavigator}
      />
      <DrawerMain.Screen
        name={"CreatePage"}
        options={{
          drawerActiveTintColor: THEME.MAIN_COLOR,
          drawerLabelStyle: {
            fontFamily: "open-regular",
          },
          headerShown: false,
          drawerLabel: "Create page",
          drawerIcon: ({ color, size }) => (
            <Ionicons name={"ios-home"} color={color} size={size} />
          ),
        }}
        component={CreateNavigator}
      />
    </DrawerMain.Navigator>
  </NavigationContainer>
);
