import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "../../@types/navigation";
import Home from "../../screens/Home";
import CustomDrawer from "./components/CustomDrawer";
import { drawerHeaderOptions } from "../../components/Header";

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation: React.FC = () => {
  return (
    <Navigator
      screenOptions={drawerHeaderOptions}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Minhas coleções",
        }}
      />
    </Navigator>
  );
};

export default DrawerNavigation;
