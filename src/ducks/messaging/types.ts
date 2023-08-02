import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { OSNotification } from 'react-native-onesignal';

export enum MessageType {
  MatchFound = 'match-found',
  MatchAccepted = 'match-accepted',
  MatchCanceled = 'match-cancelled',
  MatchAddTime = 'call-add-time',
}

export enum CallMessageType {
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Failed = 'failed',
}

export type MessageData = {
  type: MessageType;
  description: string;
  passions: string[];
  matchId: string | number;
  userName: string;
  userTagline: string;
  userAvatar: string;
  reasonTitle?: string;
  reasonDescription?: string;
  callId?: number;
};

export type State = {
  err: null | string;
  showNotificationError?: boolean;
  message: null | MessageData;
  initMessage: null | MessageData;
};

export type TFCMInitRequest = CaseReducer<State>;
export type TFCMInitSuccess = CaseReducer<State>;
export type TFCMInitFailure = CaseReducer<State, PayloadAction<State['err']>>;

export type TNotificationDeliveredequest = CaseReducer<State>;
export type TNotificationDeliveredSuccess = CaseReducer<State>;
export type TNotificationDeliveredFailure = CaseReducer<State, PayloadAction<State['err']>>;
export type TNotificationPermissionHandler = CaseReducer<State, PayloadAction<boolean>>;

export type NewMessage = CaseReducer<State, PayloadAction<State['message']>>;
export type UpdateMessageData = CaseReducer<State, PayloadAction<Partial<MessageData>>>;
