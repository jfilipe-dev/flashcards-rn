import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Container } from "./styles";
import { useTheme } from "styled-components";

interface Props {
  onPress: () => void;
}

const FloatButton = ({ onPress }: Props) => {
  const { palette } = useTheme();

  return (
    <Container onPress={onPress}>
      <Ionicons name="md-add-outline" size={38} color={palette.white} />
    </Container>
  );
};

export default FloatButton;
