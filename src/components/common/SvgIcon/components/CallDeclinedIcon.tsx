import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const CallDeclinedIcon: SvgIcon = {
  name: 'call-declined-icon',
  baseWidth: 17,
  baseHeight: 18,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4939 2.33646L12.8915 3.94482L14.4939 5.55319C14.6056 5.66532 14.6668 5.81393 14.6668 5.97132C14.6668 6.12871 14.6056 6.27732 14.4939 6.38945C14.3828 6.50091 14.2355 6.56238 14.078 6.56238C13.9205 6.56238 13.7731 6.50091 13.6614 6.38945L12.0591 4.78042L10.456 6.38945C10.2333 6.61237 9.84631 6.61237 9.62356 6.38945C9.51252 6.27732 9.45128 6.12871 9.45128 5.97132C9.45128 5.81393 9.51252 5.66532 9.62356 5.55319L11.2259 3.94482L9.62356 2.33646C9.51252 2.22433 9.45128 2.07572 9.45128 1.91833C9.45128 1.76094 9.51252 1.61233 9.62356 1.50019C9.84631 1.27728 10.2333 1.27728 10.456 1.50019L12.0591 3.10923L13.6614 1.50019C13.8842 1.27728 14.2711 1.27728 14.4939 1.50019C14.6056 1.61233 14.6668 1.76094 14.6668 1.91833C14.6668 2.07572 14.6056 2.22433 14.4939 2.33646ZM10.7934 9.99581C11.0985 9.81984 11.4431 9.6211 11.8778 9.71358C12.2714 9.79667 13.614 10.8862 13.9808 11.2639C14.2224 11.5111 14.3556 11.7664 14.3772 12.0218C14.4128 13.0235 13.0528 14.1671 12.8044 14.3097C12.4754 14.5468 12.0924 14.6663 11.6624 14.6663C11.223 14.6663 10.7337 14.5414 10.1987 14.2921C7.29951 13.0816 2.87067 8.73884 1.69969 5.86054C1.21448 4.78987 1.21111 3.90632 1.69162 3.24231C1.88341 2.9309 2.97767 1.62921 3.95617 1.67042C4.21661 1.69271 4.47033 1.82646 4.71798 2.06964C5.0935 2.43779 6.15545 3.78406 6.23756 4.17922C6.32841 4.6183 6.12921 4.96753 5.95289 5.27421C5.91523 5.33973 5.86464 5.41742 5.80922 5.50252C5.59729 5.82799 5.31475 6.26189 5.41451 6.53874C6.12853 8.29233 7.778 9.82234 9.53177 10.5411C9.80344 10.6396 10.2356 10.3562 10.5595 10.1438C10.644 10.0883 10.7212 10.0377 10.7862 10L10.7934 9.99581Z"
        fill={color}
      />
    </>
  ),
};