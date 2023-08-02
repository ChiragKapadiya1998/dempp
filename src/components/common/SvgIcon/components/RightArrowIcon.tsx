import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const RightArrowIcon: SvgIcon = {
  name: 'right-arrow-icon',
  baseWidth: 8,
  baseHeight: 13,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M1.02148 1.54171L5.97982 6.50004L1.02148 11.4584"
        stroke={color || 'white'}
        stroke-width="25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      {/* <Path d="M1.6665 1.33334L6.33317 6.00001L1.6665 10.6667" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /> */}
    </>
  ),
};
