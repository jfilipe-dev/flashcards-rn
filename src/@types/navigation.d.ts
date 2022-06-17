import { NavigatorScreenParams } from "@react-navigation/native";
import { Collection } from "../services/collections";
import { Card } from "../services/cards";
import { RouteProp } from "@react-navigation/core";

export type DrawerParamList = {
  Home?: undefined;
  CreateOrUpdateCollection?: {
    collection: Collection;
  };
  Cards: {
    collection: Collection;
  };
  CreateOrUpdateCard: {
    collection: Collection;
    card?: Card;
  };
};

export type DrawerRouteParams<T extends keyof DrawerParamList> = RouteProp<
  DrawerParamList,
  T
>;

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
