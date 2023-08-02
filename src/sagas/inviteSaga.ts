import { Keyboard } from 'react-native';
import { select, takeLatest, call, put } from 'redux-saga/effects';
import InviteApi from '../api/Invite';
import { actions } from '../ducks/invite';
import { actions as modalsActions } from '../ducks/modals';
import { Pages } from '../navigators/Routes';
import { RootStackParamListParams } from '../navigators/types';
import { StoreState } from '../store';
import NavigationHelper from '../utils/NavigationHelper';
import showAlert from '../utils/showAlert';

function* inviteUser({ payload }: ReturnType<typeof actions.inviteUserRequest>) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);

    if (!accessToken) {
      throw new Error('No auth');
    }
    yield call<typeof InviteApi.postInviteUser>(InviteApi.postInviteUser, accessToken, payload);

    yield put(actions.inviteUserSuccess());
    yield NavigationHelper.navigate(Pages.InvitesSantContacts, { data: false, from: payload.from });
    // yield put(modalsActions.toggleInvite({ title: 'Invitation success', message: 'The invitation was successfully sent.' }));
    // showAlert('Invite', 'Invitation sent!');
    yield Keyboard.dismiss();
  } catch (err: any) {
    yield put(actions.inviteUserFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: 'Invitation error', message: err.message }));
  }
}

function* inviteSaga() {
  yield takeLatest(actions.inviteUserRequest, inviteUser);
}

export default inviteSaga;
