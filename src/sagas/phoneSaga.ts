import { takeLatest, select, call, put } from 'redux-saga/effects';
import PhoneApi from '../api/Phone';
import { actions } from '../ducks/phone';
import { actions as authActions } from '../ducks/auth';
import { ChangePhonePages, Pages } from '../navigators/Routes';
import { ChangePhoneStackParamsList } from '../navigators/types';
import { StoreState } from '../store';
import NavigationHelper from '../utils/NavigationHelper';

function* phoneSaga() {
  yield takeLatest(actions.updatePhoneRequest, updatePhoneWorker);
  yield takeLatest(actions.confirmPhoneRequest, confirmPhoneWorker);
}

function* updatePhoneWorker({ payload }: ReturnType<typeof actions.updatePhoneRequest>) {
  const { accessToken }: StoreState['token'] = yield select((state) => state.token);
  try {
    if (!accessToken) {
      throw new Error('No auth');
    }
    yield call<typeof PhoneApi.updatePhone>(PhoneApi.updatePhone, accessToken, payload.phone);

    yield put(actions.updatePhoneSuccess());
    yield NavigationHelper.navigate<ChangePhoneStackParamsList, ChangePhonePages>(ChangePhonePages.ConfirmChangesScreen);
  } catch (err: any) {
    yield put(actions.updatePhoneFailure(err.message));
  }
}

function* confirmPhoneWorker({ payload }: ReturnType<typeof actions.confirmPhoneRequest>) {
  const { accessToken }: StoreState['token'] = yield select((state) => state.token);
  const { number, country }: StoreState['phone'] = yield select((state) => state.phone);
  try {
    // if (!accessToken) {
    //   throw new Error('No auth');
    // }
    if (!number || !country) {
      throw new Error('Internal Client Error');
    }

    yield call<typeof PhoneApi.confirmPhone>(PhoneApi.confirmPhone, accessToken, { phone: number, code: payload.code, country });

    yield put(actions.confirmPhoneSuccess());
    yield NavigationHelper.navigate(Pages.InvitesSantContacts, { data: true });
    // yield put(authActions.logoutRequest());
  } catch (err: any) {
    yield put(actions.confirmPhoneFailure(err.message));
  }
}

export default phoneSaga;
