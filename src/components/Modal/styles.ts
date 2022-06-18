import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.palette.background};
  padding: 20px;
  border-radius: 8px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.palette.backgroundLight};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.white};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const Button = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
})``;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.white};
  text-align: center;
`;
