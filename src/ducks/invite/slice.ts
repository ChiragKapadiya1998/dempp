import { createSlice } from '@reduxjs/toolkit';
import { InviteUserRequest, InviteUserSuccess, InviteUserFailure, State, UpdateInviteData, ClearInviteUserStatus } from './types';
import { INVITE } from '../../utils/constants';
import { actions as modalActions } from '../modals';

const name = INVITE;
const initialState: State = {
  loading: false,
  err: null,
  inviteData: null,
  invitationSent: false,
};

const inviteUserRequest: InviteUserRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const inviteUserSuccess: InviteUserSuccess = (state) => {
  state.loading = false;
  state.invitationSent = true;
};

const inviteUserFailure: InviteUserFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const clearInviteUserStatus: ClearInviteUserStatus = (state) => {
  state.loading = false;
  state.invitationSent = false;
};

const updateInviteData: UpdateInviteData = (state, { payload }) => {
  state.inviteData = payload;
};

const reducers = {
  inviteUserRequest,
  inviteUserSuccess,
  inviteUserFailure,
  clearInviteUserStatus,
  updateInviteData,
};

export default createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (b) => b.addCase(modalActions.toggleInvite, (state) => ({ ...state, err: null })),
});
