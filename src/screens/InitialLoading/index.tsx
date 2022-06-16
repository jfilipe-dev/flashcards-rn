import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../context/useAuth";

import { Container } from "./styles";

const InitialLoading: React.FC = () => {
  const { palette } = useTheme();
  const { reset } = useNavigation();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (currentUser) {
          reset({
            routes: [{ name: "Drawer" }],
          });
        } else {
          reset({
            routes: [{ name: "Login" }],
          });
        }
      }, 1000);
    }
  }, [currentUser, loading]);

  return (
    <Container>
      <ActivityIndicator size={"large"} color={palette.white} />
    </Container>
  );
};

export default InitialLoading;
