import React from 'react';
import { Path, Defs, Stop, RadialGradient } from 'react-native-svg';
import { SvgIcon } from '../types';

export const GrowIcon: SvgIcon = {
  name: 'grow-icon',
  baseWidth: 84,
  baseHeight: 113,
  Content: () => (
    <>
      <Path
        d="M74.1421 99.8049C74.1421 106.964 58.8694 112.789 39.7785 113C39.362 113 38.9454 113 38.5289 113C37.9735 113 37.4876 113 37.0016 113C18.119 112.719 2.98511 106.894 2.98511 99.8049C2.98511 92.7161 18.0496 86.8906 37.0016 86.6099C37.4876 86.6099 38.043 86.6099 38.5289 86.6099C38.9454 86.6099 39.362 86.6099 39.7785 86.6099C58.8694 86.8204 74.1421 92.6459 74.1421 99.8049Z"
        fill="#FFC500"
      />
      <Path
        d="M39.7786 25.267V113C39.362 113 38.9455 113 38.529 113C37.9736 113 37.4877 113 37.0017 113V25.267C37.0017 24.495 37.6265 23.8633 38.3901 23.8633C39.1538 23.8633 39.7786 24.495 39.7786 25.267Z"
        fill="#2373E4"
      />
      <Path
        d="M50.5389 37.6901C52.2744 36.4267 54.4959 36.0758 56.5786 36.7075C59.1471 37.4795 62.2017 38.4621 62.2017 38.4621C67.8248 40.2168 73.7257 36.9882 75.3918 31.3733C77.1273 25.6882 73.9339 19.7224 68.3802 18.0379L60.0496 15.441C54.4265 13.6864 48.5257 16.9149 46.8595 22.5298L41.0976 41.6205C40.7504 42.8137 42.0695 43.7963 43.1108 43.0944L50.5389 37.6901Z"
        fill="url(#paint0_radial_2843_32126)"
      />
      <Path
        d="M48.4562 62.8167C49.6364 61.9744 51.1637 61.6937 52.5521 62.1148C54.2876 62.6763 56.4397 63.308 56.4397 63.308C60.2579 64.5011 64.2843 62.3254 65.4645 58.4651C66.6447 54.6049 64.4926 50.5341 60.6744 49.3409L54.9819 47.5862C51.1637 46.3931 47.1372 48.5689 45.9571 52.4291L42 65.4136C41.7224 66.2558 42.6943 66.8875 43.3885 66.3962L48.4562 62.8167Z"
        fill="url(#paint1_radial_2843_32126)"
      />
      <Path
        d="M33.3918 18.1783C32.4893 17.0553 31.0314 16.4237 29.5736 16.4939C27.7686 16.564 25.5472 16.6342 25.5472 16.6342C21.5901 16.7746 18.1885 13.6864 18.0496 9.6156C17.8414 5.61498 20.9653 2.24603 24.9224 2.03547L30.8232 1.82491C34.7802 1.68454 38.1819 4.77274 38.3207 8.84355L38.8761 22.4597C38.9455 23.3019 37.8348 23.7231 37.2794 23.0914L33.3918 18.1783Z"
        fill="url(#paint2_radial_2843_32126)"
      />
      <Path
        d="M25.3389 50.7449C23.7422 49.6219 21.6596 49.3411 19.7852 50.043C17.4943 50.815 14.648 51.7977 14.648 51.7977C9.64965 53.5523 4.16535 50.815 2.42981 45.6914C0.694276 40.5678 3.40171 35.0231 8.46948 33.2685L15.967 30.6716C21.0348 28.9169 26.5191 31.6542 28.2546 36.7778L34.086 54.0436C34.4331 55.1666 33.2529 56.079 32.281 55.4473L25.3389 50.7449Z"
        fill="url(#paint3_radial_2843_32126)"
      />
      <Path
        d="M38.3901 69.6952C37.6265 69.6952 37.0017 69.0635 37.0017 68.2915C37.0017 61.8344 31.5868 55.0263 31.5174 54.9561C31.0314 54.3244 31.1009 53.4822 31.7257 52.9909C32.3504 52.4996 33.1835 52.5698 33.6695 53.2014C33.9471 53.4822 39.7785 60.8517 39.7785 68.2915C39.7785 69.0635 39.1538 69.6952 38.3901 69.6952Z"
        fill="#2373E4"
      />
      <Path
        d="M38.3901 30.952H38.3206C37.557 30.8819 37.0016 30.2502 37.0711 29.4781C37.557 22.8806 35.752 20.3539 35.752 20.3539C35.3355 19.7222 35.4049 18.88 36.0297 18.3887C36.6545 17.8974 37.4876 18.0378 37.9735 18.6694C38.2512 19.0204 40.4033 22.0384 39.8479 29.7589C39.7091 30.3906 39.1537 30.952 38.3901 30.952Z"
        fill="#2373E4"
      />
      <Path
        d="M38.3901 79.5209C37.6265 79.5209 37.0017 78.8892 37.0017 78.1172C37.0017 70.6774 42.8331 63.3079 43.1108 63.0271C43.5967 62.3954 44.4992 62.3253 45.0546 62.8166C45.6794 63.3079 45.7488 64.2203 45.2629 64.7818C45.1934 64.852 39.7786 71.66 39.7786 78.1172C39.7786 78.8892 39.1538 79.5209 38.3901 79.5209Z"
        fill="#2373E4"
      />
      <Path
        d="M38.3901 54.7455C37.6265 54.7455 37.0017 54.1138 37.0017 53.3418C37.0017 45.902 42.8331 38.5325 43.1108 38.2517C43.5967 37.6201 44.4992 37.5499 45.0546 38.0412C45.6794 38.5325 45.7488 39.4449 45.2629 40.0064C45.1934 40.0766 39.7786 46.8846 39.7786 53.3418C39.7786 54.1138 39.1538 54.7455 38.3901 54.7455Z"
        fill="#2373E4"
      />
      <Path
        d="M2.98512 21.056C4.63376 21.056 5.97025 19.7048 5.97025 18.038C5.97025 16.3712 4.63376 15.02 2.98512 15.02C1.33649 15.02 0 16.3712 0 18.038C0 19.7048 1.33649 21.056 2.98512 21.056Z"
        fill="url(#paint4_radial_2843_32126)"
      />
      <Path
        d="M81.0843 50.3234C82.6946 50.3234 84 49.0036 84 47.3756C84 45.7475 82.6946 44.4277 81.0843 44.4277C79.474 44.4277 78.1686 45.7475 78.1686 47.3756C78.1686 49.0036 79.474 50.3234 81.0843 50.3234Z"
        fill="url(#paint5_radial_2843_32126)"
      />
      <Path
        d="M61.9934 3.64969C62.9903 3.64969 63.7984 2.83268 63.7984 1.82484C63.7984 0.817011 62.9903 0 61.9934 0C60.9966 0 60.1885 0.817011 60.1885 1.82484C60.1885 2.83268 60.9966 3.64969 61.9934 3.64969Z"
        fill="url(#paint6_radial_2843_32126)"
      />
      <Path
        d="M55.6066 90.1892C56.6034 90.1892 57.4115 89.3722 57.4115 88.3644C57.4115 87.3566 56.6034 86.5396 55.6066 86.5396C54.6097 86.5396 53.8016 87.3566 53.8016 88.3644C53.8016 89.3722 54.6097 90.1892 55.6066 90.1892Z"
        fill="url(#paint7_radial_2843_32126)"
      />
      <Path
        d="M14.7868 74.678C15.7836 74.678 16.5917 73.861 16.5917 72.8532C16.5917 71.8453 15.7836 71.0283 14.7868 71.0283C13.7899 71.0283 12.9818 71.8453 12.9818 72.8532C12.9818 73.861 13.7899 74.678 14.7868 74.678Z"
        fill="url(#paint8_radial_2843_32126)"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(70.223 26.8697) rotate(17.178) scale(24.4398 24.6623)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint1_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61.8944 55.4636) rotate(17.2383) scale(16.6655 16.817)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint2_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(22.1858 7.58037) rotate(177.635) scale(16.6503 16.8331)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint3_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(7.06097 41.4439) rotate(161.005) scale(22.338 22.5322)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint4_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.75947 16.4728) scale(4.6654 4.7168)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint5_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(82.9285 46.0917) rotate(6.62304) scale(4.51771 4.56616)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint6_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(63.0597 0.894244) scale(2.76284 2.79328)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint7_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(56.6709 87.4772) scale(2.76283 2.79328)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
        <RadialGradient
          id="paint8_radial_2843_32126"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15.7985 71.9248) scale(2.76283 2.79329)"
        >
          <Stop stopColor="#4C9AFF" />
          <Stop offset="1" stopColor="#0052CC" />
        </RadialGradient>
      </Defs>
    </>
  ),
};
