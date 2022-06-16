import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "../../@types/navigation";
import Home from "../../screens/Home";
import CustomDrawer from "./components/CustomDrawer";
import { drawerHeaderOptions } from "../../components/Header";
import CreateOrUpdateCollection from "../../screens/CreateOrUpdateCollection";

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation: React.FC = () => {
  return (
    <Navigator
      screenOptions={{ ...drawerHeaderOptions, unmountOnBlur: true }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Minhas coleções",
        }}
      />

      <Screen
        name="CreateOrUpdateCollection"
        component={CreateOrUpdateCollection}
        options={{
          headerTitle: "Criar coleção",
        }}
      />
    </Navigator>
  );
};

export default DrawerNavigation;
