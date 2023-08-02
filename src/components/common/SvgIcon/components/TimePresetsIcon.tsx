import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const TimePresetsIcon: SvgIcon = {
  name: 'time-presets-icon',
  baseWidth: 20,
  baseHeight: 20,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C12.7 20 15.2 19 17.1 17.1C19 15.2 20 12.7 20 10C20 4.5 15.5 0 10 0ZM14.4 13.6C14.2 13.9 13.9 14.1 13.6 14.1C13.4 14.1 13.2 14.1 13.1 13.9L9.2 11.6C8.9 11.4 8.7 11.1 8.7 10.7V5.7C8.7 5.2 9.2 4.7 9.7 4.7C10.2 4.7 10.7 5.2 10.7 5.7V10.2L14.1 12.2C14.5 12.5 14.7 13.1 14.4 13.6Z"
      fill={color}
    />
  ),
};
