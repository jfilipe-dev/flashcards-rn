import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface Props {
  title?: string;
}

const LoadingPage = ({ title }: Props) => {
  const { palette } = useTheme();

  return (
    <Container>
      <ActivityIndicator size={"large"} color={palette.white} />
      {!!title && <Title>{title}</Title>}
    </Container>
  );
};

export default LoadingPage;
