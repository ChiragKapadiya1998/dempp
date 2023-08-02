import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const MicrophoneIcon: SvgIcon = {
  name: 'microphone-icon',
  baseWidth: 36,
  baseHeight: 36,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M17.9997 24.9225C19.9038 24.9225 21.5333 24.2446 22.889 22.8894C24.2445 21.5342 24.9223 19.9039 24.9223 18V6.92327C24.9223 5.01932 24.245 3.38968 22.889 2.03383C21.5333 0.67827 19.9038 0 17.9997 0C16.0958 0 14.4661 0.67827 13.1103 2.03383C11.7545 3.38946 11.0767 5.01932 11.0767 6.92327V18C11.0767 19.9038 11.7548 21.5342 13.1103 22.8894C14.4659 24.2446 16.0958 24.9225 17.9997 24.9225Z"
        fill={color || '#42526E'}
      />
      <Path
        d="M30.0498 14.2578C29.7765 13.9838 29.4513 13.8467 29.0763 13.8467C28.7017 13.8467 28.3772 13.9838 28.1028 14.2578C27.829 14.5318 27.692 14.8563 27.692 15.2312V18.0006C27.692 20.6689 26.7435 22.9512 24.8468 24.8478C22.9507 26.7445 20.6681 27.6928 17.9997 27.6928C15.3313 27.6928 13.0489 26.7445 11.1522 24.8478C9.25565 22.9518 8.30747 20.669 8.30747 18.0006V15.2312C8.30747 14.8563 8.17039 14.5318 7.89646 14.2578C7.62238 13.9838 7.29821 13.8467 6.92297 13.8467C6.54772 13.8467 6.22318 13.9838 5.94925 14.2578C5.67509 14.5318 5.53809 14.8563 5.53809 15.2312V18.0006C5.53809 21.1881 6.60198 23.961 8.72916 26.3189C10.8564 28.6769 13.485 30.029 16.615 30.3749V33.231H11.0766C10.7016 33.231 10.3771 33.3682 10.1031 33.6423C9.82905 33.9162 9.69197 34.2408 9.69197 34.6158C9.69197 34.9902 9.82905 35.3154 10.1031 35.5893C10.3771 35.8631 10.7016 36.0006 11.0766 36.0006H24.9223C25.2973 36.0006 25.6222 35.8632 25.8958 35.5893C26.1702 35.3155 26.3074 34.9903 26.3074 34.6158C26.3074 34.2409 26.1702 33.9162 25.8958 33.6423C25.6223 33.3682 25.2973 33.231 24.9223 33.231H19.3846V30.3749C22.5141 30.029 25.1425 28.6769 27.2699 26.3189C29.3974 23.961 30.4616 21.1881 30.4616 18.0006V15.2312C30.4616 14.8564 30.3242 14.5321 30.0498 14.2578Z"
        fill={color || '#42526E'}
      />
    </>
  ),
};
