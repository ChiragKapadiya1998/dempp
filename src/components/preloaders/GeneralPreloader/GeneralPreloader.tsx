import React from 'react';
import LottieView from 'lottie-react-native';

import { circle, final, slider } from '../../../utils/lottieSources';
import { GeneralPreloaderProps } from './types';
import { Colors } from '../../../styles';

const GeneralPreloader = ({ containerStyle, color = Colors.white }: GeneralPreloaderProps) => (
  <LottieView
    source={circle}
    style={containerStyle}
    colorFilters={[
      {
        keypath: 'spin_circle',
        color,
      },
    ]}
    autoPlay
    loop
  />
);

export default GeneralPreloader;
