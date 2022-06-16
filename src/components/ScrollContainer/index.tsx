import { ScrollView } from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import styled from "styled-components/native";

interface ScrollContainerProps {
  full?: boolean;
}

const ScrollContainer = styled(ScrollView).attrs<ScrollContainerProps>(
  ({ full = true }) => ({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingTop: getStatusBarHeight() + (full ? 20 : 0),
      paddingBottom: getBottomSpace() + 20,
      flexGrow: 1,
    },
  })
)<ScrollContainerProps>`
  background-color: ${({ theme }) => theme.palette.background};
`;

export default ScrollContainer;
