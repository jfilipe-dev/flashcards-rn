import styled, { css } from "styled-components/native";

interface HeaderBackgroundProps {
  drawer?: boolean;
}

const HeaderBackground = styled.View<HeaderBackgroundProps>`
  background-color: ${({ theme, drawer }) =>
    drawer ? theme.palette.primary : theme.palette.background};
  flex: 1;
`;

export default HeaderBackground;
