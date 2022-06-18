import React from "react";
import RegisterIcon from "../../../assets/RegisterIcon.png";

import { Container, Image } from "./styles";

const Logo: React.FC = () => {
  return (
    <Container>
      <Image source={RegisterIcon} resizeMode="contain" />
    </Container>
  );
};

export default Logo;
