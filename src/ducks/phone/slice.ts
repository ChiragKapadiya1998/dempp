import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { PHONE } from '../../utils/constants';
import {
  State,
  UpdatePhoneRequest,
  UpdatePhoneSuccess,
  UpdatePhoneFailure,
  ConfirmPhoneRequest,
  ConfirmPhoneSuccess,
  ConfirmPhoneFailure,
} from './types';
import { actions as authActions } from '../auth';

const initialState: State = {
  loading: false,
  number: null,
  country: null,
  err: null,
  backLogin:false
};

const updatePhoneRequest: UpdatePhoneRequest = (state, { payload }) => {
  state.loading = true;
  state.err = null;
  state.number = payload.phone;
  state.country = payload.country;
};

const updatePhoneSuccess: UpdatePhoneSuccess = (state) => {
  state.loading = false;
};

const updatePhoneFailure: UpdatePhoneFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const confirmPhoneRequest: ConfirmPhoneRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const confirmPhoneSuccess: ConfirmPhoneSuccess = (state) => {
  state.loading = false;
  state.number = null;
  state.country = null;
  state.backLogin=true
};

const confirmPhoneFailure: ConfirmPhoneFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const reducers = {
  updatePhoneRequest,
  updatePhoneSuccess,
  updatePhoneFailure,
  confirmPhoneRequest,
  confirmPhoneSuccess,
  confirmPhoneFailure,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({ name: PHONE, initialState, reducers, extraReducers });
