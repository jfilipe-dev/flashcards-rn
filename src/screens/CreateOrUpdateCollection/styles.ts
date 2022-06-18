import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Button from "../../components/Button";

const WINDOW_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = WINDOW_WIDTH - 40 - 24;

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

export const SelectImage = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.white};
  margin-bottom: 20px;
`;

export const SelectImageLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primaryLight};
`;

export const EmptyImageContainer = styled.View`
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_WIDTH}px;
  margin: 20px 0;
`;
