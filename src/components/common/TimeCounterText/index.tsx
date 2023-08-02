import React, { FC } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '../../../styles';

const styles: TextStyle = {
  fontSize: 20,
  fontWeight: '400',
  color: Colors.greyish2,
  marginTop: 8,
};

const TimeCounterText: FC<TextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles, style]} {...rest}>
      {children}
    </Text>
  );
};

export default TimeCounterText;
