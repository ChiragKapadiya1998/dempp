import React from 'react';

import { Props } from './types';
import RadioButton from '../RadioButton';

import { Container, TitleText } from './styled';
import { Colors } from '../../../../../styles';
import { wp } from '../../../../../styles/metrics';

const OptionItem = ({ isSelected, title, index, onPress }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.5} onPress={onPress} style={{ borderColor: Colors.greyish5, paddingVertical: wp(1.5), paddingHorizontal: wp(2.2) }}>
      <RadioButton isSelected={isSelected} />
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default OptionItem;
