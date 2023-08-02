import { createSlice } from '@reduxjs/toolkit';
import { CALLS } from '../../utils/constants';
import remoteConfig from '@react-native-firebase/remote-config';

import {
  ReportUserFailure,
  ReportUserRequest,
  ReportUserSuccess,
  CreateCallFailure,
  CreateCallRequest,
  CreateCallSuccess,
  State,
  UpdateCallFailure,
  UpdateCallRequest,
  UpdateCallSuccess,
  GetCallRequest,
  GetCallSuccess,
  GetCallFailure,
  DeclineCallRequest,
  DeclineCallSuccess,
  DeclineCallFailure,
  AcceptCall,
  ChangeCallStatus,
  ProlongationRequest,
  SyncTimer,
  ClearCallData,
  ProlongationSuccess,
  NotNowCallFailure,
  NotNowCallSuccess,
  NotNowCallRequest,
  ProlongationSuccessBoth,
} from './types';

const name = CALLS;

const initialState: State = {
  report: {
    loading: false,
  },
  call: null,
  err: null,
  loading: false,
  role: 'caller',
  callStatus: 'closed',
  callStartTime: 0,
  prolongation: {
    receiver: false,
    caller: false,
  },
  prolongationCaller: false,
  prolongationReceiver: false,
};

const createCallRequest: CreateCallRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const createCallSuccess: CreateCallSuccess = (state, { payload }) => {
  state.call = payload.call;
  state.role = payload.role;
  state.loading = false;
};

const createCallFailure: CreateCallFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const updateCallRequest: UpdateCallRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const updateCallSuccess: UpdateCallSuccess = (state) => {
  state.loading = false;
};

const updateCallFailure: UpdateCallFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const getCallRequest: GetCallRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const getCallSuccess: GetCallSuccess = (state, { payload }) => {
  state.loading = false;
  state.call = payload.call;
  state.role = payload.role;
};

const getCallFailure: GetCallFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const declineCallRequest: DeclineCallRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const declineCallSuccess: DeclineCallSuccess = (state) => {
  state.loading = false;
};

const declineCallFailure: DeclineCallFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const changeCallStatus: ChangeCallStatus = (state, { payload }) => {
  state.callStatus = payload;
};

/** Report user */
const reportUserRequest: ReportUserRequest = (state) => {
  state.report.loading = true;
};
const reportUserFailure: ReportUserFailure = (state) => {
  state.report.loading = false;
};
const reportUserSuccess: ReportUserSuccess = (state) => {
  state.report.loading = false;
};

const prolongationRequestReceiver: ProlongationRequest = (state, { payload }) => {
  state.prolongationReceiver = true;
};

const prolongationRequestCaller: ProlongationRequest = (state, { payload }) => {
  state.prolongationCaller = true;
};

const prolongationSuccess: ProlongationSuccess = (state) => {
  state.prolongation = initialState.prolongation;
};
const prolongationSuccessBoth: ProlongationSuccessBoth = (state) => {
  state.prolongationReceiver = false;
  state.prolongationCaller = false;
};

const clearCallData: ClearCallData = () => initialState;

const acceptCall: AcceptCall = (state) => state;
const syncTimer: SyncTimer = (state, { payload }) => {
  state.callStartTime = payload;
};
//notNowCall
const notNowCallRequest: NotNowCallRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const notNowCallSuccess: NotNowCallSuccess = (state) => {
  state.loading = false;
};

const notNowCallFailure: NotNowCallFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const removeCustomCallLoading: NotNowCallSuccess = (state) => {
  state.loading = false;
};

const reducers = {
  reportUserRequest,
  reportUserFailure,
  reportUserSuccess,
  createCallRequest,
  createCallSuccess,
  createCallFailure,
  updateCallRequest,
  updateCallSuccess,
  updateCallFailure,
  getCallRequest,
  getCallSuccess,
  getCallFailure,
  declineCallRequest,
  declineCallSuccess,
  declineCallFailure,
  acceptCall,
  changeCallStatus,
  prolongationSuccess,
  prolongationRequestReceiver,
  prolongationRequestCaller,
  syncTimer,
  clearCallData,
  notNowCallRequest,
  notNowCallSuccess,
  notNowCallFailure,
  removeCustomCallLoading,
  prolongationSuccessBoth,
};

export default createSlice({ name, initialState, reducers });
