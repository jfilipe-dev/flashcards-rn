import React, { createRef } from "react";
import { View } from "react-native";
import { Collection } from "../../../../services/collections";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Container, Actions, Image, Title } from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import CustomModal, { CustomModalRef } from "../../../../components/Modal";

interface CollectionItemProps {
  data: Collection;
  deleteCollection: () => void;
}

const CollectionItem = ({ data, deleteCollection }: CollectionItemProps) => {
  const { navigate } = useNavigation();
  const { palette } = useTheme();

  const modalRef = createRef<CustomModalRef>();

  const handleNavigateToCardsCollection = () => {
    navigate("Drawer", {
      screen: "Cards",
      params: {
        collection: data,
      },
    });
  };

  const handleNavigateToEditCollection = () => {
    navigate("Drawer", {
      screen: "CreateOrUpdateCollection",
      params: {
        collection: data,
      },
    });
  };

  return (
    <>
      <Container onPress={handleNavigateToCardsCollection}>
        <Image source={{ uri: data.image }} resizeMode="contain" />
        <Title>{data.name}</Title>
        <Actions>
          <Entypo
            name="edit"
            size={28}
            color={palette.blue}
            onPress={handleNavigateToEditCollection}
          />
          <Ionicons
            name="md-trash"
            size={28}
            color={palette.error}
            onPress={() => modalRef.current?.show()}
          />
        </Actions>
      </Container>

      <CustomModal
        ref={modalRef}
        onConfirm={deleteCollection}
        title="Você tem certeza que deseja excluir essa coleção?"
      />
    </>
  );
};

export default CollectionItem;
