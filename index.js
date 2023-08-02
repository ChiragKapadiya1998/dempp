/**
 * @format
 */

import { AppRegistry, Linking, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import OneSignal from 'react-native-onesignal';
import { MessageType } from './src/ducks/messaging/types';
import { actions as messagingActions } from './src/ducks/messaging';
import { actions as pushActions } from './src/ducks/push';
import { actions as callsActions } from './src/ducks/calls';
import { actions as usetActions } from './src/ducks/user';
import { store } from './src/store';
import { getSendSlack, getSendSlack12 } from './src/utils/hooks';
import { strings } from './src/utils/string';
import { actions as candidatesActions } from './src/ducks/candidates';

OneSignal.addSubscriptionObserver((event) => {
  console.log("event.to.isSubscribed")
  console.log(event.to.isSubscribed)
  store.dispatch(usetActions.updateUserRequest({ isActive: event.to.isSubscribed }));
});

OneSignal.setNotificationWillShowInForegroundHandler((e) => {
  const notification = e.getNotification();
  const data = notification.additionalData;
  console.log('FOREGROUND NOTIFICATION: ', data);
  const fnObj = {
    title: strings.forground_notification,
    data: {
      notification_data: JSON.stringify(data),
    },
  };
  getSendSlack(fnObj);
  if (MessageType.MatchFound === data?.type) {
    store.dispatch(messagingActions.NotificationDeliveredRequest(data?.matchId));
    const obj1 = {
      title: strings.ntification_found,
      data: {
        description: JSON.stringify(data?.description),
        matchId: data?.matchId,
        passions: data?.passions,
        type: data?.type,
        userName: data.userName,
        userTagline: data?.userTagline,
      },
    };
    getSendSlack(obj1);
    store.dispatch(messagingActions.newMessage({ ...data, passions: data?.passions ? JSON.parse(data.passions) : undefined }));
    store.dispatch(candidatesActions.removeCustomLoading());
    store.dispatch(callsActions.removeCustomCallLoading());
    store.dispatch(pushActions.toggleMessagePush(true));
  }

  if (MessageType.MatchAccepted === data?.type) {
    store.dispatch(messagingActions.NotificationDeliveredRequest(data?.matchId));
    store.dispatch(messagingActions.newMessage({ ...data, passions: data?.passions ? JSON.parse(data.passions) : undefined }));
    if (data?.callId) {
      const obj1 = {
        title: strings.notification_accepted,
        data: {
          description: JSON.stringify(data?.description),
          matchId: data?.callId,
          passions: data?.passions,
          type: data?.type,
          userName: data.userName,
          userTagline: data?.userTagline,
        },
      };
      getSendSlack(obj1);
      store.dispatch(callsActions.getCallRequest(data?.callId));
    }
  }

  if (MessageType.MatchCanceled === data?.type) {
    const obj1 = {
      title: strings.notification_cancelled,
      data: {
        description: JSON.stringify(data?.description),
        matchId: data?.matchId,
        passions: data?.passions,
        type: data?.type,
        userName: data?.userName,
        userTagline: data?.userTagline,
      },
    };
    getSendSlack(obj1);
    store.dispatch(pushActions.toggleMessagePush(false));
    store.dispatch(messagingActions.newMessage(null));
  }
  if (MessageType.MatchAddTime === data?.type) {
    const obj1 = {
      title: strings.notification_add_time,
      data: {
        description: JSON.stringify(data?.description),
        matchId: data?.matchId,
        passions: data?.passions,
        type: data?.type,
        userName: data?.userName,
        userTagline: data?.userTagline,
      },
    };
    getSendSlack(obj1);
    store.dispatch(callsActions.prolongationRequestCaller('caller'));
  }

  e.complete();
});

AppRegistry.registerComponent(appName, () => App);
