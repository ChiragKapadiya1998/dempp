import { createSlice } from '@reduxjs/toolkit';
import { State, GetContactsRequest, GetContactsSuccess, GetContactsFailure } from './types';
import { CONTACTS } from '../../utils/constants';

const initialState: State = {
  err: null,
  contacts: [],
  loading: false,
};

const getContactsRequest: GetContactsRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const getContactsSuccess: GetContactsSuccess = (state, { payload }) => {
  state.loading = false;
  state.contacts = payload;
};

const getContactsFailure: GetContactsFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const name = CONTACTS;
const reducers = {
  getContactsRequest,
  getContactsSuccess,
  getContactsFailure,
};

export default createSlice({
  name,
  initialState,
  reducers,
});
