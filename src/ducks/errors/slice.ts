import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { ERRORS } from '../../utils/constants';
import { parseRequestError } from '../../utils/functions';
import { State, PushError, RemovePushError } from './types';
import { actions as authActions } from '../auth';

const name = ERRORS;
const initialState: State = [];

/** PUSH A NEW ERROR INTO LIST */
const push: PushError = (state, { payload }) => {
  const message = !!payload.message ? parseRequestError(payload.message) : payload.message;
  state.push({ actionType: payload.actionType, message });
};

const removeError: RemovePushError = () => initialState;

const reducers = { push, removeError };
const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({ name, initialState, reducers, extraReducers });
