import styled from "styled-components/native";
import Button from "../../components/Button";

export const Container = styled.View`
  margin-bottom: auto;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.palette.white};
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

export const CancelButton = styled(Button)`
  margin-top: 20px;
`;
