import React from 'react';

import { Props } from './types';
import RadioButton from '../RadioButton';

import { Container, TitleText } from './styled';
import { fontSize } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

const OptionItem = ({ isSelected, title, onPress }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.5} onPress={onPress}>
      <RadioButton isSelected={isSelected} />
      <TitleText style={{ fontSize: fontSize(14) }}>{title}</TitleText>
    </Container>
  );
};

export default OptionItem;
