import { ScrollView } from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import styled from "styled-components/native";

const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight() + 20,
    paddingBottom: getBottomSpace() + 20,
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.palette.background};
`;

export default ScrollContainer;
