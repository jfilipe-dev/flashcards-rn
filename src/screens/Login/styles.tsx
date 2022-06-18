import styled from "styled-components/native";
import Button from "../../components/Button";

export const Container = styled.View`
  margin: auto 0;
`;

export const RegisterButton = styled(Button)`
  margin-top: 20px;
`;

export const Image = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 100%;
  margin-bottom: 20px;
`;
