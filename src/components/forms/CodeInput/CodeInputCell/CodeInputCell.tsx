import React from 'react';
import { fontFamily } from '../../../../utils/functions';
import { Char, Container } from './styled';
import { Props } from './types';

const CodeInputCell = ({ value, invalid }: Props): JSX.Element => {
  const char = value[0];

  return (
    <Container {...{ invalid }}>
      <Char style={{ fontFamily: fontFamily.rf_regular }}>{char}</Char>
    </Container>
  );
};
export default CodeInputCell;
