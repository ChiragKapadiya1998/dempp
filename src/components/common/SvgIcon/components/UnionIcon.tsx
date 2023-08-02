import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const UnionIcon: SvgIcon = {
  name: 'union-icon',
  baseWidth: 24,
  baseHeight: 24,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6ZM11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V10Z"
        fill={color}
      />
    </>
  ),
};
