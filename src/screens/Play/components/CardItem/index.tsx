import React from "react";
import { Card } from "../../../../services/cards";

import { Container, FaceLabel, FaceValue, Separator, Face } from "./styles";

interface Props {
  data: Card;
  showBack: boolean;
}

const CardItem = ({ data, showBack }: Props) => {
  return (
    <Container>
      <Face full={!showBack}>
        <FaceLabel>Frente</FaceLabel>
        <FaceValue>{data.front}</FaceValue>
      </Face>
      {showBack && (
        <>
          <Separator />
          <Face>
            <FaceLabel>Verso</FaceLabel>
            <FaceValue>{data.back}</FaceValue>
          </Face>
        </>
      )}
    </Container>
  );
};

export default CardItem;
