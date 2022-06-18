import { Platform } from "react-native";
import {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from "styled-components";

type GenericProps = FlattenInterpolation<ThemeProps<DefaultTheme>>;

const shadow = Platform.select({
  ios: css`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  `,
  android: css`
    elevation: 10;
  `,
}) as GenericProps;

const palette = {
  background: "#42415C",
  backgroundLight: "#403E5B",
  backgroundDark: "#2C2A4A",
  secondary: "#A57985",
  primary: "#7872AB",
  primaryLight: "#4600D3",
  white: "#fff",
  gray: "#8E8E8E",
  error: "#FF0000",
  green: "#66946E",
  highlight: "#54A9A6",
  blue: "#4D72BE",
};

export interface Theme {
  palette: typeof palette;
  shadow: GenericProps;
}

const defaultTheme: Theme = {
  palette,
  shadow,
};

export default defaultTheme;
