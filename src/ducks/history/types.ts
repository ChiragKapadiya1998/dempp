import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  count: number;
  loading: boolean;
  err: null | string;
  myQueries: [];
  receivedQueries: [];
  queriesInfo: [];
  modalQueriesInfo: [];
  queriesLoading: boolean;
  modalVisible: boolean;
  closeLoading: boolean;
};

export type UpdateHistoryStatus = CaseReducer<State, PayloadAction<State['count']>>;

export type HistoryFromResponse = {
  id?: number;
  name: string;
  categoryId?: number;
};
export interface History extends HistoryFromResponse {
  selected: boolean;
}

export type InviteData = {
  type: 'invite' | 'group-invite';
  id: number;
};

export type HistoryRequest = CaseReducer<State>;
export type HistoryInfoRequest = CaseReducer<State, PayloadAction<any>>;
export type HistorySuccess = CaseReducer<State, PayloadAction<[]>>;
export type HistoryCloseSuccess = CaseReducer<State>;
export type HistoryClosedQuerySuccess = CaseReducer<State, PayloadAction<any>>;
export type HistoryFailure = CaseReducer<State, PayloadAction<string>>;

export type HistoryRequestAction = PayloadAction<{
  payload: number;
}>;
