import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const HistoryTabIcon: SvgIcon = {
  name: 'history-tab-icon',
  baseWidth: 22,
  baseHeight: 22,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C22 8.08262 20.8411 5.28472 18.7782 3.22182C16.7153 1.15893 13.9174 0 11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476612 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3165 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113ZM11.7138 6.05119C11.7138 5.42252 11.2042 4.91288 10.5755 4.91288C9.94685 4.91288 9.43722 5.42252 9.43722 6.05119V11.8026C9.43722 12.202 9.64657 12.5722 9.98886 12.7781L14.4831 15.481C15.0219 15.805 15.7213 15.6309 16.0453 15.0921C16.3693 14.5534 16.1952 13.854 15.6565 13.53L11.7138 11.1589V6.05119Z"
        fill={color || '#7A869A'}
      />
    </>
  ),
};