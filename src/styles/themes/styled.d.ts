import "styled-componets";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      background: string;
      primary: string;
      secondary: string;
      primaryLight: string;
      backgroundLight: string;
      white: string;
      gray: string;
      error: string;
      green: string;
      highlight: string;
      blue: string;
    };
  }
}
