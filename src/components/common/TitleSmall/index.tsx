import React, { FC } from 'react';
import { TextProps, Text, StyleSheet } from 'react-native';

import { Colors } from '../../../styles';
import { fontSize } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

const TitleSmall: FC<TextProps> = ({ children, style, ...rest }) => (
  <Text style={[styles.title, style]} {...rest}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize(10),
    lineHeight: fontSize(16),
    letterSpacing: -0.41,
    fontWeight: '500',
    color: Colors.greyish27,
    textTransform: 'uppercase',
    fontFamily: fontFamily.rf_regular,
  },
});

export default TitleSmall;
