import React from 'react';
import { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { Colors } from '../../../../styles';
import { ContentProps, SvgIcon } from '../types';

export const Play: SvgIcon = {
  name: 'play',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <G clipPath="url(#clip0)">
        <Path
          d="M3.4036 0.352788C1.9611 -0.474645 0.791626 0.203198 0.791626 1.86558V14.1332C0.791626 15.7973 1.9611 16.4743 3.4036 15.6476L14.1261 9.4983C15.5691 8.67057 15.5691 7.32953 14.1261 6.502L3.4036 0.352788Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="16" height="16" fill={Colors.transparent} />
        </ClipPath>
      </Defs>
    </>
  ),
};
