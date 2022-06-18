import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { AppStackParamList } from "../../@types/navigation";
import { stackHeaderOptions } from "../../components/Header";
import Logo from "../../components/Header/Logo";
import InitialLoading from "../../screens/InitialLoading";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import DrawerNavigation from "../DrawerNavigation";

const { Navigator, Group, Screen } = createStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Screen name="InitialLoading" component={InitialLoading} />
      <Screen name="Login" component={Login} />
      <Screen name="Drawer" component={DrawerNavigation} />
      <Group
        screenOptions={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          ...stackHeaderOptions,
          headerMode: "screen",
        }}
      >
        <Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: "",
            headerLeft: () => <Logo />,
          }}
        />
      </Group>
    </Navigator>
  );
};

export default AppNavigation;
