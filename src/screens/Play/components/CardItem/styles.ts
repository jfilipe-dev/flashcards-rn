import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const FaceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const Face = styled.View<{ full?: boolean }>`
  min-height: ${({ full }) => (full ? 400 : 178)}px;
`;

export const Separator = styled.View`
  border-width: 2px;
  border-color: #fafafa;
  border-radius: 2px;
  margin: 20px 0;
`;

export const FaceValue = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.background};
  text-align: center;
  font-weight: 600;
  margin: auto 0;
`;
