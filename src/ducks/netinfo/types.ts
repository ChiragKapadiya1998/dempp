import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  isConnected: boolean | null;
};

export type UpdateNetinfoStatus = CaseReducer<State, PayloadAction<State['isConnected']>>;
