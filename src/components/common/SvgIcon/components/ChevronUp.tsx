import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const ChevronUp: SvgIcon = {
  name: 'chevron-up',
  baseWidth: 17,
  baseHeight: 10,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M0.900401 7.56076C0.70198 7.75918 0.59375 8.01171 0.59375 8.30935C0.59375 8.90461 1.06275 9.38263 1.65801 9.38263C1.95564 9.38263 2.22622 9.25636 2.43366 9.04892L8.60277 2.7355L14.7538 9.04892C14.9613 9.25636 15.2409 9.38263 15.5295 9.38263C16.1248 9.38263 16.5938 8.90461 16.5938 8.30935C16.5938 8.01171 16.4855 7.75918 16.2871 7.56076L9.43253 0.543844C9.19803 0.291307 8.90942 0.174058 8.59375 0.165039C8.27808 0.165039 8.0075 0.291307 7.76399 0.543844L0.900401 7.56076Z"
        fill={color}
      />
    </>
  ),
};
