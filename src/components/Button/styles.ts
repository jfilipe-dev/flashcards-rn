import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  background-color: ${(props) => props.color};
  padding: 16px 8px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 52px;
`;

export const Label = styled.Text`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.white};
`;
