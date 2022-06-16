import { NavigatorScreenParams } from "@react-navigation/native";

export type DrawerParamList = {
  Home?: undefined;
};

export type AppStackParamList = {
  Login: undefined;
  Register: undefined;
  InitialLoading?: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
