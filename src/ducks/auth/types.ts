import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { E164Number, CountryCode } from 'libphonenumber-js';
import { LogInResponse, SignUpResponse } from '../../api/Auth.types';
import { Passion } from '../passions/types';

export type State = {
  isCodeChecking: boolean;
  isPhoneNumberSending: boolean;
  isUserRegistrating: boolean;
  isUserAuthorizing: boolean;
  isPasswordResetting: boolean;
  isUsernameUnicityChecking: boolean;
  isUserProfileSetting: boolean;
  isUserNewProfileSetting: boolean;
  isUserNameUnicityChecking: boolean;
  isLoginCodeFetching: boolean;
  phoneNumber: E164Number | null;
  country: CountryCode | null;
  err: string | null;
  userName: string;
  loading: boolean;
  userNameError: string | null;
};

/** Get code */
export type GetCodeRequestAction = PayloadAction<{
  phoneNumber: E164Number;
  country: CountryCode;
}>;
export type GetCodeRequest = CaseReducer<State, GetCodeRequestAction>;
export type GetCodeFailure = CaseReducer<State, PayloadAction<string>>;
export type GetCodeSuccess = CaseReducer<State>;

/** LEGACY: Check signup code */
export type CheckCodeRequestAction = PayloadAction<{
  phoneNumber: E164Number;
  country: CountryCode;
  code: string;
}>;
export type CheckCodeRequest = CaseReducer<State, CheckCodeRequestAction>;
export type CheckCodeFailure = CaseReducer<State, PayloadAction<string>>;
export type CheckCodeSuccess = CaseReducer<State>;

/** Registrate a new user */
export type SignUpRequestAction = PayloadAction<{
  phoneNumber: E164Number;
  country: CountryCode;
  code: string;
}>;
export type SignUpRequest = CaseReducer<State, SignUpRequestAction>;
export type SignUpFailure = CaseReducer<State, PayloadAction<string>>;
export type SignUpSuccessAction = PayloadAction<SignUpResponse>;
export type SignUpSuccess = CaseReducer<State, SignUpSuccessAction>;

/** Get code to log in */
export type GetLoginCodeRequestAction = PayloadAction<{
  username: E164Number;
}>;
export type GetLoginCodeRequest = CaseReducer<State, GetLoginCodeRequestAction>;
export type GetLoginCodeFailure = CaseReducer<State, PayloadAction<string>>;
export type GetLoginCodeSuccessAction = PayloadAction<LogInResponse>;
export type GetLoginCodeSuccess = CaseReducer<State, GetLoginCodeSuccessAction>;

/** Regain code to log in */
export type LoginRegainCodeRequestAction = PayloadAction<{
  username: E164Number;
}>;
export type LoginRegainCodeRequest = CaseReducer<State, LoginRegainCodeRequestAction>;
export type LoginRegainCodeFailure = CaseReducer<State, PayloadAction<string>>;
export type LoginRegainCodeSuccessAction = PayloadAction<LogInResponse>;
export type LoginRegainCodeSuccess = CaseReducer<State, LoginRegainCodeSuccessAction>;

/** Log in */
export type LogInRequestAction = PayloadAction<{
  username: E164Number;
  code: string;
}>;
export type LogInRequest = CaseReducer<State, LogInRequestAction>;
export type LogInFailure = CaseReducer<State, PayloadAction<string>>;
export type LogInSuccessAction = PayloadAction<LogInResponse>;
export type LogInAction = PayloadAction<LogInResponse>;
export type LogInSuccess = CaseReducer<State, LogInSuccessAction>;
export type LogSuccessAction = PayloadAction<{ username: string }>;

/** Reset password */
export type PasswordResetRequestAction = PayloadAction<{
  phoneNumber: E164Number;
  code: string;
  password: string;
  passwordConfirmation: string;
}>;
export type PasswordResetRequest = CaseReducer<State, PasswordResetRequestAction>;
export type PasswordResetFailure = CaseReducer<State, PayloadAction<string>>;
export type PasswordResetSuccess = CaseReducer<State>;

/** Log out */
export type LogOut = CaseReducer<State>;
export type LoginUser = CaseReducer<State, LogSuccessAction>;
export type LogoutRequest = CaseReducer<State>;

/** Check username unicity */
export type CheckUsernameUnicityRequestAction = PayloadAction<{
  username: string;
  fullName: string;
  tagline: string;
  profileImage?: string;
  profileAudio: string;
  profileAudioDuration: number;
}>;
/** Check username unicity */
export type CheckUserNameUnicityRequestActions = PayloadAction<{
  username: string;
  newUser: boolean;
  loading: boolean;
}>;
export type CheckUsernameUnicityRequest = CaseReducer<State, CheckUsernameUnicityRequestAction>;
export type CheckUserNameUnicityRequest = CaseReducer<State, CheckUserNameUnicityRequestActions>;
export type CheckUsernameUnicityFailure = CaseReducer<State, PayloadAction<string>>;
export type CheckUserNameUnicityFailure = CaseReducer<State, PayloadAction<string>>;
export type CheckUsernameUnicitySuccess = CaseReducer<State>;
export type CheckUserNameUnicitySuccess = CaseReducer<State, PayloadAction<{ userName: string }>>;
export type CheckUserNameSettingSuccess = CaseReducer<State>;

/** Set up user profile */
export type SetUpUserProfileRequestAction = PayloadAction<{
  username: string;
  fullName: string;
  tagline: string;
  profileImage?: string;
  profileAudio: string;
  profileAudioDuration: number;
  passions: Passion[];
}>;
export type SetUpUserProfileRequest = CaseReducer<State, SetUpUserProfileRequestAction>;
export type SetUserProfileRequest = CaseReducer<State, SetUpUserProfileRequestAction>;

export type SetUpUserProfileFailure = CaseReducer<State, PayloadAction<string>>;
export type SetUserProfileFailure = CaseReducer<State, PayloadAction<string>>;

export type SetUpUserProfileSuccessAction = PayloadAction<{ username: string }>;
export type SetUserProfileSuccessAction = PayloadAction<{ username: string }>;
export type SetUpUserProfileSuccess = CaseReducer<State, SetUpUserProfileSuccessAction>;
export type SetUserProfileSuccess = CaseReducer<State, SetUserProfileSuccessAction>;
export type ClearError = CaseReducer<State>;
/** Set up user profile new */
export type SetUserProfileRequestAction = PayloadAction<{
  username: string;
  fullName: string;
  tagline: string;
  profileImage?: string;
  profileAudio: string;
  profileAudioDuration: number;
  passions: Passion[];
  isProfileFilled: boolean;
  isOnBoardingFinished: boolean;
}>;
