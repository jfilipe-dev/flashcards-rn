import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface Props {
  title: string;
}

const EmptyPage = ({ title }: Props) => {
  const { palette } = useTheme();

  return (
    <Container>
      <Ionicons
        name="ios-file-tray-stacked"
        size={54}
        color={palette.backgroundDark}
      />
      <Title>{title}</Title>
    </Container>
  );
};

export default EmptyPage;
