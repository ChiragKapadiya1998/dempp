import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  showPush: boolean;
  showCallend: boolean;
};

export type ToggleMessagePush = CaseReducer<State, PayloadAction<boolean>>;
