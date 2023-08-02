import React from 'react';
import { Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const HomeTabIcon: SvgIcon = {
  name: 'home-tab-icon',
  baseWidth: 22,
  baseHeight: 23,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M4.62746 11.8141C5.24341 11.0037 6.203 10.5303 7.22095 10.5303C8.48528 10.5303 10.0284 10.5368 10.0284 10.5368C12.8034 10.5368 15.0468 8.28697 15.0468 5.51842C15.0468 2.74337 12.797 0.5 10.0284 0.5H5.91124C3.1362 0.5 0.892822 2.74986 0.892822 5.51842V14.8809C0.892822 15.4774 1.64493 15.7303 2.00802 15.257L4.62746 11.8141Z"
        fill="url(#paint0_radial_2810_30003)"
      />
      <Path
        d="M17.3225 11.2501C16.7065 12.0606 15.747 12.5339 14.729 12.5339C13.4647 12.5339 11.9216 12.5274 11.9216 12.5274C9.14651 12.5274 6.90314 14.7773 6.90314 17.5458C6.90314 20.3209 9.153 22.5642 11.9216 22.5642H16.0387C18.8138 22.5642 21.0571 20.3144 21.0571 17.5458V8.18329C21.0571 7.58679 20.305 7.33392 19.9419 7.80723L17.3225 11.2501Z"
        fill="url(#paint1_radial_2810_30003)"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_2810_30003"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.9748 3.4328) scale(10.4448)"
        >
          <Stop stopColor={color || '#4C9AFF'} />
          <Stop offset="1" stopColor={color || '#0052CC'} />
        </RadialGradient>
        <RadialGradient
          id="paint1_radial_2810_30003"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.97562 16.6315) rotate(180) scale(10.4448)"
        >
          <Stop stopColor={color || '#4C9AFF'} />
          <Stop offset="1" stopColor={color || '#0052CC'} />
        </RadialGradient>
      </Defs>
    </>
  ),
};
