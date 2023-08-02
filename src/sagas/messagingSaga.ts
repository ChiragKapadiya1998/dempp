import { takeLatest, put, select, call } from 'redux-saga/effects';
import { actions } from '../ducks/messaging';
import { actions as authActions } from '../ducks/auth';
import { actions as usetActions } from '../ducks/user';
import { MessageData, MessageType } from '../ducks/messaging/types';
import { CallPages, Pages } from '../navigators/Routes';
import NavigationHelper from '../utils/NavigationHelper';
import { RootStackParamList, RootStackParamListParams } from '../navigators/types';
import { store, StoreState } from '../store';
import OneSignal from 'react-native-onesignal';
import { Alert, Platform } from 'react-native';
import Config from 'react-native-config';
import MessagingApi, { ActiveMatches } from '../api/Messaging';
import { actions as pushActions } from '../ducks/push';
import { Await } from '../utils/types';
import { getSendSlack, getSendSlack12 } from '../utils/hooks';
import { strings } from '../utils/string';

function* FCMInitWorker() {
  const { accessToken }: StoreState['token'] = yield select((state: StoreState) => state.token);
  const { data: user }: StoreState['user'] = yield select((state: StoreState) => state.user);
  try {
    if (!user || !accessToken) {
      throw new Error("FCMInitFaild: One of tokens invalid or doesn't exists");
    }

    yield OneSignal.setLogLevel(6, 0);
    yield OneSignal.setAppId(Config.ONE_SIGNAL_API_KEY);
    console.log("---------------------OneSignal.setAppId(Config.ONE_SIGNAL_API_KEY)")
    console.log(Config.ONE_SIGNAL_API_KEY)
    yield OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      const fnObj1 = {
        title: 'promptForPushNotificationsWithUserResponse',
        data: {
          isActive: JSON.stringify(response),
        },
      };
      getSendSlack(fnObj1);
      // if (!response) {
      //   store.dispatch(actions.NotificationPermissionHandler(true));
      // }
    });
    const fnObj = {
      title: 'oneSignalId',
      data: {
        isActive: user.oneSignalId,
      },
    };
    getSendSlack(fnObj);
    console.log('-------------------- user.oneSignalId');
    console.log(user.oneSignalId);
    yield OneSignal.setExternalUserId(user.oneSignalId);
    yield OneSignal.addSubscriptionObserver((event) => {
      const fnObj = {
        title: strings.subscriptionSubscribed,
        data: {
          isActive: event.to.isSubscribed,
        },
      };
      getSendSlack(fnObj);
      store.dispatch(usetActions.updateUserRequest({ isActive: event.to.isSubscribed }));
    });
    yield put(actions.FCMInitSuccess());
    const matches: ActiveMatches = yield call(MessagingApi.getMatches, accessToken);
    if (matches.length) {
      const lastMatch = matches[0];
      yield put(
        actions.newMessage({
          description: lastMatch.query.query,
          matchId: lastMatch.id,
          passions: lastMatch.query.passions.map((item) => item.name),
          type: MessageType.MatchFound,
          userAvatar: lastMatch.query.user.avatar?.s ?? '',
          userName: lastMatch.query.user.name ?? 'No name',
          userTagline: lastMatch.query.user.tagline ?? 'No tagline',
        }),
      );
    }
  } catch (err: any) {
    yield put(actions.FCMInitFailure(err.message));
  }
}

function* openAppListener() {
  yield OneSignal.addSubscriptionObserver((event) => {
    store.dispatch(usetActions.updateUserRequest({ isActive: event.to.isSubscribed }));
  });
  OneSignal.setNotificationOpenedHandler((openEvent) => {
    const notification = openEvent.notification;
    const data = notification.additionalData as Omit<MessageData, 'passions'> & { passions?: string };
    if (__DEV__) {
      console.warn('NOTIFICATION OPEN APP: ', data);
    }
    const obj1 = {
      title: strings.notification_received,
      data: {
        description: 'NOTIFICATION',
      },
    };
    getSendSlack(obj1);
    if (data) {
      const obj1 = {
        title: strings.notification_received,
        data: {
          description: JSON.stringify(data?.description),
          matchId: data?.matchId,
          passions: JSON.parse(data?.passions),
          type: data?.type,
          userName: data.userName,
          userTagline: data?.userTagline,
        },
      };
      getSendSlack(obj1);
      NotificationDelivereListener(data?.matchId);
      store.dispatch(actions.startWithInitMessage({ ...data, passions: data?.passions ? JSON.parse(data?.passions) : undefined }));
      store.dispatch(pushActions.toggleMessagePush(false));
      NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.IncommingCallScreen });
    }
  });
}

function* NotificationDelivereListener({ payload }: any) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);
    if (!accessToken) {
      console.log("accessToken ", accessToken);
      throw new Error('No auth');
    }
    // NavigationHelper.navigate<RootStackParamListParams, Pages.CallStack>(Pages.CallStack, {
    //   screen: CallPages.InviteToRoomScreen,
    //   params: 'connecting',
    // });
    const matches: Await<ReturnType<typeof MessagingApi.patchNotification>> = yield call(MessagingApi.patchNotification, accessToken, payload);
    yield put(actions.NotificationDeliveredSuccess());
  } catch (err: any) {
    yield put(actions.NotificationDeliveredFailure(err.message));
  }
}
function* FCMDeleteWorker() {
  yield OneSignal.removeExternalUserId();
}

function* messagingSaga() {
  yield takeLatest(actions.FCMInitRequest, FCMInitWorker);
  yield takeLatest(actions.FCMInitRequest, openAppListener);
  yield takeLatest(authActions.logoutRequest, FCMDeleteWorker);
  yield takeLatest(actions.NotificationDeliveredRequest, NotificationDelivereListener);
}

export default messagingSaga;
