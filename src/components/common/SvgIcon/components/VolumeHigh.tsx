import React from 'react';
import { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const VolumeHigh: SvgIcon = {
  name: 'volume-high',
  baseWidth: 16,
  baseHeight: 16,
  Content: ({ color }: ContentProps) => (
    <>
      <G clip-path="url(#clip0)">
        <Path
          d="M9.29813 0.586093C9.11253 0.497559 8.89387 0.521026 8.73387 0.650093L3.5456 4.80049H1.06667C0.478933 4.80049 0 5.27943 0 5.86716V10.1338C0 10.7226 0.478933 11.2005 1.06667 11.2005H3.5456L8.7328 15.3509C8.82987 15.4277 8.94827 15.4672 9.06667 15.4672C9.1456 15.4672 9.22453 15.449 9.29813 15.4138C9.48267 15.3253 9.6 15.1386 9.6 14.9338V1.06716C9.6 0.862359 9.48267 0.675693 9.29813 0.586093Z"
          fill={color}
        />
        <Path
          d="M12.2995 4.22867C12.0893 4.02174 11.7523 4.02494 11.5454 4.23294C11.3384 4.44307 11.3406 4.78014 11.5496 4.98814C12.356 5.78387 12.7997 6.85374 12.7997 8.00041C12.7997 9.14707 12.356 10.2169 11.5496 11.0127C11.3406 11.2185 11.3384 11.5567 11.5454 11.7668C11.6499 11.8724 11.7875 11.9247 11.924 11.9247C12.0595 11.9247 12.1949 11.8735 12.2995 11.77C13.3107 10.7748 13.8664 9.43507 13.8664 8.00041C13.8664 6.56574 13.3107 5.22601 12.2995 4.22867Z"
          fill={color}
        />
        <Path
          d="M13.805 2.72561C13.5948 2.51761 13.2578 2.51974 13.0498 2.72881C12.8428 2.93787 12.845 3.27601 13.053 3.48294C14.2658 4.68507 14.9335 6.28934 14.9335 8.00027C14.9335 9.71121 14.2658 11.3144 13.053 12.5165C12.845 12.7245 12.8428 13.0627 13.0498 13.2717C13.1554 13.3763 13.2919 13.4285 13.4284 13.4285C13.5639 13.4285 13.7004 13.3773 13.805 13.2739C15.2215 11.8712 16.0002 9.99814 16.0002 8.00027C16.0002 6.00241 15.2215 4.12934 13.805 2.72561Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="16" height="16" fill={color} />
        </ClipPath>
      </Defs>
    </>
  ),
};