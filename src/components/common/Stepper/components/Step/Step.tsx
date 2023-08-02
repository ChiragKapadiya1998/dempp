import React from 'react';

import { Container, Label } from './styled';
import { StepProps } from './types';

const Step = ({ label, active = false }: StepProps): JSX.Element => (
  <Container isActive={active}>
    <Label isActive={active}>{label}</Label>
  </Container>
);

export default Step;
