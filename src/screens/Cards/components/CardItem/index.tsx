import React from "react";
import { Card } from "../../../../services/cards";
import { Collection } from "../../../../services/collections";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Container, Actions, Col, Separator, Subtitle, Title } from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

interface CardsItemProps {
  data: Card;
  collection: Collection;
  deleteCard: () => void;
}

const CardItem = ({ data, deleteCard, collection }: CardsItemProps) => {
  const { navigate } = useNavigation();
  const { palette } = useTheme();

  return (
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
          onPress={() => {
            navigate("Drawer", {
              screen: "CreateOrUpdateCard",
              params: {
                collection: collection,
                card: data,
              },
            });
          }}
        />
        <Separator />
        <Ionicons
          name="md-trash"
          onPress={deleteCard}
          size={28}
          color={palette.error}
        />
      </Actions>
    </Container>
  );
};

export default CardItem;
