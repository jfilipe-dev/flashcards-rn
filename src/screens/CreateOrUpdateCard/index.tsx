import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { DrawerRouteParams } from "../../@types/navigation";
import Button from "../../components/Button";
import ScrollContainer from "../../components/ScrollContainer";
import { addNewCard, updateCard } from "../../services/cards";

import {
  Title,
  CancelButton,
  Container,
  FaceLabel,
  FlashCard,
  Separator,
  FaceInput,
} from "./styles";

const CreateOrUpdateCard: React.FC = () => {
  const { setOptions, goBack } = useNavigation();
  const { params } = useRoute<DrawerRouteParams<"CreateOrUpdateCard">>();

  const { collection, card } = params;

  const [front, setFront] = useState(card?.front || "");
  const [back, setBack] = useState(card?.back || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (card) {
      await updateCard(card?.id, {
        front,
        back,
        collectionId: collection.id,
      });
    } else {
      await addNewCard({
        collectionId: collection.id,
        front,
        back,
      });
    }

    goBack();
    setLoading(false);
  };

  const buttonLabel = useMemo(() => {
    if (card) {
      return "Salvar alterações";
    }

    return "Cadastrar";
  }, [collection, card]);

  const disabled = useMemo(
    () => !front || !back || loading,
    [front, back, loading]
  );

  useLayoutEffect(() => {
    const titleAction = card ? "Editar" : "Criar";
    const title = `${titleAction} cartão - ${collection.name}`;

    setOptions({
      headerTitle: title,
    });
  }, [params]);

  return (
    <ScrollContainer full={false}>
      <Title>Preencha os dados da frente e do verso do flashcard</Title>

      <Container>
        <FlashCard>
          <FaceLabel>Frente</FaceLabel>
          <FaceInput
            placeholder="Frente"
            value={front}
            onChangeText={setFront}
          />
          <Separator />
          <FaceLabel>Verso</FaceLabel>
          <FaceInput placeholder="Verso" value={back} onChangeText={setBack} />
        </FlashCard>

        <Button
          label={buttonLabel}
          disabled={disabled}
          onPress={handleSubmit}
          loading={loading}
        />
      </Container>

      <CancelButton
        label="Cancelar"
        type="outline"
        onPress={goBack}
        disabled={loading}
      />
    </ScrollContainer>
  );
};

export default CreateOrUpdateCard;
