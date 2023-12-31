import React from 'react';
import { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const Star: SvgIcon = {
  name: 'star',
  baseWidth: 24,
  baseHeight: 24,
  Content: ({ color }: ContentProps) => (
    <>
      <G clipPath="url(#clip0)">
        <Path
          d="M23.9655 9.24623C23.8829 8.99165 23.6629 8.80612 23.398 8.76769L15.9579 7.68652L12.6305 0.944655C12.5121 0.704656 12.2676 0.552734 12 0.552734C11.7324 0.552734 11.488 0.704656 11.3695 0.944655L8.04198 7.68652L0.602007 8.76769C0.337211 8.80612 0.117134 8.99166 0.0344468 9.24619C-0.0482872 9.50076 0.0207125 9.78018 0.212384 9.96698L5.59586 15.2148L4.32518 22.6249C4.2799 22.8887 4.38837 23.1553 4.60488 23.3126C4.72737 23.4016 4.87244 23.4469 5.01822 23.4469C5.13016 23.4469 5.24247 23.4202 5.34532 23.3661L12 19.8675L18.6544 23.3661C18.8913 23.4906 19.1784 23.4699 19.3949 23.3126C19.6114 23.1553 19.7199 22.8886 19.6747 22.6248L18.4036 15.2148L23.7876 9.96693C23.9793 9.78018 24.0483 9.50076 23.9655 9.24623Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </>
  ),
};
