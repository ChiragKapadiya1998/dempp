import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  userPresetsMenu: boolean;
  inviteModal: boolean;
  invite: {
    title: string;
    message: string;
  };
  callCannection: boolean;
  prolongation: boolean;
};

export type TogglePressetsMenu = CaseReducer<State, PayloadAction<boolean>>;
export type ToggleInvite = CaseReducer<State, PayloadAction<State['invite']>>;
export type ToggleCallConnection = CaseReducer<State, PayloadAction<boolean>>;
export type ToggleProlongationModal = CaseReducer<State, PayloadAction<boolean>>;
