import { createSlice } from '@reduxjs/toolkit';
import { State, UpdateNetinfoStatus } from './types';
import { NETINFO } from '../../utils/constants';

const name = NETINFO;

const initialState: State = {
  isConnected: true,
};

const updateNetinfoStatus: UpdateNetinfoStatus = (state, { payload }) => {
  state.isConnected = payload;
};

const reducers = { updateNetinfoStatus };

export default createSlice({ name, initialState, reducers });
