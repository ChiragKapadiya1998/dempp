import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const Pause: SvgIcon = {
  name: 'pause',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M6.04651 13.7714C6.04651 15.0022 5.04868 16 3.81794 16C2.58719 16 1.58936 15.0022 1.58936 13.7714V2.22858C1.58936 0.997837 2.58719 0 3.81794 0C5.04868 0 6.04651 0.997837 6.04651 2.22858V13.7714Z"
        fill={color}
      />
      <Path
        d="M14.4103 13.7714C14.4103 15.0022 13.4124 16 12.1817 16C10.951 16 9.95312 15.0022 9.95312 13.7714V2.22858C9.95346 0.997837 10.9513 0 12.1817 0C13.4124 0 14.4103 0.997837 14.4103 2.22858V13.7714Z"
        fill={color}
      />
    </>
  ),
};
