import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import { Card } from "../../services/cards";
import Header from "./components/Header";
import CardItem from "./components/CardItem";

import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerRouteParams } from "../../@types/navigation";
import ScrollContainer from "../../components/ScrollContainer";

const Play = () => {
  const { params } = useRoute<DrawerRouteParams<"Play">>();
  const { goBack, setOptions } = useNavigation();

  const { cards, collection } = params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card>(cards[currentIndex]);
  const maxIndex = useRef(cards.length - 1).current;
  const [showBack, setShowBack] = useState(false);

  const buttonLabel = useMemo(() => {
    if (currentIndex === maxIndex && showBack) {
      return "Finalizar";
    }

    if (showBack) {
      return "Próxima";
    }

    return "Virar";
  }, [currentIndex, maxIndex, showBack]);

  const handleButtonClick = () => {
    if (currentIndex === maxIndex && showBack) {
      goBack();
      return;
    }

    if (showBack) {
      const newCurrentIndex = currentIndex + 1;
      setCurrentIndex(newCurrentIndex);
      setCurrentCard(cards[newCurrentIndex]);
      setShowBack(false);
      return;
    }

    setShowBack(true);
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: `Jogando - ${collection.name}`,
    });
  }, [collection]);

  return (
    <ScrollContainer full={false}>
      <Header currentCard={currentIndex + 1} maxCards={cards.length} />
      <CardItem data={currentCard} showBack={showBack} />
      <Button
        label={buttonLabel}
        onPress={handleButtonClick}
        type={currentIndex === maxIndex && showBack ? "success" : "primary"}
      />
    </ScrollContainer>
  );
};

export default Play;
