import { createSlice } from '@reduxjs/toolkit';
import { PUSH } from '../../utils/constants';
import { State, ToggleMessagePush } from './types';

const name = PUSH;

const initialState: State = {
  showPush: false,
  showCallend: false,
};

const toggleMessagePush: ToggleMessagePush = (state, { payload }) => {
  state.showPush = payload;
};
const toggleCallEnd: ToggleMessagePush = (state, { payload }) => {
  state.showCallend = payload;
};

const reducers = {
  toggleMessagePush,
  toggleCallEnd,
};

export default createSlice({ name, initialState, reducers });
