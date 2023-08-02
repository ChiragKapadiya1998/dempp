import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
// import { NativeModules } from 'react-native';

// const { CustomModule } = NativeModules;
import AuthApi from '../api/Auth';
import UserApi from '../api/User';
import NavigationHelper from '../utils/NavigationHelper';
import showAlert from '../utils/showAlert';
import { Await } from '../utils/types';
import { Pages } from '../navigators/Routes';
import { actions } from '../ducks/auth';
import { actions as inviteActions } from '../ducks/invite';
import { handleRequestErrorSaga } from './errorSaga';
import { getState, StoreState } from '../store';
import { AuthStackParamList, RootStackParamListParams, SetUpProfileStackParamList } from '../navigators/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { actions as userActions } from '../ducks/user';
import { actions as errorAction } from '../ducks/errors';

import {
  CheckCodeRequestAction,
  CheckUsernameUnicityRequestAction,
  CheckUserNameUnicityRequestActions,
  GetCodeRequestAction,
  GetLoginCodeRequestAction,
  LogInRequestAction,
  PasswordResetRequestAction,
  SetUpUserProfileRequestAction,
  SetUserProfileRequestAction,
  SignUpRequestAction,
} from '../ducks/auth/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESSTOKEM, USER_NAME } from '../utils/constants';

/** Get registration code */
function* getRegistrationCodeSaga({ payload: { phoneNumber }, type }: GetCodeRequestAction) {
  try {
    yield call<typeof AuthApi.getRegistrationCode>(AuthApi.getRegistrationCode, phoneNumber);
    yield put(actions.getRegistrationCodeSuccess());
    yield handleRequestErrorSaga({ actionType: '' });
    yield put(errorAction.removeError());
    NavigationHelper.push<AuthStackParamList, Pages.SignUpCodeScreen>(Pages.SignUpCodeScreen);
  } catch (error: any) {
    yield put(actions.getRegistrationCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Regain registration code */
function* regainRegistrationCodeSaga({ payload: { phoneNumber }, type }: GetCodeRequestAction) {
  try {
    yield call<typeof AuthApi.getRegistrationCode>(AuthApi.getRegistrationCode, phoneNumber);
    yield put(actions.regainRegistrationCodeSuccess());
    yield handleRequestErrorSaga({ actionType: '' });
    showAlert('Resend', 'Code has been resend');
  } catch (error: any) {
    yield put(actions.regainRegistrationCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** LEGACY: Check registration code */
function* checkRegistrationCodeSaga({ payload, type }: CheckCodeRequestAction) {
  try {
    yield call<typeof AuthApi.checkRegistrationCode>(AuthApi.checkRegistrationCode, {
      phone: payload.phoneNumber,
      code: payload.code,
    });

    yield put(actions.checkRegistrationCodeSuccess());
    NavigationHelper.push<AuthStackParamList, Pages.SignUpCredentialsScreen>(Pages.SignUpCredentialsScreen);
  } catch (error: any) {
    yield put(actions.checkRegistrationCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Registrate a new user */
function* signUpUserSaga({ payload: { phoneNumber, code, country }, type }: SignUpRequestAction) {
  const params = {
    phone: phoneNumber,
    code,
    country,
  };
  const { inviteData }: StoreState['invite'] = yield select((state: StoreState) => state.invite);
  try {
    const payload = inviteData
      ? {
          ...params,
          inviteId: inviteData?.type === 'invite' ? inviteData.id : undefined,
          groupId: inviteData?.type === 'group-invite' ? inviteData.id : undefined,
        }
      : params;
    const response: Await<ReturnType<typeof AuthApi.signUpUser>> = yield call<typeof AuthApi.signUpUser>(AuthApi.signUpUser, payload);
    yield handleRequestErrorSaga({ actionType: '' });
    yield AsyncStorage.setItem(ACCESSTOKEM, response?.token?.accessToken);
    // TODO: open the congrats screen and then go to the setup profile
    yield put(actions.signUpSuccess(response));
    yield Promise.all([crashlytics().setUserId(response.user.id.toString()), crashlytics().setAttribute('token', response.token.accessToken)]);
    yield put(inviteActions.updateInviteData(null));
    yield put(errorAction.removeError());
    NavigationHelper.goToSetupProfileScreen();
  } catch (error: any) {
    yield put(actions.signUpFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Get login code */
function* getLoginCodeSaga({ payload: { username }, type }: GetLoginCodeRequestAction): any {
  try {
    const response: Await<ReturnType<typeof AuthApi.getLoginCode>> = yield call<typeof AuthApi.getLoginCode>(AuthApi.getLoginCode, username);

    yield put(actions.getLoginCodeSuccess(response));
    yield handleRequestErrorSaga({ actionType: '' });

    NavigationHelper.push<AuthStackParamList, Pages.LogInCodeScreen>(Pages.LogInCodeScreen);
  } catch (error: any) {
    yield put(actions.getLoginCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Regain login code */
function* regainLoginCodeSaga({ payload: { username }, type }: GetLoginCodeRequestAction): any {
  try {
    const response: Await<ReturnType<typeof AuthApi.getLoginCode>> = yield call<typeof AuthApi.getLoginCode>(AuthApi.getLoginCode, username);

    yield put(actions.regainLoginCodeSuccess(response));

    showAlert('Login', 'Code has been resent');
  } catch (error: any) {
    yield put(actions.regainLoginCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Log in */
function* logInSaga({ payload: { username, code }, type }: LogInRequestAction): any {
  try {
    const response: Await<ReturnType<typeof AuthApi.logIn>> = yield call<typeof AuthApi.logIn>(AuthApi.logIn, username, code);
    let finalName = response?.user?.name ? response?.user?.name : 'parla';
    yield AsyncStorage.setItem(USER_NAME, finalName);
    yield AsyncStorage.setItem(ACCESSTOKEM, response?.token?.accessToken);
    // CustomModule.getTokenFromAsyncStorage().then((token) => {
    //   // Pass the token to OneSignalServiceExtension
    //   console.log('tokentokentokentoken', token);

    //   CustomModule.sendTokenToOneSignalServiceExtension(token);
    // });

    yield put(actions.logInSuccess(response));
    yield Promise.all([crashlytics().setUserId(response.user.id.toString()), crashlytics().setAttribute('token', response.token.accessToken)]);

    yield handleRequestErrorSaga({ actionType: '' });
    yield put(errorAction.removeError());
    if (response?.user?.username) {
      yield put(actions.loginUser({ username: response?.user?.username }));
      NavigationHelper.goToHomeScreen();
    } else {
      NavigationHelper.goToSetupProfileScreen();
    }
  } catch (error: any) {
    yield put(actions.logInFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Get password reset code */
function* getPasswordResetCodeSaga({ payload: { phoneNumber }, type }: GetCodeRequestAction) {
  try {
    yield call<typeof AuthApi.getPasswordResetCode>(AuthApi.getPasswordResetCode, phoneNumber);
    yield put(actions.getPasswordResetCodeSuccess());
    NavigationHelper.push<AuthStackParamList, Pages.PasswordResetCodeScreen>(Pages.PasswordResetCodeScreen);
  } catch (error: any) {
    yield put(actions.getPasswordResetCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Check password reset code */
function* checkPasswordResetCodeSaga({ payload: { phoneNumber, code }, type }: CheckCodeRequestAction) {
  try {
    yield call<typeof AuthApi.checkPasswordResetCode>(AuthApi.checkPasswordResetCode, phoneNumber, code);

    yield put(actions.checkPasswordResetCodeSuccess());
    NavigationHelper.push<AuthStackParamList, Pages.PasswordResetCredentialsScreen>(Pages.PasswordResetCredentialsScreen);
  } catch (error: any) {
    yield put(actions.checkPasswordResetCodeFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Reset password */
function* resetPasswordSaga({ payload: { phoneNumber, code, passwordConfirmation, password }, type }: PasswordResetRequestAction) {
  const params = {
    phone: phoneNumber,
    code,
    passwordConfirmation,
    password,
  };

  try {
    yield call<typeof AuthApi.resetPassword>(AuthApi.resetPassword, params);
    yield put(actions.resetPasswordSuccess());
    NavigationHelper.goToLoginScreen();
    yield delay(1500);
    // TODO: run here toast instead of alert
    showAlert('Password reset', 'Password has been changed successfully');
  } catch (error: any) {
    yield put(actions.resetPasswordFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Check username unicity */
function* checkUsernameUnicitySaga({
  type,
  payload: { username, fullName, tagline, profileAudio, profileImage, profileAudioDuration },
}: CheckUsernameUnicityRequestAction) {
  const token = getState().token.accessToken;
  const originalUsername = getState().token.username;

  try {
    if (!token) throw new Error('Not authorized');

    // check username unicity if it has been changed
    if (originalUsername !== username) {
      yield call<typeof UserApi.checkUsernameUnicity>(UserApi.checkUsernameUnicity, token, username);
    }

    NavigationHelper.push<SetUpProfileStackParamList, Pages.SetUpProfilePassionsScreen>(Pages.SetUpProfilePassionsScreen, {
      username,
      fullName,
      tagline,
      profileAudio,
      profileImage,
      profileAudioDuration,
    });

    yield put(actions.checkUsernameUnicitySuccess());
  } catch (error: any) {
    yield put(actions.checkUsernameUnicityFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...(error as object) });
  }
}

function* logoutWorker() {
  yield delay(1000);
  yield put(actions.logout());
  yield put(errorAction.removeError());
}

/** Set up user profile */
function* setUpUserProfileSaga({ payload, type }: SetUpUserProfileRequestAction): any {
  const token = getState().token.accessToken;
  const { fullName, username, tagline, profileAudio, profileImage, passions, profileAudioDuration } = payload;

  try {
    if (!token) throw new Error('Not authorized');

    yield call<typeof UserApi.setUpUserProfile>(UserApi.setUpUserProfile, token, {
      avatar: profileImage ?? '',
      name: fullName,
      passions,
      tagline,
      taglineAudio: profileAudio,
      username,
      taglineAudioDuration: profileAudioDuration * 1000,
    });

    yield put(actions.setUpUserProfileSuccess({ username }));
    NavigationHelper.goToHomeScreen();
  } catch (error: any) {
    yield put(actions.setUpUserProfileFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type });
  }
}

/** Check username unicity new UI */
function* checkUserNameUnicitySaga({ type, payload: { username, newUser } }: CheckUserNameUnicityRequestActions) {
  const token = getState().token.accessToken;
  const originalUsername = getState().token.username;

  try {
    if (!token) throw new Error('Not authorized');

    // check username unicity if it has been changed
    console.log('originalUsername !== username', originalUsername !== username);

    if (originalUsername !== username) {
      yield call<typeof UserApi.checkUsernameUnicity>(UserApi.checkUsernameUnicity, token, username);
    }
    yield handleRequestErrorSaga({ actionType: '' });
    if (newUser) {
      yield put(userActions.updateUserRequest({ username: username }));
      yield put(actions.loginUser({ username }));
    }
    let vlaueData = {
      userName: username,
    };
    yield put(actions.checkUserNameUnicitySuccess(vlaueData));
  } catch (error: any) {
    yield put(actions.checkUserNameUnicityFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type, ...(error as object) });
  }
}

/** Set up user profile  New UI*/
function* setUserProfileSaga({ payload, type }: SetUserProfileRequestAction): any {
  const token = getState().token.accessToken;
  const {
    fullName,
    //  username,
    tagline,
    profileAudio,
    profileImage,
    passions,
    profileAudioDuration,
    isProfileFilled,
    isOnBoardingFinished,
  } = payload;

  try {
    if (!token) throw new Error('Not authorized');

    yield call<typeof UserApi.setUpUserProfile>(UserApi.setUpUserProfile, token, {
      avatar: profileImage ?? '',
      name: fullName,
      passions,
      tagline,
      taglineAudio: profileAudio,
      taglineAudioDuration: profileAudioDuration * 1000,
      isProfileFilled: isProfileFilled,
      isOnBoardingFinished: isOnBoardingFinished,
    });
    yield handleRequestErrorSaga({ actionType: '' });
    const vlaueData = {
      userName: '',
    };
    yield put(actions.setUserProfileSuccess(vlaueData));
    yield put(actions.checkUserNameUnicitySuccess(vlaueData));
    NavigationHelper.goToCongratsScreen();
  } catch (error: any) {
    yield put(actions.setUserProfileFailure(error.message));
    yield handleRequestErrorSaga({ actionType: type });
  }
}

/** Check username unicity new UI setting */
function* checkUserNameSettingSaga({ type, payload: { username } }: CheckUserNameUnicityRequestActions) {
  const token = getState().token.accessToken;
  const originalUsername = getState().token.username;

  try {
    if (!token) throw new Error('Not authorized');

    if (originalUsername !== username) {
      yield call<typeof UserApi.checkUsernameUnicity>(UserApi.checkUsernameUnicity, token, username);
    }
    yield put(actions.checkUserNameSettingSuccess());
  } catch (error: any) {
    console.log('error', error);
    yield put(actions.checkUserNameSettingFailure('This username already exists'));
  }
}

export default function* () {
  yield takeLatest(actions.getRegistrationCodeRequest.type, getRegistrationCodeSaga);

  yield takeLatest(actions.regainRegistrationCodeRequest.type, regainRegistrationCodeSaga);

  yield takeLatest(actions.checkRegistrationCodeRequest.type, checkRegistrationCodeSaga);

  yield takeLatest(actions.signUpRequest.type, signUpUserSaga);
  yield takeLatest(actions.getLoginCodeRequest.type, getLoginCodeSaga);
  yield takeLatest(actions.regainLoginCodeRequest.type, regainLoginCodeSaga);
  yield takeLatest(actions.logInRequest.type, logInSaga);
  yield takeLatest(actions.logoutRequest, logoutWorker);

  yield takeLatest(actions.getPasswordResetCodeRequest.type, getPasswordResetCodeSaga);

  yield takeLatest(actions.checkPasswordResetCodeRequest.type, checkPasswordResetCodeSaga);

  yield takeLatest(actions.resetPasswordRequest.type, resetPasswordSaga);

  yield takeLatest(actions.checkUsernameUnicityRequest.type, checkUsernameUnicitySaga);
  yield takeLatest(actions.checkUserNameUnicityRequest.type, checkUserNameUnicitySaga);

  yield takeLatest(actions.checkUserNameSettingRequest.type, checkUserNameSettingSaga);

  yield takeLatest(actions.setUpUserProfileRequest.type, setUpUserProfileSaga);
  yield takeLatest(actions.setUserProfileRequest.type, setUserProfileSaga);
}
