import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  height: 80px;
  width: 80px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.highlight};
  flex: 1;
  margin-right: 10px;
`;

export const Actions = styled.View`
  justify-content: space-between;
  align-self: stretch;
`;
