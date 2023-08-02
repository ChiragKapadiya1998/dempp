import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { PassionFromResponse } from '../passions/types';
import { User } from '../user/types';

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  RECEIVER_DECLINED = 'receiver-declined',
  CALLER_DECLINED = 'caller-declined',
  TIMED_OUT = 'timed-out',
}

export type Query = {
  id: number;
  query: string;
  keywords: string[];
  passions: PassionFromResponse[];
};

export type SearchCandidatesResponse = {
  query: Query;
  users: User[];
};

export type SearchCandidatesLengthResponse = {
  number: number;
};

export type QueryBody = {
  sdp: string;
  question: string;
  passions: PassionFromResponse[];
  queryId: string;
};

export type recallQueryBody = {
  sdp: string;
  pageSize: number;
};
export type callBackQueryBody = {
  sdp: string;
  matchId: number;
};

export type State = {
  err: string | null;
  errorMessage: string | null;
  loading: boolean;
  currentQuery: number | null;
  matchDataLength: number;
  matchDataSDP: string | null;
  matchDataNotFound: boolean;
};

export type MatchResponse = {
  sdp: string;
  status: MatchStatus;
  queryId: number;
};
export type MatchResponseData = {
  matchDataLength: number;
  matchDataSDP: string | null;
};

//  Disturb settings

export type SearchCandidatesRequest = CaseReducer<State, PayloadAction<any>>;
export type SearchCandidatesSuccessToggles = CaseReducer<State, PayloadAction<any>>;
export type SearchCandidatesReSendRequest = CaseReducer<State>;
export type SearchCandidatesSuccess = CaseReducer<State, PayloadAction<SearchCandidatesResponse>>;
export type SearchCandidatesFailure = CaseReducer<State, PayloadAction<string>>;

export type AnswerCandidateRequest = CaseReducer<State>;
export type AnswerCandidateSuccess = CaseReducer<State>;
export type AnswerCandidateFailure = CaseReducer<State, PayloadAction<string>>;

export type CancelQueryRequest = CaseReducer<State, PayloadAction<{ id: number | null; status: string }>>;
export type CancelQuerySuccess = CaseReducer<State>;
export type CancelQueryFailure = CaseReducer<State, PayloadAction<string>>;

export type MatchAccepted = CaseReducer<State, PayloadAction<string>>;
export type Mute = CaseReducer<State, PayloadAction<boolean>>;
export type CandidateCustomError = CaseReducer<State, PayloadAction<string>>;
export type RemoveCustomError = CaseReducer<State>;

export type SearchCandidatesLengthSuccess = CaseReducer<State, PayloadAction<number>>;
export type SearchCandidatesSDPSuccess = CaseReducer<State, PayloadAction<string | null>>;
