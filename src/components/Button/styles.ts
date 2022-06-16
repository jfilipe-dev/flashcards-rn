import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  color: string;
  outline?: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  background-color: ${(props) => props.color};
  padding: 16px 8px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  ${(props) =>
    props.outline &&
    css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.palette.white};
    `}
`;

export const Label = styled.Text`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.white};
`;
