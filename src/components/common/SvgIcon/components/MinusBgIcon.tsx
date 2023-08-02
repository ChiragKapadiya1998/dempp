import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const MinusBgIcon: SvgIcon = {
  name: 'minusbg-icon',
  baseWidth: 30,
  baseHeight: 30,
  Content: ({ color }: ContentProps) => (
    <>
      <Circle cx="15" cy="15" r="15" fill={color} />
      <Path d="M20 15L10 15" stroke="#7A869A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </>
  ),
};
