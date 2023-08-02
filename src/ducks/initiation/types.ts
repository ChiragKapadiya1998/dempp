import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  isFirstStart: boolean;
  isRemoteConfigEnabled: boolean;
};

export type FirstStartSuccess = CaseReducer<State>;
export type RemoteConfigInitRequest = CaseReducer<State>;
export type RemoteConfigInitSuccess = CaseReducer<State, PayloadAction<{ type: 'local' | 'remote'; message: string }>>;
export type RemoteConfigInitFailure = CaseReducer<State, PayloadAction<string>>;
