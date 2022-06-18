import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/context/useAuth";
import AppNavigation from "./src/routes/AppNavigation";
import defaultTheme from "./src/styles/themes/default";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);

export default function App() {
  const theme = DefaultTheme;

  theme.colors.background = defaultTheme.palette.background;

  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <NavigationContainer theme={theme}>
          <StatusBar translucent style="light" />
          <AppNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
