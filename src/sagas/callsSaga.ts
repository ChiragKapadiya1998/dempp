import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import CallApi from '../api/Call';
import NavigationHelper from '../utils/NavigationHelper';
import showAlert from '../utils/showAlert';
import { actions } from '../ducks/calls';

import { actions as messagingActions } from '../ducks/messaging';
import { actions as pushActions } from '../ducks/push';
import { handleRequestErrorSaga } from './errorSaga';
import { getState, StoreState } from '../store';
import { CallData, ReportUserRequestAction } from '../ducks/calls/types';
import { BottomTabs, CallPages, Pages } from '../navigators/Routes';
import { BottomStackParamsList, RootStackParamList } from '../navigators/types';
import { getSendSlack, getSendSlack12 } from '../utils/hooks';
import { strings } from '../utils/string';
import { CALL_END_NAVIGATION } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Report user */
function* reportUserSaga({ payload, type }: ReportUserRequestAction): any {
  const token = getState().token.accessToken;
  const { callId, reason, explanation } = payload;

  try {
    if (!token) throw new Error('Not authorized');

    yield call<typeof CallApi.reportUser>(CallApi.reportUser, token, {
      callId,
      reason,
      explanation,
    });

    yield put(actions.reportUserSuccess());
    yield handleRequestErrorSaga({ actionType: '' });
    yield NavigationHelper.navigate(CallPages.ReportSent);

    // NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);

    // yield delay(1000);
    // showAlert('Report user', 'Report has been created');
  } catch (error: any) {
    yield put(actions.reportUserFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

function* createCallWorker({ payload }: ReturnType<typeof actions.createCallRequest>) {
  const { message, initMessage }: StoreState['fcm'] = yield select((state: StoreState) => state.fcm);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);

  const matchId = message?.matchId || initMessage?.matchId;
  const isCallBack = message?.isCallBack || initMessage?.isCallBack;

  try {
    if (!accessToken) throw new Error('No auth');
    if (!matchId || !user) throw new Error('No accepted user');
    console.log('matchId', matchId);

    const initCall: CallData = isCallBack
      ? yield call(CallApi.createCallBack, accessToken, matchId, payload.sdp)
      : yield call(CallApi.createCall, accessToken, matchId, payload.sdp);
    console.log('initCall', initCall);

    yield put(actions.createCallSuccess({ call: initCall, role: user.id === initCall.caller.id ? 'caller' : 'receiver' }));
  } catch (err: any) {
    const obj1 = {
      title: 'create Call Worker',
      data: {
        error: JSON.stringify(err),
      },
    };
    getSendSlack(obj1);
    yield AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(true));
    if (err?.message === 'somebody-already-connected') {
      yield put(
        messagingActions.updateMessageData({
          reasonDescription: 'Don’t worry you will get more Parlapp invites later.',
          reasonTitle: 'Somebody has already connected!',
        }),
      );
    }
    yield put(actions.createCallFailure(err.message));
  }
}

function* updateCallWorker({ payload }: ReturnType<typeof actions.updateCallRequest>) {
  const { call: callData, callStatus }: StoreState['calls'] = yield select((state: StoreState) => state.calls);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);

  try {
    if (!accessToken || !callData) throw new Error('No data for update');
    getSendSlack({
      title: 'update call worker api paylod',
      data: {
        callData: callData.id,
        payload: JSON.stringify(payload),
      },
    });
    yield call<typeof CallApi.updateCall>(CallApi.updateCall, accessToken, callData.id, payload);
    yield put(actions.updateCallSuccess());
    if (payload?.nextScreen) {
      yield NavigationHelper.navigate<BottomStackParamsList, BottomTabs.HistoryScreen>(BottomTabs.HistoryScreen);
    } else if (callStatus === 'failed' || callStatus === 'disconnected') {
      yield put(pushActions.toggleCallEnd(false));
      const oncallEnded = async () => {
        const value = await AsyncStorage.getItem(CALL_END_NAVIGATION);
        delay(300);
        if (JSON.parse(value)) {
          NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.ConnectionCallScreen });
        } else {
          NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.CallFeedbackScreen });
        }
      };
      oncallEnded();
    }
  } catch (err: any) {
    yield put(actions.updateCallFailure(err.message));
  }
}

function* getCallWoraker({ payload }: ReturnType<typeof actions.getCallRequest>) {
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);

  try {
    if (!accessToken || !user) throw new Error('Call id is required');

    const callData: CallData = yield call<typeof CallApi.getCall>(CallApi.getCall, accessToken, payload);
    // yield delay(3000);
    yield put(actions.getCallSuccess({ call: callData, role: user.id === callData.caller.id ? 'caller' : 'receiver' }));
    yield put(actions.acceptCall());
    const obj = {
      title: ' getCallWoraker Get call api called ',
      data: {
        payload: JSON.stringify(payload),
        method: 'getCall',
        // response: JSON.stringify(callData),
      },
    };
    getSendSlack(obj);
  } catch (err: any) {
    yield put(actions.getCallFailure(err.message));
  }
}

function* declineCallWoraker() {
  const { message, initMessage }: StoreState['fcm'] = yield select((state: StoreState) => state.fcm);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);

  const callId = message?.matchId ?? initMessage?.matchId;

  try {
    yield put(pushActions.toggleMessagePush(false));
    if (!accessToken || !callId || !user) throw new Error('Call id is required');

    yield call<typeof CallApi.declineCall>(CallApi.declineCall, accessToken, callId);
    yield put(messagingActions.startWithInitMessage(null));
    yield put(actions.declineCallSuccess());
    NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
  } catch (err: any) {
    yield put(actions.declineCallFailure(err.message));
  }
}

function* notNowCallWoraker() {
  const { message, initMessage }: StoreState['fcm'] = yield select((state: StoreState) => state.fcm);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);

  const callId = message?.matchId ?? initMessage?.matchId;

  try {
    yield put(pushActions.toggleMessagePush(false));
    if (!accessToken || !callId || !user) throw new Error('Call id is required');

    yield call<typeof CallApi.declineCall>(CallApi.notNowCall, accessToken, callId);

    yield put(actions.notNowCallSuccess());
    NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
  } catch (err: any) {
    yield put(actions.notNowCallFailure(err.message));
  }
}

function* prolongationWorker(payload: any) {
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { call: callData }: StoreState['calls'] = yield select((state: StoreState) => state.calls);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);
  try {
    if (!accessToken || !callData || !user) throw new Error('Do data for update call');
    // if (user.id == payload?.payload?.receiver) {
    yield call(CallApi.prolongationCall, accessToken, callData.id, payload?.payload?.prolongationStep);
    yield put(actions.prolongationRequestReceiver('receiver'));
    // }
  } catch (err) {
    console.error(err);
  }
}

export default function* () {
  yield takeLatest(actions.reportUserRequest.type, reportUserSaga);
  yield takeLatest(actions.createCallRequest, createCallWorker);
  yield takeLatest(actions.updateCallRequest, updateCallWorker);
  yield takeLatest(actions.getCallRequest, getCallWoraker);
  yield takeLatest(actions.declineCallRequest, declineCallWoraker);
  yield takeLatest(actions.notNowCallRequest, notNowCallWoraker);
  yield takeLatest(actions.prolongationSuccess, prolongationWorker);
}
