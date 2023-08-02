import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const DotsIcon: SvgIcon = {
  name: 'dots-icon',
  baseWidth: 18,
  baseHeight: 5,
  Content: ({ color }: ContentProps) => (
    <>
      <Circle cx="9" cy="2.25" r="2.25" fill={color} />
      <Circle cx="15.75" cy="2.25" r="2.25" fill={color} />
      <Circle cx="2.25" cy="2.25" r="2.25" fill={color} />
    </>
  ),
};
