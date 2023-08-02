import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const VolumeOff: SvgIcon = {
  name: 'volume-off',
  baseWidth: 36,
  baseHeight: 36,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M20.9208 1.31822C20.5032 1.11902 20.0112 1.17182 19.6512 1.46222L7.9776 10.8006H2.4C1.0776 10.8006 0 11.8782 0 13.2006V22.8006C0 24.1254 1.0776 25.2006 2.4 25.2006H7.9776L19.6488 34.539C19.8672 34.7118 20.1336 34.8006 20.4 34.8006C20.5776 34.8006 20.7552 34.7598 20.9208 34.6806C21.336 34.4814 21.6 34.0614 21.6 33.6006V2.40062C21.6 1.93982 21.336 1.51982 20.9208 1.31822Z"
      fill={color}
    />
  ),
};
