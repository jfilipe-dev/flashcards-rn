import styled, { css } from "styled-components/native";

interface HeaderBackgroundProps {
  withRadius?: boolean;
  noShadow?: boolean;
}

const HeaderBackground = styled.View<HeaderBackgroundProps>`
  background-color: ${({ theme }) => theme.palette.primary};
  flex: 1;

  ${({ withRadius }) =>
    withRadius &&
    css`
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    `}
`;

export default HeaderBackground;
