import React from 'react';
import { Defs, Path, LinearGradient, Stop } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const QuestionIcon: SvgIcon = {
  name: 'question-icon',
  baseWidth: 5,
  baseHeight: 8,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M0 2.16114H1.15513C1.20536 1.44617 1.70201 0.996615 2.4721 0.996615C3.23661 0.996615 3.73326 1.44617 3.73326 2.05823C3.73326 2.61611 3.4933 2.93026 2.81808 3.32566C2.05357 3.7698 1.71317 4.25728 1.74107 5.02099L1.74665 5.4543H2.90179V5.1239C2.90179 4.56601 3.10826 4.27894 3.82812 3.8673C4.56473 3.4394 5 2.84902 5 2.00948C5 0.850372 4.0067 0 2.53348 0C0.915179 0 0.0502232 0.931618 0 2.16114ZM2.39397 8C2.90737 8 3.25335 7.67502 3.25335 7.19296C3.25335 6.70548 2.90737 6.3805 2.39397 6.3805C1.88058 6.3805 1.52902 6.70548 1.52902 7.19296C1.52902 7.67502 1.88058 8 2.39397 8Z"
        fill={color || 'white'}
      />
    </>
  ),
};
