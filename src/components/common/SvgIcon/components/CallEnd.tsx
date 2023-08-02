import React from 'react';
import { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const CallEnd: SvgIcon = {
  name: 'callEnd',
  baseWidth: 68,
  baseHeight: 68,
  Content: ({ color }: ContentProps) => (
    <>
      <Circle cx="34" cy="34" r="34" fill="url(#paint0_linear_4343_45059)" />
      <Path
        d="M24.2439 40.2135C25.1519 39.627 25.3961 38.689 25.6166 37.8626C25.8404 37.0143 26.0328 35.1682 26.8287 34.7956C31.0515 33.0359 36.483 32.8407 40.7041 34.6261C41.5154 35.0082 41.7182 36.857 41.9506 37.7092C42.1749 38.535 42.4319 39.4715 43.3397 40.0693C44.1562 40.6058 48.2722 41.0993 49.543 41.089C50.3817 41.083 51.0434 40.8792 51.5246 40.472C53.2664 38.8736 52.9032 34.7799 52.6972 33.9197C52.38 31.9634 50.8628 30.4554 48.2 29.45C41.2764 26.5209 26.2878 26.6401 19.2707 29.5126C17.9314 29.9984 16.883 30.6189 16.1335 31.3685C15.4 32.1019 14.9516 32.9597 14.7962 33.9269C14.6167 34.5945 14.2547 38.8721 16.0305 40.5262C16.5044 40.9266 17.1699 41.1353 18.0041 41.1477C19.2761 41.1685 23.4314 40.7439 24.2439 40.2135Z"
        fill="white"
      />
      <Defs>
        <LinearGradient id="paint0_linear_4343_45059" x1="34" y1="0" x2="34" y2="68" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F21F52" />
        <Stop offset="1" stopColor="#F21F52" stopOpacity="0.67"/>
        </LinearGradient>
      </Defs>
    </>
  ),
};
