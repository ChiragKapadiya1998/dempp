import React from 'react';
import { Path } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const CallMissedIconClose: SvgIcon = {
  name: 'call-missed-icon-close',
  baseWidth: 16,
  baseHeight: 19,
  Content: ({ color }: ContentProps) => (
    <>
      <Path
        d="M6.53425 15.7666C7.94477 15.7666 9.26182 15.3184 10.3324 14.5713L14.3601 18.5059C14.547 18.6885 14.7934 18.7798 15.0483 18.7798C15.6006 18.7798 16 18.3647 16 17.8335C16 17.5845 15.915 17.3521 15.7281 17.1694L11.726 13.2515C12.5672 12.1724 13.0685 10.8359 13.0685 9.3833C13.0685 5.87207 10.1285 3 6.53425 3C2.93149 3 0 5.87207 0 9.3833C0 12.8945 2.93149 15.7666 6.53425 15.7666ZM6.53425 14.3887C3.72172 14.3887 1.41052 12.1226 1.41052 9.3833C1.41052 6.64404 3.72172 4.37793 6.53425 4.37793C9.33829 4.37793 11.658 6.64404 11.658 9.3833C11.658 12.1226 9.33829 14.3887 6.53425 14.3887Z"
        fill={color}
      />
      <Path d="M7.16602 6L9.72514 3L13.8197 5.5L10.237 8.5L7.16602 6Z" fill="#4A5362" />
      <Path
        d="M13.6149 3.26477L15.6652 1.25432C15.8081 1.11415 15.8865 0.928389 15.8865 0.73165C15.8865 0.534911 15.8081 0.349148 15.6652 0.208982C15.3802 -0.0696608 14.885 -0.0696608 14.6 0.208982L12.5497 2.22028L10.4985 0.208982C10.2135 -0.0696608 9.71836 -0.0696608 9.43334 0.208982C9.29125 0.349148 9.21289 0.534911 9.21289 0.73165C9.21289 0.928389 9.29125 1.11415 9.43334 1.25432L11.4836 3.26477L9.43334 5.27522C9.29125 5.41539 9.21289 5.60115 9.21289 5.79789C9.21289 5.99463 9.29125 6.18039 9.43334 6.32056C9.71836 6.5992 10.2135 6.5992 10.4985 6.32056L12.5497 4.30926L14.6 6.32056C14.7429 6.45988 14.9315 6.53672 15.133 6.53672C15.3345 6.53672 15.5231 6.45988 15.6652 6.32056C15.8081 6.18039 15.8865 5.99463 15.8865 5.79789C15.8865 5.60115 15.8081 5.41539 15.6652 5.27522L13.6149 3.26477Z"
        fill={color}
      />
    </>
  ),
};
