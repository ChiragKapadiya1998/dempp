import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { E164Number } from 'libphonenumber-js';

export type InviteData = {
  type: 'invite' | 'group-invite';
  id: number;
};

export type State = {
  loading: boolean;
  inviteData: null | InviteData;
  err: null | string;
  invitationSent: boolean;
};

export type InviteUserRequest = CaseReducer<State, PayloadAction<{ phone: E164Number }>>;
export type InviteUserSuccess = CaseReducer<State>;
export type InviteUserFailure = CaseReducer<State, PayloadAction<string>>;
export type ClearInviteUserStatus = CaseReducer<State>;

export type UpdateInviteData = CaseReducer<State, PayloadAction<State['inviteData']>>;
