import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const Pencil: SvgIcon = {
  name: 'pencil',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M0 12.667V16.0008H3.33379L13.1707 6.16387L9.8369 2.83008L0 12.667Z"
        fill={color}
      />
      <Path
        d="M15.7399 2.33586L13.664 0.260036C13.3173 -0.0866786 12.7528 -0.0866786 12.4061 0.260036L10.7792 1.88693L14.113 5.22072L15.7399 3.59383C16.0866 3.24711 16.0866 2.68258 15.7399 2.33586Z"
        fill={color}
      />
    </>
  ),
};
