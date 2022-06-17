import React from 'react';

import { Title } from './styles';

interface HeaderProps {
  currentCard: number;
  maxCards: number;
}

const Header = ({ currentCard, maxCards }: HeaderProps) => {
  return (
    <Title>
      Cartão {currentCard}/{maxCards}
    </Title>
  );
};

export default Header;
