import React from 'react';
import { Rect } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const Stop: SvgIcon = {
  name: 'stop',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <Rect width="16" height="16" rx="2" fill={color} />
  ),
};
