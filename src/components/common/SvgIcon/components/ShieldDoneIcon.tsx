import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const ShieldDoneIcon: SvgIcon = {
  name: 'shield-done-icon',
  baseWidth: 16,
  baseHeight: 21,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.865 3.1238C15.302 3.2768 15.594 3.6888 15.594 4.1518V10.9248C15.594 12.8178 14.906 14.6248 13.691 16.0248C13.08 16.7298 12.307 17.2788 11.486 17.7228L7.928 19.6448L4.364 17.7218C3.542 17.2778 2.768 16.7298 2.156 16.0238C0.94 14.6238 0.25 12.8158 0.25 10.9208V4.1518C0.25 3.6888 0.542 3.2768 0.979 3.1238L7.561 0.810798C7.795 0.728798 8.05 0.728798 8.283 0.810798L14.865 3.1238Z"
        fill={color || '#A5ADBA'}
      />
      <Path d="M5.32249 9.9177L7.21449 11.8107L11.1125 7.9127" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </>
  ),
};
