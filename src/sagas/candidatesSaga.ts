import { Alert } from 'react-native';

import {
  RTCPeerConnection,
  RTCPeerConnectionConfiguration,
  mediaDevices,
  MediaStream,
  RTCSessionDescriptionType,
  RTCSessionDescription,
  MediaStreamTrack,
} from 'react-native-webrtc';
import { put, takeLatest, call, delay, select, actionChannel, race, take, join } from 'redux-saga/effects';
import { actions } from '../ducks/candidates';
import { store, StoreState } from '../store';
import CandidatesApi from '../api/Candidates';
import { MatchResponse, SearchCandidatesResponse } from '../ducks/candidates/types';
import { PassionFromResponse } from '../ducks/passions/types';
import NavigationHelper from '../utils/NavigationHelper';
import { BottomTabs, CallPages, Pages } from '../navigators/Routes';
import { BottomStackParamsList, RootStackParamList, RootStackParamListParams } from '../navigators/types';
import RTCDataChannel from '../@types/data-channel';
import { actions as callsActions } from '../ducks/calls';
import { actions as modalsActions } from '../ducks/modals';
import { actions as pushActions } from '../ducks/push';
import { actions as messagingActions } from '../ducks/messaging';
import { actions as passionsActions } from '../ducks/passions';
import { actions as historyAction } from '../ducks/history';

import type { TakeableChannel } from 'redux-saga';
import RNIM from 'react-native-incall-manager';
import { getSendSlack, getSendSlack12 } from '../utils/hooks';
import { CallMessageType } from '../ducks/messaging/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CALL_END,
  CALL_END_NAVIGATION,
  END_CALL_HISTORY,
  END_CALL_NOT_RECEIVER_SCREEN,
  END_CALL_NOT_SHOW_CLOSESCREEN,
  NOT_SHOW_MATCHING_SCREEN,
} from '../utils/constants';
import moment from 'moment';

enum DataChannelEvents {
  SyncTimer = 'sync-timer',
  ProlongationReceiver = 'prolongation-receiver',
  ProlongationCaller = 'prolongation-caller',
  ProlongationUpdate = 'prolongation-update',
}

const peerConnectionConfiguration: RTCPeerConnectionConfiguration = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' },
    {
      url: 'turn:54.220.174.220:3478',
      credential: 'mypassword',
      username: 'myuser',
    },
  ],
};

function* searchCandidatesWorker(payload: any) {
  const PeerConnection = new RTCPeerConnection(peerConnectionConfiguration);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { recomended: passions, meta }: StoreState['passions'] = yield select((state: StoreState) => state.passions);
  const { currentQuery, matchDataSDP }: StoreState['candidates'] = yield select((state: StoreState) => state.candidates);

  try {
    const obj1 = {
      title: 'searchCandidatesWorker start call setp 1',
      data: {
        candidates: 'Search Candidates',
      },
    };
    getSendSlack(obj1);
    if (!accessToken) throw new Error('No auth');

    yield mediaDevices.enumerateDevices();
    const stream: MediaStream = yield mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    if (typeof stream !== 'object') throw new Error('Incorect media stream');

    yield PeerConnection.addStream(stream);
    const dc: RTCDataChannel = yield PeerConnection.createDataChannel('call', { negotiated: true, id: 32, ordered: true });

    dc.onclose = async () => {
      const isConnected = store.getState().calls.callStatus === 'connected';
      const value = await AsyncStorage.getItem(CALL_END_NAVIGATION);
      const finalValue = await AsyncStorage.getItem(END_CALL_NOT_SHOW_CLOSESCREEN);
      const historyvalue = await AsyncStorage.getItem(END_CALL_HISTORY);
      PeerConnection.close();
      stream.release();
      await PeerConnection.removeStream(stream);
      await call(RNIM.stop);

      const obj1 = {
        title: 'Close Call End setp 6',
        data: {
          candidates: 'Search Candidates',
        },
      };
      getSendSlack(obj1);
      delay(500);
      if (!JSON.parse(finalValue)) {
        if (JSON.parse(value)) {
          NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.ConnectionCallScreen });
        } else {
          JSON.parse(historyvalue)
            ? NavigationHelper.navigate<BottomStackParamsList, BottomTabs.HistoryScreen>(BottomTabs.HistoryScreen)
            : NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.CallFeedbackScreen });
        }
      }
    };

    dc.onopen = () => {
      const obj1 = {
        title: 'Open Call Join call setp 5',
        data: {
          candidates: 'Search Candidates',
        },
      };
      getSendSlack(obj1);
      store.dispatch(messagingActions.newMessage(null));
      store.dispatch(callsActions.syncTimer(Date.now()));
      store.dispatch(passionsActions.clearPassionsData());
    };

    dc.onmessage = (e: any) => {
      let data;
      try {
        data = JSON.parse(e.data);
      } catch (err) {
        data = e.data;
      }
      if (data.type === DataChannelEvents.ProlongationReceiver) {
        // store.dispatch(callsActions.prolongationRequestReceiver('receiver'));
      }
    };

    PeerConnection.onconnectionstatechange = () => {
      store.dispatch(callsActions.changeCallStatus(PeerConnection.connectionState));
      const obj1 = {
        title: 'Connection state change',
        data: {
          candidates: 'Search Candidates',
          connection: JSON.stringify(PeerConnection.connectionState),
        },
      };
      getSendSlack(obj1);
      if (PeerConnection.connectionState == CallMessageType.Connecting) {
        // NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
        //   screen: CallPages.InviteToRoomScreen,
        //   params: PeerConnection.connectionState,
        // });
      } else if (PeerConnection.connectionState == CallMessageType.Failed) {
        const oncallEnded = async () => {
          const value = await AsyncStorage.getItem(CALL_END);
          const obj1 = {
            title: 'ConnectionCallScreen state change',
            data: {
              candidates: 'Search Candidates',
              value: JSON.parse(value),
            },
          };
          getSendSlack(obj1);
          if (!JSON.parse(value)) {
            NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, {
              screen: CallPages.ConnectionCallScreen,
            });
          }
        };
        oncallEnded();
      } else if (PeerConnection.connectionState == CallMessageType.Connected) {
        NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
          screen: CallPages.CurrentCallScreen,
          params: { data: true },
        });
      }
    };

    const offer: RTCSessionDescription = yield PeerConnection.createOffer({ iceRestart: true });
    yield PeerConnection.setLocalDescription(offer);

    yield delay(2000);
    yield put(actions.searchCandidatesSDP(JSON.stringify(PeerConnection.localDescription)));
    const selectedPassions: PassionFromResponse[] = passions
      .filter((item) => item.selected)
      .map(({ id, name, categoryId }) => ({ id, name, categoryId }));

    const data: SearchCandidatesResponse =
      payload?.payload == undefined
        ? yield call(CandidatesApi.getQueries, accessToken, {
            passions: selectedPassions,
            sdp: JSON.stringify(PeerConnection.localDescription),
            question: meta.query,
            queryId: `${currentQuery ?? ''}`,
          })
        : payload?.payload?.recall
        ? yield call(CandidatesApi.recallQueries, accessToken, payload?.payload?.id, {
            sdp: JSON.stringify(PeerConnection.localDescription),
            pageSize: 5,
          })
        : yield call(CandidatesApi.callBackQueries, accessToken, {
            sdp: JSON.stringify(PeerConnection.localDescription),
            matchId: payload?.payload?.id,
          });

    const obj11 = {
      title: 'searchCandidatesWorker start call SDP setp 3',
      data: {
        candidates: 'Search Candidates',
        sdp: JSON.stringify(PeerConnection.localDescription),
        matcheslength: JSON.stringify(data?.matches?.length),
      },
    };
    getSendSlack(obj11);

    if (payload?.payload?.callBack) {
      if (!data?.users?.length) {
        yield put(
          actions.searchCandidatesToggles({
            value: true,
            errorMessage: 'We are not able to establish a connection with this user right now. Please, try to call back later. ',
          }),
        );
        yield put(actions.searchCandidatesFailure());
        // yield put(actions.searchCandidatesFailure('Not able to send notification to the user'));
      } else {
        yield put(historyAction.toggleModalHistory(false));
        NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
          screen: CallPages.InviteToRoomScreen,
          params: {
            data: PeerConnection.connectionState,
            callData: data?.users,
            matchId: payload?.payload?.id,
            myQueryTab: payload?.payload?.myQueryTab,
          },
        });
      }
    } else {
      if (!data?.matches?.length) {
        if (payload?.payload !== undefined && payload?.payload?.recall) {
          yield put(historyAction.historyQueriesCloseRequest({ id: payload?.payload?.id, status: 'closed' }));
        }
        yield put(actions.searchCandidatesLengthSuccess(data?.matches?.length));
        if (currentQuery) yield delay(20 * 1000);
        yield call(CandidatesApi.cancelQuery, accessToken, data.query.id, 'unanswered');
        yield NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
        yield put(historyAction.toggleModalHistory(false));
        throw new Error('No user found for this know-hows. Please, try changing your request.');
      }
      yield put(actions.searchCandidatesLengthSuccess(data?.matches?.length));
      yield put(actions.searchCandidatesSuccess(data));
      yield put(historyAction.toggleModalHistory(false));

      NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
        screen: CallPages.MatchingScreen,
        params: { NewTime: moment() },
      });
    }

    const muteChannel: TakeableChannel<boolean> = yield actionChannel(actions.mute);
    const closeChannel: TakeableChannel<undefined> = yield actionChannel(callsActions.updateCallRequest);
    const startInviting: TakeableChannel<undefined> = yield actionChannel(callsActions.getCallSuccess);
    const openCallChannel: TakeableChannel<undefined> = yield actionChannel(callsActions.acceptCall);
    const prolongationChannel: TakeableChannel<undefined> = yield actionChannel(callsActions.prolongationRequestCaller);

    yield takeLatest(muteChannel, function* ({ payload: mute }: any) {
      const tracks: MediaStreamTrack[] = yield stream.getAudioTracks();
      yield tracks.forEach((track) => (track.enabled = !mute));
    });

    yield takeLatest(closeChannel, function* () {
      if (dc.readyState === 'open') {
        yield dc.close();
      } else {
        yield PeerConnection.close();
      }
    });

    yield takeLatest(prolongationChannel, function* () {
      yield dc.send(JSON.stringify({ type: DataChannelEvents.ProlongationCaller }));
    });

    yield takeLatest(startInviting, function* () {
      const { callAccept, timeout } = yield race({
        callAccept: take(openCallChannel),
        timeout: delay(30000),
      });

      if (callAccept) {
        const { call }: StoreState['calls'] = yield select((state: StoreState) => state.calls);
        console.log('callcallcallcall', call);
        const sdp = call?.settings?.receiver?.sdp;
        if (!sdp) throw new Error('Bridge connection error');
        yield delay(400);
        const obj1 = {
          title: 'Set Remote Description Call Accept setp 4',
          data: {
            candidates: 'Search Candidates',
            sdp: JSON.stringify(sdp),
            // call: JSON.stringify(call),
          },
        };
        getSendSlack(obj1);
        yield PeerConnection.setRemoteDescription(JSON.parse(sdp));
      } else {
        const obj1 = {
          title: 'Call Accept failed',
          data: {
            candidates: 'Search Candidates',
            error: 'callAccept failed messages',
          },
        };
        getSendSlack(obj1);
        yield call(RNIM.stop);
        yield put(callsActions.updateCallRequest({ status: 'failed', duration: 0, nextScreen: false }));
        // yield NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
      }
    });
  } catch (err: any) {
    yield put(actions.searchCandidatesFailure(err.message));
  }
}

// ------------------------------|
//           ANSWER              |
// ------------------------------|

function* answerCandidateWorker() {
  const PeerConnection = new RTCPeerConnection(peerConnectionConfiguration);
  const { initMessage, message }: StoreState['fcm'] = yield select((state: StoreState) => state.fcm);
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);

  try {
    if (!accessToken) throw new Error('No auth');

    yield mediaDevices.enumerateDevices();
    const stream: MediaStream = yield mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    if (typeof stream !== 'object') throw new Error('Incorect media stream');

    const matchId = Number(initMessage?.matchId ?? message?.matchId);
    const obj1 = {
      title: 'Receiver Match ID found',
      data: {
        candidates: 'Receiver Candidates',
        matchId: `${matchId}`,
        initMessage: JSON.stringify(initMessage),
        message: JSON.stringify(message),
      },
    };
    getSendSlack(obj1);
    if (!matchId || isNaN(matchId)) throw new Error('Incorrect matchId');
    const matchData: MatchResponse = yield call(CandidatesApi.getRemoteDescription, accessToken, matchId);
    const obj01 = {
      title: 'Receiver remote Description sdp Get',
      data: {
        candidates: 'Receiver Candidates',
        sdp: JSON.stringify(matchData.sdp),
        matchId: `${matchId}`,
      },
    };
    getSendSlack(obj01);
    yield PeerConnection.setRemoteDescription(JSON.parse(matchData.sdp));

    yield PeerConnection.addStream(stream);
    // @ts-ignore
    const dc: RTCDataChannel = yield PeerConnection.createDataChannel('call', { negotiated: true, id: 32, ordered: true });

    dc.onclose = async () => {
      const isConnected = store.getState().calls.callStatus === 'connected';

      const value = await AsyncStorage.getItem(CALL_END_NAVIGATION);
      const historyvalue = await AsyncStorage.getItem(END_CALL_HISTORY);
      const finalValue = await AsyncStorage.getItem(END_CALL_NOT_RECEIVER_SCREEN);
      PeerConnection.close();
      stream.release();
      await PeerConnection.removeStream(stream);
      await call(RNIM.stop);
      const obj1 = {
        title: 'Close Call End',
        data: {
          candidates: 'Receiver Candidates',
          connected: JSON.stringify(isConnected),
          value: JSON.parse(value),
          finalValue: JSON.parse(finalValue),
        },
      };
      getSendSlack(obj1);
      delay(500);
      if (!JSON.parse(finalValue)) {
        if (JSON.parse(value)) {
          NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.ConnectionCallScreen });
        } else {
          JSON.parse(historyvalue)
            ? NavigationHelper.navigate<BottomStackParamsList, BottomTabs.HistoryScreen>(BottomTabs.HistoryScreen)
            : NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.CallFeedbackScreen });
        }
      }

      store.dispatch(actions.answerCandidateFailure());
    };

    dc.onopen = () => {
      const obj1 = {
        title: 'Open Call Join',
        data: {
          candidates: 'Receiver Candidates',
        },
      };
      getSendSlack(obj1);
      store.dispatch({ type: 'RAA' });
      store.dispatch(messagingActions.newMessage(null));
      store.dispatch(callsActions.syncTimer(Date.now()));
      store.dispatch(pushActions.toggleMessagePush(false));
      store.dispatch(actions.answerCandidateSuccess());
      // NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, {
      //   screen: CallPages.CurrentCallScreen,
      // });
    };

    dc.onmessage = (e: any) => {
      let data;
      try {
        data = JSON.parse(e.data);
      } catch (err) {
        data = e.data;
      }
      if (data.type === DataChannelEvents.ProlongationCaller) {
        // store.dispatch(callsActions.prolongationRequestCaller('caller'));
      }
    };

    PeerConnection.onconnectionstatechange = () => {
      store.dispatch(callsActions.changeCallStatus(PeerConnection.connectionState));
      const obj1 = {
        title: 'Connection state change',
        data: {
          candidates: 'Receiver Candidates',
          connection: JSON.stringify(PeerConnection.connectionState),
        },
      };
      getSendSlack(obj1);
      if (PeerConnection.connectionState == CallMessageType.Connecting) {
        // delay(1500);
        // NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
        //   screen: CallPages.InviteToRoomScreen,
        //   params: { data: PeerConnection.connectionState },
        // });
      } else if (PeerConnection.connectionState == CallMessageType.Failed) {
        const oncallEnded = async () => {
          const value = await AsyncStorage.getItem(CALL_END);
          const obj1 = {
            title: 'ConnectionCallScreen state change',
            data: {
              candidates: 'Receiver Candidates',
              value: JSON.parse(value),
            },
          };
          getSendSlack(obj1);
          if (!JSON.parse(value)) {
            NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, {
              screen: CallPages.ConnectionCallScreen,
            });
          }
        };
        oncallEnded();
      } else if (PeerConnection.connectionState == CallMessageType.Connected) {
        NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
          screen: CallPages.CurrentCallScreen,
          params: { data: false },
        });
      }
    };

    const answer: RTCSessionDescriptionType = yield PeerConnection.createAnswer();
    yield PeerConnection.setLocalDescription(answer);

    yield delay(800);
    const obj11 = {
      title: 'answerCandidateWorker start call SDP',
      data: {
        candidates: 'Receiver Candidates',
        sdp: JSON.stringify(PeerConnection.localDescription),
      },
    };
    getSendSlack(obj11);
    yield put(callsActions.createCallRequest({ sdp: JSON.stringify(PeerConnection.localDescription) }));

    const muteChannel: TakeableChannel<boolean> = yield actionChannel(actions.mute);
    const closeChannel: TakeableChannel<undefined> = yield actionChannel(callsActions.updateCallRequest);
    const prolongationChannel: TakeableChannel<undefined> = yield actionChannel(callsActions.prolongationRequestReceiver);
    const creatingFalure: TakeableChannel<undefined> = yield actionChannel(callsActions.createCallFailure);

    yield takeLatest(creatingFalure, function* () {
      yield call(RNIM.stop);
      yield PeerConnection.close();
      yield put(modalsActions.toggleCallConnection(true));
      yield put(actions.answerCandidateFailure());
    });

    yield takeLatest(muteChannel, function* ({ payload: mute }: any) {
      const tracks: MediaStreamTrack[] = yield stream.getAudioTracks();
      yield tracks.forEach((track) => (track.enabled = !mute));
    });

    yield takeLatest(closeChannel, function* () {
      if (dc.readyState === 'open') {
        yield dc.close();
      } else {
        yield PeerConnection.close();
      }
    });

    yield takeLatest(prolongationChannel, function* () {
      yield dc.send(JSON.stringify({ type: DataChannelEvents.ProlongationReceiver }));
    });

    const RAAChannel: TakeableChannel<undefined> = yield actionChannel('RAA');

    const { RAA, timeot } = yield race({
      RAA: take(RAAChannel),
      timeot: delay(30000),
    });
    console.log('RAA', RAA);
    if (RAA) {
      yield put(pushActions.toggleMessagePush(false));
      yield put(actions.answerCandidateSuccess());
      const obj1 = {
        title: 'Call Accept',
        data: {
          candidates: 'Receiver Candidates',
          raa: 'RAA',
          RAA: JSON.stringify(RAA),
        },
      };
      getSendSlack(obj1);
    } else {
      const obj1 = {
        title: 'PeerConnection callAccept failed',
        data: {
          candidates: 'Receiver Candidates',
          qurey: 'callAccept failed messages',
          RAA: JSON.stringify(RAA),
        },
      };
      getSendSlack(obj1);
      yield AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(true));
      yield call(RNIM.stop);
      yield PeerConnection.close();
      yield put(modalsActions.toggleCallConnection(true));
      yield put(pushActions.toggleMessagePush(false));
      yield put(actions.answerCandidateFailure());
    }
  } catch (err: any) {
    yield call(RNIM.stop);
    yield put(actions.answerCandidateFailure(err.message));
    yield call(Alert.alert, 'Candidate error', err.message);
  }
}

function* cancelQueryWorker(payload: any) {
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { currentQuery }: StoreState['candidates'] = yield select((state: StoreState) => state.candidates);

  try {
    console.log('payload', payload);
    if (!accessToken) throw new Error('No auth');
    // if (!finalValue) throw new Error("Query doesn't exists");
    yield call(CandidatesApi.cancelQuery, accessToken, payload?.payload?.id, payload?.payload?.status);

    yield put(actions.cancelQuerySuccess());
  } catch (err) {
    if (err instanceof Error) {
      yield put(actions.cancelQueryFailure(err.message));
    } else {
      yield put(actions.cancelQueryFailure(JSON.stringify(err)));
    }
  }
}

function* searchCandidatesReSendWorker() {
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { recomended: passions, meta }: StoreState['passions'] = yield select((state: StoreState) => state.passions);
  const { currentQuery, matchDataSDP }: StoreState['candidates'] = yield select((state: StoreState) => state.candidates);
  console.log('======================================');
  console.log('currentQuerycurrentQuerycurrentQuerycurrentQuerycurrentQuery', currentQuery);
  console.log('======================================');

  try {
    const selectedPassions: PassionFromResponse[] = passions
      .filter((item) => item.selected)
      .map(({ id, name, categoryId }) => ({ id, name, categoryId }));

    const data: SearchCandidatesResponse = yield call(CandidatesApi.getQueries, accessToken, {
      passions: selectedPassions,
      sdp: matchDataSDP,
      question: meta.query,
      queryId: `${currentQuery ?? ''}`,
    });
    if (!data?.matches?.length) {
      yield put(actions.searchCandidatesLengthSuccess(data?.matches?.length));
      if (currentQuery) yield delay(20 * 1000);
      yield put(actions.searchCandidatesToggles({ value: true, errorMessage: null }));
      yield put(historyAction.toggleModalHistory(false));
      // yield call(CandidatesApi.cancelQuery, accessToken, data.query.id, 'unanswered');
      // yield NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
      // throw new Error('No user found for this know-hows. Please, try changing your request.');
    }
    yield put(actions.searchCandidatesLengthSuccess(data?.matches?.length));
    yield put(actions.searchCandidatesSuccess(data));
    yield put(historyAction.toggleModalHistory(false));

    const UpdateValue = async () => {
      const value = await AsyncStorage.getItem(NOT_SHOW_MATCHING_SCREEN);
      if (JSON.parse(value)) {
        NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
          screen: CallPages.MatchingScreen,
          params: { NewTime: moment() },
        });
      }
    };

    UpdateValue();
  } catch (err) {
    yield put(actions.searchCandidatesFailure(err.message));
  }
}

function* candidatesWatcher() {
  yield takeLatest(actions.searchCandidatesRequest, searchCandidatesWorker);
  yield takeLatest(actions.answerCandidateRequest, answerCandidateWorker);
  yield takeLatest(actions.cancelQueryRequest, cancelQueryWorker);
  yield takeLatest(actions.searchCandidatesReSendRequest, searchCandidatesReSendWorker);
}

export default candidatesWatcher;
