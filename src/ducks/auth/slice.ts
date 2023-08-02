import { createSlice } from '@reduxjs/toolkit';
import { AUTH } from '../../utils/constants';

import {
  State,
  GetCodeRequest,
  GetCodeFailure,
  GetCodeSuccess,
  CheckCodeRequest,
  CheckCodeFailure,
  CheckCodeSuccess,
  SignUpRequest,
  SignUpFailure,
  SignUpSuccess,
  GetLoginCodeRequest,
  GetLoginCodeFailure,
  GetLoginCodeSuccess,
  LogInRequest,
  LogInFailure,
  LogInSuccess,
  PasswordResetRequest,
  PasswordResetFailure,
  PasswordResetSuccess,
  LogOut,
  CheckUsernameUnicityRequest,
  CheckUsernameUnicityFailure,
  CheckUsernameUnicitySuccess,
  SetUpUserProfileRequest,
  SetUpUserProfileFailure,
  SetUpUserProfileSuccess,
  LoginRegainCodeRequest,
  LoginRegainCodeFailure,
  LoginRegainCodeSuccess,
  LogoutRequest,
  ClearError,
  CheckUserNameUnicityRequest,
  CheckUserNameUnicityFailure,
  CheckUserNameUnicitySuccess,
  SetUserProfileRequest,
  SetUserProfileFailure,
  SetUserProfileSuccess,
  LoginUser,
} from './types';

const initialState: State = {
  isCodeChecking: false,
  isPhoneNumberSending: false,
  isUserRegistrating: false,
  isUserAuthorizing: false,
  isPasswordResetting: false,
  isUsernameUnicityChecking: false,
  isUserNameUnicityChecking: false,
  isUserProfileSetting: false,
  isUserNewProfileSetting: false,
  isLoginCodeFetching: false,
  phoneNumber: null,
  country: null,
  err: null,
  userName: '',
  loading: false,
  userNameError: null,
};

const name = AUTH;

/** Get registration code */
const getRegistrationCodeRequest: GetCodeRequest = (state, { payload }) => {
  state.isPhoneNumberSending = true;
  state.phoneNumber = payload.phoneNumber;
  state.country = payload.country;
  state.err = null;
};
const getRegistrationCodeFailure: GetCodeFailure = (state, { payload }) => {
  state.isPhoneNumberSending = false;
  state.err = payload;
};
const getRegistrationCodeSuccess: GetCodeSuccess = (state) => {
  state.isPhoneNumberSending = false;
  state.err = null;
};

/** Regain registration code */
const regainRegistrationCodeRequest: GetCodeRequest = (state) => {
  state.isPhoneNumberSending = true;
  state.err = null;
};
const regainRegistrationCodeFailure: GetCodeFailure = (state, { payload }) => {
  state.isPhoneNumberSending = false;
  state.err = payload;
};
const regainRegistrationCodeSuccess: GetCodeSuccess = (state) => {
  state.isPhoneNumberSending = false;
};

/** Check registration code */
const checkRegistrationCodeRequest: CheckCodeRequest = (state) => {
  state.isCodeChecking = true;
  state.err = null;
};
const checkRegistrationCodeFailure: CheckCodeFailure = (state, { payload }) => {
  state.isCodeChecking = false;
  state.err = payload;
};
const checkRegistrationCodeSuccess: CheckCodeSuccess = (state) => {
  state.isCodeChecking = false;
};

/** Registrate a new user */
const signUpRequest: SignUpRequest = (state) => {
  state.isUserRegistrating = true;
  state.err = null;
};
const signUpFailure: SignUpFailure = (state, { payload }) => {
  state.isUserRegistrating = false;
  state.err = payload;
};
const signUpSuccess: SignUpSuccess = (state) => {
  state.isUserRegistrating = false;
};

/** Get code to log in */
const getLoginCodeRequest: GetLoginCodeRequest = (state, { payload }) => {
  state.isLoginCodeFetching = true;
  state.phoneNumber = payload.username;
  state.err = null;
};
const getLoginCodeFailure: GetLoginCodeFailure = (state, { payload }) => {
  state.isLoginCodeFetching = false;
  state.err = payload;
};
const getLoginCodeSuccess: GetLoginCodeSuccess = (state) => {
  state.isLoginCodeFetching = false;
};

/** Regain code to log in */
const regainLoginCodeRequest: LoginRegainCodeRequest = () => undefined;
const regainLoginCodeFailure: LoginRegainCodeFailure = () => undefined;
const regainLoginCodeSuccess: LoginRegainCodeSuccess = () => undefined;

/** Log in */
const logInRequest: LogInRequest = (state) => {
  state.isUserAuthorizing = true;
  state.err = null;
};
const logInFailure: LogInFailure = (state, { payload }) => {
  state.isUserAuthorizing = false;
  state.err = payload;
};
const logInSuccess: LogInSuccess = (state) => {
  state.isUserAuthorizing = false;
};

/** Get reset password code */
const getPasswordResetCodeRequest: GetCodeRequest = (state) => {
  state.isPhoneNumberSending = true;
  state.err = null;
};
const getPasswordResetCodeFailure: GetCodeFailure = (state, { payload }) => {
  state.isPhoneNumberSending = false;
  state.err = payload;
};
const getPasswordResetCodeSuccess: GetCodeSuccess = (state) => {
  state.isPhoneNumberSending = false;
};

/** Check password reset code */
const checkPasswordResetCodeRequest: CheckCodeRequest = (state) => {
  state.isCodeChecking = true;
  state.err = null;
};
const checkPasswordResetCodeFailure: CheckCodeFailure = (state, { payload }) => {
  state.isCodeChecking = false;
  state.err = payload;
};
const checkPasswordResetCodeSuccess: CheckCodeSuccess = (state) => {
  state.isCodeChecking = false;
};

/** Reset password */
const resetPasswordRequest: PasswordResetRequest = (state) => {
  state.isPasswordResetting = true;
  state.err = null;
};
const resetPasswordFailure: PasswordResetFailure = (state, { payload }) => {
  state.isPasswordResetting = false;
  state.err = payload;
};
const resetPasswordSuccess: PasswordResetSuccess = (state) => {
  state.isPasswordResetting = false;
};

/** Log out */
const logout: LogOut = () => {};
const loginUser: LoginUser = () => {};
const logoutRequest: LogoutRequest = () => undefined;

/** Check username unicity */
const checkUsernameUnicityRequest: CheckUsernameUnicityRequest = (state) => {
  state.isUsernameUnicityChecking = true;
  state.err = null;
};
const checkUsernameUnicityFailure: CheckUsernameUnicityFailure = (state, { payload }) => {
  state.isUsernameUnicityChecking = false;
  state.err = payload;
};
const checkUsernameUnicitySuccess: CheckUsernameUnicitySuccess = (state) => {
  state.isUsernameUnicityChecking = false;
};

/** Set up user profile */
const setUpUserProfileRequest: SetUpUserProfileRequest = (state) => {
  state.isUserProfileSetting = true;
  state.err = null;
};
const setUpUserProfileFailure: SetUpUserProfileFailure = (state, { payload }) => {
  state.isUserProfileSetting = false;
  state.err = payload;
};
const setUpUserProfileSuccess: SetUpUserProfileSuccess = (state) => {
  state.isUserProfileSetting = false;
};

const clearError: ClearError = (state) => {
  state.err = null;
  state.userNameError = null;
};

//new UI onboardingSettingUp

/** Set up user profile  new UI*/
const setUserProfileRequest: SetUserProfileRequest = (state) => {
  state.isUserNewProfileSetting = true;
  state.err = null;
};
const setUserProfileFailure: SetUserProfileFailure = (state, { payload }) => {
  state.isUserNewProfileSetting = false;
  state.err = payload;
};
const setUserProfileSuccess: SetUserProfileSuccess = (state) => {
  state.isUserNewProfileSetting = false;
};

/** Check username unicity */
const checkUserNameUnicityRequest: CheckUserNameUnicityRequest = (state) => {
  state.loading = true;
  state.isUserNameUnicityChecking = true;
  state.err = null;
};
const checkUserNameUnicityFailure: CheckUserNameUnicityFailure = (state, { payload }) => {
  state.isUserNameUnicityChecking = false;
  state.err = payload;
  state.loading = false;
};
const checkUserNameUnicitySuccess: CheckUserNameUnicitySuccess = (state, { payload }) => {
  state.isUserNameUnicityChecking = false;
  state.userName = payload.userName;
  state.loading = false;
};

/** Check username unicity setting sceeen*/
const checkUserNameSettingRequest: CheckUserNameUnicityRequest = (state) => {
  state.err = null;
  state.userNameError = null;
};
const checkUserNameSettingFailure: CheckUserNameUnicityFailure = (state, { payload }) => {
  state.userNameError = payload;
  state.err = payload;
};
const checkUserNameSettingSuccess: CheckUserNameUnicitySuccess = (state, { payload }) => {
  state.userNameError = null;
};

const reducers = {
  getRegistrationCodeRequest,
  getRegistrationCodeFailure,
  getRegistrationCodeSuccess,
  regainRegistrationCodeRequest,
  regainRegistrationCodeFailure,
  regainRegistrationCodeSuccess,
  checkRegistrationCodeRequest,
  checkRegistrationCodeFailure,
  checkRegistrationCodeSuccess,
  signUpRequest,
  signUpFailure,
  signUpSuccess,
  getLoginCodeRequest,
  getLoginCodeFailure,
  getLoginCodeSuccess,
  regainLoginCodeRequest,
  regainLoginCodeFailure,
  regainLoginCodeSuccess,
  logInRequest,
  logInFailure,
  logInSuccess,
  getPasswordResetCodeRequest,
  getPasswordResetCodeFailure,
  getPasswordResetCodeSuccess,
  checkPasswordResetCodeRequest,
  checkPasswordResetCodeFailure,
  checkPasswordResetCodeSuccess,
  resetPasswordRequest,
  resetPasswordFailure,
  resetPasswordSuccess,
  logoutRequest,
  logout,
  checkUsernameUnicityRequest,
  checkUsernameUnicityFailure,
  checkUsernameUnicitySuccess,
  setUpUserProfileRequest,
  setUpUserProfileFailure,
  setUpUserProfileSuccess,
  clearError,
  //new UI
  checkUserNameUnicityRequest,
  checkUserNameUnicityFailure,
  checkUserNameUnicitySuccess,
  setUserProfileFailure,
  setUserProfileRequest,
  setUserProfileSuccess,
  loginUser,
  checkUserNameSettingRequest,
  checkUserNameSettingFailure,
  checkUserNameSettingSuccess,
};

export default createSlice({ name, initialState, reducers });
