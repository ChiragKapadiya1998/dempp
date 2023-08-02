<svg
  width="7"
  height="12"
  viewBox="0 0 7 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
></svg>;

import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const RightSmallChevron: SvgIcon = {
  name: 'right-small-chevron',
  baseWidth: 7,
  baseHeight: 12,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M0.970131 12C1.23775 12 1.46356 11.9079 1.64755 11.7238L6.65711 6.76151C6.89128 6.53556 7 6.29289 7 6C7 5.70711 6.89128 5.45607 6.66547 5.23849L1.64755 0.276151C1.46356 0.0920502 1.23775 0 0.970131 0C0.434886 0 0 0.426778 0 0.962343C0 1.23013 0.108722 1.4728 0.301075 1.67364L4.70012 6.00837L0.301075 10.3347C0.108722 10.5272 0 10.7699 0 11.0377C0 11.5732 0.434886 12 0.970131 12Z"
      fill={color}
      fillOpacity="0.3"
    />
  ),
};