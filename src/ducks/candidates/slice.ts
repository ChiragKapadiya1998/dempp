import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { actions as authActions } from '../auth';
import { actions as callsActions } from '../calls';
import { actions as passionsActions } from '../passions';
import { actions as pushActions } from '../push';
import {
  State,
  SearchCandidatesFailure,
  SearchCandidatesRequest,
  SearchCandidatesSuccess,
  AnswerCandidateRequest,
  AnswerCandidateSuccess,
  AnswerCandidateFailure,
  MatchAccepted,
  Mute,
  CancelQuerySuccess,
  CancelQueryRequest,
  CancelQueryFailure,
  CandidateCustomError,
  RemoveCustomError,
  SearchCandidatesLengthSuccess,
  SearchCandidatesSDPSuccess,
  SearchCandidatesReSendRequest,
  SearchCandidatesSuccessToggles,
} from './types';
import { CANDIDATES } from '../../utils/constants';

const initialState: State = {
  err: null,
  currentQuery: null,
  loading: false,
  matchDataLength: 0,
  matchDataSDP: null,
  matchDataNotFound: false,
  errorMessage: null,
};

const searchCandidatesRequest: SearchCandidatesRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const searchCandidatesSuccess: SearchCandidatesSuccess = (state, { payload }) => {
  state.loading = false;
  state.currentQuery = payload.query.id;
};

const searchCandidatesFailure: SearchCandidatesFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const answerCandidateRequest: AnswerCandidateRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const answerCandidateSuccess: AnswerCandidateSuccess = (state) => {
  state.loading = false;
};

const answerCandidateFailure: AnswerCandidateFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const cancelQueryRequest: CancelQueryRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const cancelQuerySuccess: CancelQuerySuccess = () => initialState;

const cancelQueryFailure: CancelQueryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const candidateCustomError: CandidateCustomError = (state, { payload }) => {
  state.err = payload;
};

const removeCustomError: RemoveCustomError = (state) => {
  state.err = null;
};

const removeCustomLoading: RemoveCustomError = (state) => {
  state.loading = false;
};

const matchAccepted: MatchAccepted = (state) => state;
const mute: Mute = (state) => state;

const searchCandidatesLengthSuccess: SearchCandidatesLengthSuccess = (state, { payload }) => {
  console.log('payload', payload);

  state.matchDataLength = payload;
};
const searchCandidatesSDP: SearchCandidatesSDPSuccess = (state, { payload }) => {
  console.log('payload', payload);

  state.matchDataSDP = payload;
};

const searchCandidatesReSendRequest: SearchCandidatesReSendRequest = (state) => {
  state.err = null;
};

const searchCandidatesToggles: SearchCandidatesSuccessToggles = (state, { payload }) => {
  state.matchDataNotFound = payload.value;
  state.errorMessage = payload.errorMessage;
};

const name = CANDIDATES;
const reducers = {
  searchCandidatesRequest,
  searchCandidatesSuccess,
  searchCandidatesFailure,
  answerCandidateRequest,
  answerCandidateSuccess,
  answerCandidateFailure,
  cancelQueryRequest,
  cancelQuerySuccess,
  cancelQueryFailure,
  candidateCustomError,
  matchAccepted,
  mute,
  removeCustomError,
  removeCustomLoading,
  searchCandidatesLengthSuccess,
  searchCandidatesSDP,
  searchCandidatesReSendRequest,
  searchCandidatesToggles,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
  builder.addCase(callsActions.updateCallRequest, (state) => ({ ...state, currentQuery: null, matchDataSDP: null }));
  builder.addCase(callsActions.updateCallFailure, (state) => ({ ...state, loading: false }));
  builder.addCase(callsActions.updateCallSuccess, (state) => ({ ...state, loading: false }));
  builder.addCase(callsActions.createCallFailure, (state) => ({ ...state, loading: false }));
  builder.addCase(callsActions.clearCallData, (state) => ({ ...state, currentQuery: null, matchDataSDP: null }));
  builder.addCase(passionsActions.clearPassionsData, (state) => ({ ...state, currentQuery: null, matchDataSDP: null }));
};

export default createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});
