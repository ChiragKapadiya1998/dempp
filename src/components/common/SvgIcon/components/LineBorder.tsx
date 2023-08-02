import React from 'react';
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const LineBorderIocn: SvgIcon = {
  name: 'lineBorder-icon',
  baseWidth: 170,
  baseHeight: 1,
  Content: ({ color }: ContentProps) => (
    <>
      <Path d="M0 1H341" stroke="url(#paint0_linear_4873_9901)" />
      <Defs>
        <LinearGradient id="paint0_linear_4873_9901" x1="23" y1="0.999998" x2="341" y2="0.999967" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DEE1E6" />
          <Stop offset="1" stopColor="#DEE1E6" stop-opacity="0" />
        </LinearGradient>
      </Defs>
    </>
  ),
};
