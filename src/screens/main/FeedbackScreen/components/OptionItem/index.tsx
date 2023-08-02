import React from 'react';

import { Props } from './types';
import RadioButton from '../RadioButton';

import { Container, TitleText } from './styled';

const OptionItem = ({ isSelected, title, onPress }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.5} onPress={onPress}>
      <RadioButton isSelected={isSelected} />
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default OptionItem;
