import React, { createRef } from "react";
import { Card } from "../../../../services/cards";
import { Collection } from "../../../../services/collections";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Container, Actions, Col, Separator, Subtitle, Title } from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import CustomModal, { CustomModalRef } from "../../../../components/Modal";

interface CardsItemProps {
  data: Card;
  collection: Collection;
  deleteCard: () => void;
}

const CardItem = ({ data, deleteCard, collection }: CardsItemProps) => {
  const { navigate } = useNavigation();
  const { palette } = useTheme();

  const modalRef = createRef<CustomModalRef>();

  const handleNavigateToEditCard = () => {
    navigate("Drawer", {
      screen: "CreateOrUpdateCard",
      params: {
        collection: collection,
        card: data,
      },
    });
  };

  return (
    <>
      <Container>
        <Col>
          <Subtitle>Frente</Subtitle>
          <Title>{data.front}</Title>
        </Col>

        <Col>
          <Subtitle>Verso</Subtitle>
          <Title>{data.back}</Title>
        </Col>

        <Actions>
          <Entypo
            name="edit"
            size={28}
            color={palette.blue}
            onPress={handleNavigateToEditCard}
          />
          <Separator />
          <Ionicons
            name="md-trash"
            onPress={() => modalRef.current?.show()}
            size={28}
            color={palette.error}
          />
        </Actions>
      </Container>

      <CustomModal
        ref={modalRef}
        onConfirm={deleteCard}
        title="Você tem certeza que deseja excluir esse cartão?"
      />
    </>
  );
};

export default CardItem;
