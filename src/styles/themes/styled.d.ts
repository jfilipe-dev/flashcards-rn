import "styled-componets";

import { Theme } from "./default";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
