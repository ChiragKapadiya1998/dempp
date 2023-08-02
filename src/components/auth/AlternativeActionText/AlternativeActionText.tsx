import React from 'react';
import { fontFamily } from '../../../utils/functions';
import { HighlightedText, RegularText } from './styled';
import { Props } from './types';

const AlternativeActionText = ({ highlightedText, onPress, regularText, style }: Props): JSX.Element => (
  <RegularText {...{ onPress, style }}>
    {regularText}{' '}
    <HighlightedText style={{ fontFamily: fontFamily.rf_medium, fontWeight: '500', letterSpacing: -0.3 }}>{highlightedText}</HighlightedText>
  </RegularText>
);

export default AlternativeActionText;
