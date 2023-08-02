import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const UploadImgIcon: SvgIcon = {
  name: 'uploadImg-icon',
  baseWidth: 24,
  baseHeight: 24,
  Content: ({ color }: ContentProps) => (
    <>
      <Path d="M12.1222 15.436L12.1222 3.39502" stroke={color || '#0052CC'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path
        d="M15.0382 12.5083L12.1222 15.4363L9.20621 12.5083"
        stroke={color || '#0052CC'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.7549 8.12793H17.6879C19.7229 8.12793 21.3719 9.77693 21.3719 11.8129V16.6969C21.3719 18.7269 19.7269 20.3719 17.6969 20.3719L6.55695 20.3719C4.52195 20.3719 2.87195 18.7219 2.87195 16.6869V11.8019C2.87195 9.77293 4.51795 8.12793 6.54695 8.12793L7.48895 8.12793"
        stroke={color || '#0052CC'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  ),
};
