import React from 'react';
import { Path } from 'react-native-svg';
import { SvgIcon } from '../types';

export const ParlaPushIcon: SvgIcon = {
  name: 'parla-push-icon',
  baseWidth: 36,
  baseHeight: 36,
  Content: ({ color = 'white' }) => (
    <>
      <Path
        d="M9.37345 18.4298C10.2069 17.3331 11.5054 16.6926 12.8828 16.6926C14.5936 16.6926 16.6817 16.7014 16.6817 16.7014C20.4368 16.7014 23.4724 13.657 23.4724 9.91076C23.4724 6.15573 20.428 3.12012 16.6817 3.12012H11.1106C7.35556 3.12012 4.31995 6.1645 4.31995 9.91076V22.5796C4.31995 23.3868 5.33766 23.7289 5.82898 23.0885L9.37345 18.4298Z"
        fill={color}
      />
      <Path
        d="M26.5518 17.6668C25.7183 18.7635 24.4198 19.404 23.0424 19.404C21.3316 19.404 19.2435 19.3952 19.2435 19.3952C15.4885 19.3952 12.4529 22.4396 12.4529 26.1858C12.4529 29.9409 15.4973 32.9765 19.2435 32.9765H24.8147C28.5697 32.9765 31.6053 29.9321 31.6053 26.1858V13.517C31.6053 12.7098 30.5876 12.3677 30.0963 13.0081L26.5518 17.6668Z"
        fill={color}
      />
    </>
  ),
};