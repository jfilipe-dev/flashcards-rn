import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

export const Col = styled.View`
  flex: 1;
  margin-right: 20px;
  align-self: stretch;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.highlight};
  margin: auto 0;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
  margin-bottom: 5px;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Separator = styled.View`
  width: 20px;
`;
