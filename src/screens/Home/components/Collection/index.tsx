import React from "react";
import { View } from "react-native";
import { Collection } from "../../../../services/collections";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Container, Actions, Image, Title } from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

interface CollectionItemProps {
  data: Collection;
  deleteCollection: () => void;
}

const CollectionItem = ({ data, deleteCollection }: CollectionItemProps) => {
  const { navigate } = useNavigation();
  const { palette } = useTheme();

  return (
    <Container>
      <Image source={{ uri: data.image }} resizeMode="contain" />
      <Title>{data.name}</Title>
      <Actions>
        <Entypo
          name="edit"
          size={28}
          color={palette.blue}
          onPress={() =>
            navigate("Drawer", {
              screen: "CreateOrUpdateCollection",
              params: {
                collection: data,
              },
            })
          }
        />
        <Ionicons
          name="md-trash"
          size={28}
          color={palette.error}
          onPress={deleteCollection}
        />
      </Actions>
    </Container>
  );
};

export default CollectionItem;
