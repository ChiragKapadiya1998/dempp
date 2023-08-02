import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon, ContentProps } from '../types';

export const DoneIcon: SvgIcon = {
  name: 'done',
  baseWidth: 24,
  baseHeight: 24,
  Content: ({ color }) => (
    <>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path
        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
        fill={color}
      />
    </>
  ),
};
