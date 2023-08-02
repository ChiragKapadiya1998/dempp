import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const CallNormalIcon: SvgIcon = {
  name: 'call-normal-icon',
  baseWidth: 22,
  baseHeight: 19,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M15.1389 12.7682C14.5791 12.6477 14.1363 12.9076 13.7442 13.1346C13.3427 13.3685 12.5791 13.9879 12.1415 13.8293C9.90074 12.9068 7.79328 10.9455 6.88099 8.69579C6.7202 8.2488 7.33671 7.48041 7.56886 7.07413C7.79414 6.68084 8.04865 6.23384 7.93257 5.66989C7.82767 5.16312 6.47085 3.43664 5.99106 2.96452C5.67464 2.65266 5.35049 2.48114 5.01773 2.45342C3.76667 2.39971 2.36943 4.06902 2.12438 4.46837C1.51046 5.31992 1.5139 6.45301 2.1347 7.82692C3.63081 11.5173 9.28939 17.0865 12.9936 18.6389C13.6771 18.9586 14.3022 19.1188 14.8637 19.1188C15.4131 19.1188 15.9024 18.9655 16.3229 18.6614C16.6401 18.4786 18.3779 17.012 18.3323 15.7273C18.3048 15.3999 18.1337 15.0724 17.8258 14.7554C17.3572 14.2711 15.6419 12.8738 15.1389 12.7682Z"
        fill={color}
      />
      <Path d="M11.835 8.63484L18.4139 1.05836" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M15.2694 8.38574L11.8348 8.63489L11.5998 5.1993" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </>
  ),
};
