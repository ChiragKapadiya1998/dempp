import React from 'react';
import { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const Phone: SvgIcon = {
  name: 'phone',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <G clip-path="url(#clip0)">
        <Path
          d="M14.7162 10.5022C13.7366 10.5022 12.7747 10.349 11.8633 10.0478C11.4167 9.89542 10.8676 10.0352 10.595 10.3151L8.796 11.6732C6.70963 10.5595 5.42446 9.27475 4.32596 7.20404L5.64408 5.45188C5.98654 5.10988 6.10938 4.61029 5.96221 4.14154C5.65971 3.22529 5.50604 2.26392 5.50604 1.28392C5.50608 0.575958 4.93013 0 4.22221 0H1.28387C0.575958 0 0 0.575958 0 1.28387C0 9.39846 6.60158 16 14.7162 16C15.4241 16 16 15.424 16 14.7161V11.786C16 11.0781 15.424 10.5022 14.7162 10.5022Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </>
  ),
};
