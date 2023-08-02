import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon, ContentProps } from '../types';

export const CheckboxBlankOutline: SvgIcon = {
  name: 'checkbox-blank-outline',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M13.271 15.5H2.72895C1.89602 15.5 1.36243 15.2949 1.03432 14.9714C0.707538 14.6493 0.5 14.1264 0.5 13.3058V2.69419C0.5 1.87358 0.707538 1.35066 1.03432 1.02855C1.36243 0.705142 1.89602 0.5 2.72895 0.5H13.271C14.1077 0.5 14.641 0.706996 14.9681 1.03097C15.2943 1.35407 15.5 1.87732 15.5 2.69419V13.3058C15.5 14.1227 15.2943 14.6459 14.9681 14.969C14.641 15.293 14.1077 15.5 13.271 15.5Z"
      stroke={color}
    />
  ),
};
