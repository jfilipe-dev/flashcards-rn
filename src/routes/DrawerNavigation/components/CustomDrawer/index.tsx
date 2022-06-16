import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../../../context/useAuth";
import { Container, UserName } from "./styles";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { palette } = useTheme();
  const { navigate, reset } = useNavigation();

  const { currentUser, logout } = useAuth();

  const name = props.state.routes[props.state.index].name;

  const handleLogout = () => {
    reset({
      routes: [{ name: "Login" }],
    });

    logout();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ backgroundColor: palette.background }}
    >
      <Container />
      <UserName>{currentUser?.email}</UserName>

      <DrawerItem
        label="Minhas coleções"
        activeTintColor={palette.white}
        focused={name === "Home"}
        icon={() => (
          <Entypo name="add-to-list" size={24} color={palette.white} />
        )}
        onPress={() => {
          navigate("Drawer", {
            screen: "Home",
          });
        }}
      />

      <DrawerItem
        label="Sair"
        inactiveTintColor={palette.white}
        icon={() => (
          <Entypo name="chevron-left" size={24} color={palette.white} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
