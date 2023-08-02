import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const DropDownArrow: SvgIcon = {
  name: 'dropDownArrow',
  baseWidth: 10,
  baseHeight: 6,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M1.44821e-07 0.831541C1.44821e-07 1.06093 0.0767087 1.25448 0.230126 1.41219L4.36541 5.70609C4.5537 5.90681 4.75593 6 5 6C5.24407 6 5.45328 5.90681 5.63459 5.71326L9.76987 1.41219C9.92329 1.25448 10 1.06093 10 0.831541C10 0.37276 9.64435 0 9.19805 0C8.9749 0 8.77266 0.09319 8.6053 0.258065L4.99303 4.02867L1.38773 0.258065C1.22734 0.09319 1.0251 0 0.801953 0C0.355649 0 1.44821e-07 0.37276 1.44821e-07 0.831541Z"
      fill={color}
    />
  ),
};
