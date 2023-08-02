import { StoreState } from '../../store';

export const getIsCodeChecking = (state: StoreState) =>
  state.auth.isCodeChecking;

export const getIsPhoneNumberSending = (state: StoreState) =>
  state.auth.isPhoneNumberSending;

export const getIsUserRegistrating = (state: StoreState) =>
  state.auth.isUserRegistrating;

export const getIsUserAuthorizing = (state: StoreState) =>
  state.auth.isUserAuthorizing;

export const getIsPasswordResetting = (state: StoreState) =>
  state.auth.isPasswordResetting;

export const getIsUsernameUnicityChecking = (state: StoreState) =>
  state.auth.isUsernameUnicityChecking;
  
export const getIsUserNameUnicityChecking = (state: StoreState) =>
  state.auth.isUserNameUnicityChecking;