import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const PlusIcon: SvgIcon = {
  name: 'plus-icon',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M9.43555 9.04199H15.2656V6.18555H9.43555V0.0771484H6.5498V6.18555H0.734375V9.04199H6.5498V15.1504H9.43555V9.04199Z"
        fill={color || 'white'}
      />
    </>
  ),
};
