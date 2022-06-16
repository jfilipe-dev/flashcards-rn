import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background};
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.white};
  text-align: center;
  margin-top: 20px;
`;
