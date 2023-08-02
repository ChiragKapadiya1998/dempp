import React from 'react';
import { Defs, Path, G } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const UseSearchIcon: SvgIcon = {
  name: 'use-search-icon',
  baseWidth: 41,
  baseHeight: 43,
  Content: ({ color }: ContentProps) => (
    <>
      <G>
        <Path
          d="M10.8745 7.524C10.7708 6.44244 11.9608 5.71842 12.8737 6.30774L29.7313 17.1913C30.6975 17.8151 30.4374 19.294 29.3163 19.5506L21.4027 21.3621C20.9812 21.4586 20.6023 21.6891 20.3228 22.0191L15.0761 28.2141C14.3328 29.0918 12.8998 28.6429 12.79 27.4981L10.8745 7.524Z"
          fill="#FFA4BF"
        />
      </G>
    </>
  ),
};
