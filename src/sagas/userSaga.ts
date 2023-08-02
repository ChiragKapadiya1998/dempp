import { takeLatest, select, put, call } from 'redux-saga/effects';
import { selectors as tokenSelectors } from '../ducks/token';
import { StoreState, getState, store } from '../store';
import UserApi from '../api/User';
import { User, UserQueries } from '../ducks/user/types';
import { handleRequestErrorSaga } from './errorSaga';
import showAlert from '../utils/showAlert';
import { actions } from '../ducks/user';
import { actions as authActions } from '../ducks/auth';
import { actions as messagingActions } from '../ducks/messaging';
import NavigationHelper from '../utils/NavigationHelper';
import { SettingsStackPages } from '../navigators/Routes';
import { MainStackParamList, RootStackParamList, SettingsStackParamsList } from '../navigators/types';
import { actions as initiationAction } from '../ducks/initiation';
import { actions as errorAction } from '../ducks/errors';
import { actions as netinfoActions } from '../ducks/netinfo';

function* getUserWorker() {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);

  try {
    if (!token) throw new Error('No auth');

    const user: User = yield call<typeof UserApi.getUser>(UserApi.getUser, token);

    yield put(actions.getUserSuccess(user));
    yield put(actions.getUserQueriesRequest());
    yield put(messagingActions.FCMInitRequest());
    store.dispatch(netinfoActions.updateNetinfoStatus(true));
  } catch (err) {
    // yield put(authActions.logoutRequest());
    yield put(actions.getUserFailure(err.message));
  }
}

function* getUserSessionStaus() {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);
  const { isConnected }: StoreState['netinfo'] = yield select((state: StoreState) => state.netinfo);

  try {
    if (!token) throw new Error('No auth');

    const user: User = yield call<typeof UserApi.getUser>(UserApi.getUser, token);

    yield put(actions.getUserSuccess(user));
    yield put(actions.getUserQueriesRequest());
    yield put(messagingActions.FCMInitRequest());
  } catch (err) {
    isConnected && store.dispatch(authActions.logoutRequest());
    yield put(actions.getUserFailure(err.message));
  }
}

function* getUserQueriesWorker() {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);

  try {
    if (!token) throw new Error('No auth');

    const userQueries: UserQueries = yield call<typeof UserApi.getUserQueries>(UserApi.getUserQueries, token);
    console.log('userQueries', userQueries);

    yield put(actions.getUserQueriesSuccess(userQueries));
  } catch (err) {
    yield put(actions.getUserQueriesFailure(err.message));
  }
}

function* updateUserWorker({ payload }: ReturnType<typeof actions.updateUserRequest>) {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);

  try {
    if (!token) throw new Error('No auth');
    console.log('payload', payload);
    const finalData: User = yield call<typeof UserApi.updateUser>(UserApi.updateUser, token, payload);
    console.log('finalData', finalData);
    const updatedUser: User = yield call<typeof UserApi.getUser>(UserApi.getUser, token);
    console.log('updatedUser', updatedUser);
    yield put(actions.updateUserSuccess(updatedUser));
    yield put(authActions.clearError());
    yield put(actions.userEditPress(false));
    yield put(errorAction.removeError());
  } catch (err) {
    yield put(actions.updateUserFailure(err.message));
  }
}
function* updateUserNameWorker({ payload }: ReturnType<typeof actions.updateUserRequest>) {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);

  try {
    if (!token) throw new Error('No auth');
    console.log('payload', payload);
    const finalData: User = yield call<typeof UserApi.updateUser>(UserApi.updateUser, token, payload);
    console.log('finalData', finalData);
    const updatedUser: User = yield call<typeof UserApi.getUser>(UserApi.getUser, token);
    console.log('updatedUser', updatedUser);
    yield put(actions.updateUserSuccess(updatedUser));
    yield put(actions.userNameErrorValid(null));
    yield put(authActions.clearError());
    yield put(actions.userEditPress(false));
    yield put(errorAction.removeError());
  } catch (err) {
    yield put(actions.updateUserFailure(err.message));
    yield put(actions.userNameErrorValid('This username already exists'));
  }
}

function* updateUserStatusWorker({ payload }: ReturnType<typeof actions.updateUserStatusRequest>) {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);
  try {
    if (!token) throw new Error('No auth');
    yield call<typeof UserApi.updateStatusUser>(UserApi.updateStatusUser, token, payload);
    const updatedUser: User = yield call<typeof UserApi.getUser>(UserApi.getUser, token);
    yield put(actions.updateUserSuccess(updatedUser));
  } catch (err) {
    yield put(actions.updateUserFailure(err.message));
  }
}

function* putAvailabilitySettingWorker({ payload }: ReturnType<typeof actions.putAvailabilitySettingRequest>) {
  const token: StoreState['token']['accessToken'] = yield select(tokenSelectors.getAccessToken);

  try {
    if (!token) throw new Error('No auth');

    yield call<typeof UserApi.putAvailabilitySetting>(UserApi.putAvailabilitySetting, token, payload);
    yield put(actions.putAvailabilitySettingSuccess(payload));
    yield put(actions.getUserRequest());
  } catch (err) {
    yield put(actions.putAvailabilitySettingFailure(err.message));
  }
}

/** Get code to delete user */
function* getCodeToDeleteUserSaga({ type }: ReturnType<typeof actions.getCodeToDeleteUserRequest>) {
  const token = getState().token.accessToken;

  try {
    if (!token) return new Error('Not authorized');

    yield call<typeof UserApi.getCodeToDeleteUser>(UserApi.getCodeToDeleteUser, token);

    yield put(actions.getCodeToDeleteUserSuccess());
  } catch (error) {
    yield put(actions.getCodeToDeleteUserFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Regain code to delete user */
function* regainCodeToDeleteUserSaga({ type }: ReturnType<typeof actions.regainCodeToDeleteUserRequest>) {
  const token = getState().token.accessToken;

  try {
    if (!token) return new Error('Not authorized');

    yield call<typeof UserApi.getCodeToDeleteUser>(UserApi.getCodeToDeleteUser, token);

    yield put(actions.regainCodeToDeleteUserSuccess());
    showAlert('Delete user', 'Code has been resend');
  } catch (error) {
    yield put(actions.regainCodeToDeleteUserFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Check code to delete user */
function* checkCodeToDeleteUserSaga({ payload, type }: ReturnType<typeof actions.checkCodeToDeleteUserRequest>) {
  const token = getState().token.accessToken;
  const { code } = payload;

  try {
    if (!token) return new Error('Not authorized');

    yield call<typeof UserApi.checkCodeToDeleteUser>(UserApi.checkCodeToDeleteUser, token, code);

    yield put(actions.checkCodeToDeleteUserSuccess());
    yield put(actions.deleteUserRequest({ code }));
  } catch (error) {
    yield put(actions.checkCodeToDeleteUserFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

/** Delete user */
function* deleteUserSaga({ payload, type }: ReturnType<typeof actions.deleteUserRequest>) {
  const token = getState().token.accessToken;

  const { code } = payload;

  try {
    if (!token) return new Error('Not authorized');
    yield call<typeof UserApi.deleteUser>(UserApi.deleteUser, token, code);
    yield put(actions.deleteUserSuccess());
    yield put(initiationAction.firstDeleteSuccess());
    yield NavigationHelper.navigate<SettingsStackParamsList, SettingsStackPages>(SettingsStackPages.DeleteUserFeedScreen);
    // yield put(authActions.logout());
  } catch (error) {
    yield put(actions.deleteUserFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

function* userSaga() {
  yield takeLatest(actions.getUserRequest, getUserWorker);
  yield takeLatest(actions.getUserSessionStausRequest, getUserSessionStaus);
  yield takeLatest(actions.getUserQueriesRequest, getUserQueriesWorker);
  yield takeLatest(actions.updateUserRequest, updateUserWorker);
  yield takeLatest(actions.updateUserNameRequest, updateUserNameWorker);
  yield takeLatest(actions.updateUserStatusRequest, updateUserStatusWorker);
  yield takeLatest(actions.putAvailabilitySettingRequest, putAvailabilitySettingWorker);

  yield takeLatest(actions.getCodeToDeleteUserRequest.type, getCodeToDeleteUserSaga);

  yield takeLatest(actions.regainCodeToDeleteUserRequest.type, regainCodeToDeleteUserSaga);

  yield takeLatest(actions.checkCodeToDeleteUserRequest.type, checkCodeToDeleteUserSaga);

  yield takeLatest(actions.deleteUserRequest.type, deleteUserSaga);
}

export default userSaga;
