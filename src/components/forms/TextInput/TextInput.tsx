import React, { forwardRef } from 'react';
import { TextInput as Input } from 'react-native';

import { Colors } from '../../../styles';
import { TextInputProps } from './types';
import { MAX_LENGTH_TEXT_INPUT } from '../../../utils/constants';

import { BottomLine, Container, InputField, Label, NumberRemainingCharacters, Required } from './styled';
import { fontSize } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

const TextInput = forwardRef<Input, TextInputProps>((props: TextInputProps, ref) => {
  const {
    containerStyle,
    error,
    label,
    labelHidden = false,
    maxLength = MAX_LENGTH_TEXT_INPUT,
    numberRemainingCharactersShown = false,
    required = false,
    value = '',
    hideBottomLine = false,
    textInputStyle,
    BottomLineStyle,
    lebleStyle,
  } = props;

  const placeholderTextColor = Colors.greyish26;
  const isError = !!error;
  const labelText = !!value && !labelHidden ? label : ' ';
  const placeholder = required ? `${label}*` : label;
  const numRemainingChars = maxLength - value.length;
  const showRequiredChar = required && !!value;

  return (
    <Container style={containerStyle}>
      <Label style={lebleStyle}>
        {labelText}
        {showRequiredChar && <Required>*</Required>}
      </Label>
      {/* <InputField
        placeholderTextColor={Colors.greyish26}
        {...{ ...props, ref, placeholder, placeholderTextColor }}
        style={{ fontSize: fontSize(17), fontFamily: fontFamily.rf_regular, letterSpacing: -0.3, fontWeight: '400' }}
      /> */}
      <InputField {...{ ...props, ref, placeholder, placeholderTextColor }} placeholderTextColor={placeholderTextColor} style={textInputStyle} />
      {hideBottomLine ? null : <BottomLine error={isError} style={BottomLineStyle} />}

      {numberRemainingCharactersShown && (
        <NumberRemainingCharacters>
          {numRemainingChars} {numRemainingChars === 1 ? 'character' : 'characters'}
        </NumberRemainingCharacters>
      )}
    </Container>
  );
});

export default TextInput;
