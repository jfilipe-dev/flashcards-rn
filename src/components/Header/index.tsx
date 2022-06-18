import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import HeaderBackground from "./Background";

export const stackHeaderOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  headerStatusBarHeight: getStatusBarHeight(true) + 9,
  headerLeft: () => null,
  headerRight: () => null,
  headerBackground: () => <HeaderBackground />,
};

export const drawerHeaderOptions: DrawerNavigationOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  drawerType: "front",
  headerTintColor: "#fff",
  headerStatusBarHeight:
    Platform.OS === "android"
      ? getStatusBarHeight()
      : getStatusBarHeight(true) + 9,
  headerBackground: () => <HeaderBackground drawer />,
};
