import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palette.primary};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
  position: absolute;
  right: 20px;
  bottom: ${getBottomSpace() + 20}px;
  ${({ theme }) => theme.shadow};
`;
