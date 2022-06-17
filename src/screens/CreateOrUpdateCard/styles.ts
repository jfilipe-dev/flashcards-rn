import styled from "styled-components/native";
import Button from "../../components/Button";

export const Container = styled.View`
  margin-bottom: auto;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.palette.white};
  font-weight: 600;
  text-align: center;
`;

export const CancelButton = styled(Button)`
  margin-top: 20px;
`;

export const FlashCard = styled.View`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const FaceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray};
`;

export const Separator = styled.View`
  border-width: 2px;
  border-color: #fafafa;
  margin: 20px 0;
  border-radius: 2px;
`;

export const Face = styled.View`
  min-height: 178px;
`;

export const FaceInput = styled.TextInput.attrs({
  multiline: true,
  scrollEnabled: false,
})`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.background};
  text-align: center;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  margin: auto 0;
`;
