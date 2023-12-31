import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const RoundRight: SvgIcon = {
  name: 'round-right-icon',
  baseWidth: 23,
  baseHeight: 22,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M21.5 10.0857V11.0057C21.4988 13.1621 20.8005 15.2604 19.5093 16.9875C18.2182 18.7147 16.4033 19.9782 14.3354 20.5896C12.2674 21.201 10.0573 21.1276 8.03447 20.3803C6.01168 19.633 4.28465 18.2518 3.11096 16.4428C1.93727 14.6338 1.37979 12.4938 1.52168 10.342C1.66356 8.19029 2.49721 6.14205 3.89828 4.5028C5.29935 2.86354 7.19279 1.72111 9.29619 1.24587C11.3996 0.770634 13.6003 0.988061 15.57 1.86572M21.5 3L11.5 13.01L8.5 10.01"
      stroke="#08CABE"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
};
