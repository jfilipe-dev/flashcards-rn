import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.palette.backgroundLight};
  align-self: center;
  margin-top: ${Platform.OS === "android" ? getStatusBarHeight() / 2 : 0}px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.white};
  margin: 10px 0 20px;
  text-align: center;
  font-weight: 600;
`;
