import React from 'react';
import { Path, Circle } from 'react-native-svg';
import { ContentProps, SvgIcon } from '../types';

export const ParlaOnion: SvgIcon = {
  name: 'parla-onion',
  baseWidth: 72,
  baseHeight: 72,
  Content: ({ color }: ContentProps) => (
    <>
      <Circle opacity="0.2" cx="36" cy="36" r="36" fill="#0052CC" />
      <Circle
        opacity="0.2"
        cx="36.4932"
        cy="36.4933"
        r="31.5616"
        fill="#0052CC"
      />
      <Circle
        opacity="0.2"
        cx="36.4932"
        cy="36.4934"
        r="25.6438"
        fill="#0052CC"
      />
      <Circle cx="36.4932" cy="36.4936" r="21.6986" fill="#0052CC" />
      <Path
        d="M53.5598 27.2483C53.5598 29.6138 52.9424 31.7845 51.7075 33.7603C50.4726 35.7362 48.6765 37.3502 46.319 38.6025C43.9616 39.8548 41.1551 40.5923 37.8995 40.8149L36.0894 50.8751C35.3877 54.7433 33.4793 56.6774 30.3641 56.6774C28.6521 56.6774 27.0665 56.1765 25.6071 55.1747C24.1758 54.1728 23.0251 52.6422 22.1551 50.5829C21.2851 48.5236 20.8501 45.9911 20.8501 42.9856C20.8501 37.3363 21.7622 32.5498 23.5864 28.6259C25.4387 24.6742 27.9084 21.7243 30.9956 19.7763C34.1108 17.8004 37.5347 16.8125 41.2673 16.8125C43.9054 16.8125 46.1366 17.2717 47.9608 18.19C49.8131 19.1084 51.2023 20.3607 52.1285 21.9469C53.0827 23.5054 53.5598 25.2725 53.5598 27.2483ZM38.6573 36.5154C44.4106 35.7918 47.2873 32.828 47.2873 27.624C47.2873 25.7873 46.6698 24.2985 45.435 23.1575C44.2282 21.9887 42.3478 21.4043 39.7939 21.4043C36.9032 21.4043 34.3774 22.3087 32.2164 24.1176C30.0835 25.9265 28.4276 28.445 27.2489 31.6731C26.0982 34.8735 25.5229 38.533 25.5229 42.6517C25.5229 44.377 25.6913 45.9076 26.0281 47.2434C26.3929 48.5792 26.842 49.6228 27.3752 50.3742C27.9365 51.0977 28.4697 51.4595 28.9749 51.4595C29.6765 51.4595 30.2098 50.4994 30.5746 48.5792L31.9638 40.6897C30.8693 40.5227 30.3922 40.4532 30.5325 40.481C29.6906 40.3419 29.1433 40.0914 28.8907 39.7296C28.6381 39.34 28.5118 38.853 28.5118 38.2686C28.5118 37.6564 28.6802 37.1694 29.017 36.8076C29.3818 36.4458 29.873 36.2649 30.4904 36.2649C30.7711 36.2649 30.9815 36.2788 31.1219 36.3067C31.7954 36.418 32.3146 36.4875 32.6795 36.5154C33.0443 34.3447 33.5635 31.4366 34.2371 27.791C34.4055 26.8448 34.7843 26.1769 35.3737 25.7873C35.9911 25.3699 36.7068 25.1612 37.5207 25.1612C38.4468 25.1612 39.1063 25.3421 39.4992 25.7038C39.9202 26.0378 40.1307 26.5804 40.1307 27.3318C40.1307 27.7771 40.1026 28.1389 40.0465 28.4172L38.6573 36.5154Z"
        fill="white"
      />
    </>
  ),
};
