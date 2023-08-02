import React, { forwardRef } from 'react';
import LottieView from 'lottie-react-native';

import { dots } from '../../../utils/lottieSources';
import { DotsPreloaderProps } from './types';

const DotsPreloader = forwardRef<LottieView, DotsPreloaderProps>(
  ({ autoPlay = true, loop = true, containerStyle }, ref) => (
    <LottieView
      ref={ref}
      source={dots}
      style={containerStyle}
      autoPlay={autoPlay}
      loop={loop}
    />
  ),
);

export default DotsPreloader;
