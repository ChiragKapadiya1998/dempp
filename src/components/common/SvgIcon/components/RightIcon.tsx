import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const RightIcon: SvgIcon = {
  name: 'right-icon',
  baseWidth: 12,
  baseHeight: 10,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M4.59502 9.48304C4.48047 9.59826 4.32419 9.66255 4.16185 9.66255C3.99951 9.66255 3.84322 9.59826 3.72868 9.48304L0.269259 6.02306C-0.089753 5.66405 -0.089753 5.08189 0.269259 4.72355L0.702429 4.29027C1.06155 3.93126 1.64304 3.93126 2.00205 4.29027L4.16185 6.45017L9.99792 0.613986C10.357 0.254974 10.9391 0.254974 11.2975 0.613986L11.7307 1.04727C12.0897 1.40628 12.0897 1.98833 11.7307 2.34678L4.59502 9.48304Z"
      fill={color}
    />
  ),
};
