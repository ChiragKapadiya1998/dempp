import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const LeftChevron: SvgIcon = {
  name: 'left-chevron',
  baseWidth: 12,
  baseHeight: 22,
  Content: ({ color }: ContentProps) => (
    <Path
      d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
      fill={color}
    />
  ),
};
