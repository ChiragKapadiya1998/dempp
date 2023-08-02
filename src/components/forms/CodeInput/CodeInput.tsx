import React, { useMemo, useRef } from 'react';
import { TextInput, View } from 'react-native';

import CodeInputCell from './CodeInputCell';
import { Container, GhostTextInput } from './styled';
import { CodeInputProps } from './types';

const CodeInput = ({ containerStyle, invalid = false, length, onBlur, onChangeText, onFocus, value }: CodeInputProps): JSX.Element => {
  const ghostTextInputRef = useRef<TextInput>(null);

  const chars = useMemo(() => new Array(length).fill('').map((__, index) => value?.[index] ?? ''), [value, length]);

  // Take only digits
  const onChangeCode = (nextCode: string) => {
    const trimmedCode = nextCode.trim();
    const processedCode = trimmedCode.replace('.', '');
    if (typeof +processedCode === 'number') onChangeText(processedCode);
  };

  const onPressContainer = () => ghostTextInputRef.current?.focus();
  const maxLength = length;

  return (
    <Container activeOpacity={1} onPress={onPressContainer} style={containerStyle}>
      <GhostTextInput
        ref={ghostTextInputRef}
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType="number-pad"
        onChangeText={onChangeCode}
        {...{ value, maxLength, onFocus, onBlur }}
      />
      {chars.map((char, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CodeInputCell key={index} value={char} invalid={invalid} />
      ))}
    </Container>
  );
};

export default CodeInput;
