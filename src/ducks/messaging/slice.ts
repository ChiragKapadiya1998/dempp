import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
  TFCMInitRequest,
  TFCMInitSuccess,
  TFCMInitFailure,
  State,
  NewMessage,
  UpdateMessageData,
  TNotificationDeliveredequest,
  TNotificationDeliveredSuccess,
  TNotificationDeliveredFailure,
  TNotificationPermissionHandler,
} from './types';
import { FCM } from '../../utils/constants';
import { actions as authActions } from '../auth';

const name = FCM;
const initialState: State = {
  err: null,
  message: null,
  initMessage: null,
  showNotificationError: false,
};

const FCMInitRequest: TFCMInitRequest = (state) => {
  state.err = null;
};

const FCMInitSuccess: TFCMInitSuccess = (state, { payload }) => {};

const FCMInitFailure: TFCMInitFailure = (state, { payload }) => {
  state.err = payload;
};

const newMessage: NewMessage = (state, { payload }) => {
  state.message = payload;
};

const startWithInitMessage: NewMessage = (state, { payload }) => {
  state.initMessage = payload;
};

const updateMessageData: UpdateMessageData = (state, { payload }) => {
  state.message = state.message ? { ...state.message, ...payload } : state.message;
  state.initMessage = state.initMessage ? { ...state.initMessage, ...payload } : state.initMessage;
};

const NotificationDeliveredRequest: TNotificationDeliveredequest = (state) => {
  state.err = null;
};
const NotificationDeliveredSuccess: TNotificationDeliveredSuccess = (state, { payload }) => {};
const NotificationDeliveredFailure: TNotificationDeliveredFailure = (state, { payload }) => {
  state.err = payload;
};
const NotificationPermissionHandler: TNotificationPermissionHandler = (state, { payload }) => {
  state.showNotificationError = payload;
};
const reducers = {
  FCMInitRequest,
  FCMInitSuccess,
  FCMInitFailure,
  newMessage,
  startWithInitMessage,
  updateMessageData,
  NotificationDeliveredRequest,
  NotificationDeliveredSuccess,
  NotificationDeliveredFailure,
  NotificationPermissionHandler,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({ name, initialState, reducers, extraReducers });
