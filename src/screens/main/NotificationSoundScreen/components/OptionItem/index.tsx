import React from 'react';

import { Props } from './types';
import RadioButton from '../RadioButton';

import { Container, TitleText } from './styled';
import { Colors } from '../../../../../styles';

const OptionItem = ({ isSelected, title, lastIndex, index, onPress }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.5} onPress={onPress} style={{ borderBottomWidth: index === lastIndex ? 0 : 1, borderColor: Colors.greyish28 }}>
      <RadioButton isSelected={isSelected} />
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default OptionItem;
