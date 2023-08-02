import NavigationHelper from './NavigationHelper';
import requestErrors from './requestErrors';
import { actions as authActions } from '../ducks/auth';
import { dispatch } from '../store';
import { RTCPeerConnectionConfiguration } from 'react-native-webrtc';

/** Check if string does not contain whitespaces */
export const checkNoWhitespaces = (str?: string) => !/\s/.test(str ?? '');

/** Parse request error code */
export const parseRequestError = (code: string): string => requestErrors.find((error) => error.code === code)?.message ?? code;

/** Hide a phone number */
export const getHiddenPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length < 6) return phoneNumber;

  const phoneNumberHidden = phoneNumber
    .split('')
    .slice(phoneNumber.length - 6)
    .map((digit, index) => {
      if (index <= 2) return '*';
      return digit;
    });

  phoneNumberHidden.splice(3, 0, ' ');

  return phoneNumberHidden.join('');
};

/** Log out */
export const logOut = (): void => {
  NavigationHelper.goToLoginScreen();
  dispatch(authActions.logout());
};

/** Get cartesian coords from polar */
export const getCartesianFromPolar = (
  r: number, //
  phi: number, // degree
): { x: number; y: number } => ({
  x: r * Math.cos((phi * Math.PI) / 180),
  y: r * Math.sin((phi * Math.PI) / 180),
});

/** Ges sec from mmss string */
export const getSecsFromMmssString = (mmss: string): number => {
  const [mm, ss] = mmss.split(':');

  return +ss + 60 * +mm;
};

export const capitalizeFirst = (str) => {
  const capitalstr = str?.charAt(0).toUpperCase() + str.slice(1);
  return capitalstr.replace(/-/g, ' ');
};

export const fillterData = (grouped) => {
  let tempData = [];
  for (const property in grouped) {
    const t1 = grouped[property].filter((t2) => t2?.call?.status === 'finished');
    if (t1.length > 0) {
      tempData = [...tempData, ...t1];
    } else {
      tempData = [...tempData, grouped[property][0]];
    }
  }
  return tempData;
};

export const fontFamily = {
  rf_regular: 'Rubik-Regular',
  rf_medium: 'Rubik-Medium',
  rf_bold: 'Rubik-Bold',
  rf_black: 'Rubik-Black',
  rf_semibold: 'Rubik-SemiBold',
  rf_light: 'Rubik-Light',
};
