import { createSlice } from '@reduxjs/toolkit';
import { FirstStartSuccess, RemoteConfigInitRequest, RemoteConfigInitSuccess, RemoteConfigInitFailure, State } from './types';
import { INITIAL } from '../../utils/constants';

const loop = () => {};

const name = INITIAL;
const initialState: State = {
  isFirstStart: true,
  isRemoteConfigEnabled: false,
};

const firstStartSuccess: FirstStartSuccess = (state) => {
  state.isFirstStart = false;
};

const firstDeleteSuccess: FirstStartSuccess = (state) => {
  state.isFirstStart = true;
};

const remoteConfigInitRequest: RemoteConfigInitRequest = (state) => {
  state.isRemoteConfigEnabled = false;
};

const remoteConfigInitSuccess: RemoteConfigInitSuccess = (state) => {
  state.isRemoteConfigEnabled = true;
};
const remoteConfigInitFailure: RemoteConfigInitFailure = loop;

const reducers = {
  firstStartSuccess,
  remoteConfigInitRequest,
  remoteConfigInitSuccess,
  remoteConfigInitFailure,
  firstDeleteSuccess,
};

export default createSlice({ name, initialState, reducers });
