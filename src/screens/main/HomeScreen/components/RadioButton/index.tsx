import React from 'react';

import { Props } from './types';

import { Container, SelectedContainer, SelectedDot } from './styled';
import { wp } from '../../../../../styles/metrics';

const RadioButton = ({ isSelected }: Props): JSX.Element => {
  if (isSelected) {
    return (
      <SelectedContainer>
        <SelectedDot />
      </SelectedContainer>
    );
  }

  return <Container />;
};

export default RadioButton;
