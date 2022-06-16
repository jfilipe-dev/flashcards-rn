import { TextInput } from "react-native";
import styled from "styled-components/native";

interface ContainerProps {
  isFocused: boolean;
}

export const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.palette.primaryLight : theme.palette.white};
  border-bottom-width: 3px;
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const InputText = styled(TextInput)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.backgroundLight};
  padding: 4px 0;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primaryLight};
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.error};
  margin-top: 2px;
`;
