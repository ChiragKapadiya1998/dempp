import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';

export type ErrorType = {
  actionType: string;
  message?: string;
};

export type State = ErrorType[];
export type PushErrorAction = PayloadAction<ErrorType>;
export type PushError = CaseReducer<State, PushErrorAction>;
export type RemovePushError = CaseReducer<State>;
