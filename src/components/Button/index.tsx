import React, { useMemo } from "react";
import { ActivityIndicator, TouchableOpacityProps, View } from "react-native";
import { useTheme } from "styled-components/native";

import { Container, Label } from "./styles";

interface Props extends TouchableOpacityProps {
  label: string;
  type?: "error" | "success" | "primary" | "secondary";
  loading?: boolean;
}

const Button = ({ type, label, style, loading, ...rest }: Props) => {
  const { palette } = useTheme();

  const color = useMemo(() => {
    switch (type) {
      case "error":
        return palette.error;
      case "success":
        return palette.green;
      case "primary":
        return palette.primary;
      case "secondary":
        return palette.secondary;
      default:
        return palette.primary;
    }
  }, [palette]);

  return (
    <Container color={color} disabled={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Label>{label}</Label>
      )}
    </Container>
  );
};

export default Button;
