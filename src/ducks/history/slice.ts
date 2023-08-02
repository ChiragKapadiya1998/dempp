import { createSlice } from '@reduxjs/toolkit';
import {
  HistoryClosedQuerySuccess,
  HistoryCloseSuccess,
  HistoryFailure,
  HistoryInfoRequest,
  HistoryRequest,
  HistorySuccess,
  State,
  UpdateHistoryStatus,
} from './types';
import { HISTORY } from '../../utils/constants';

const name = HISTORY;

const initialState: State = {
  count: 0,
  loading: false,
  err: null,
  myQueries: [],
  receivedQueries: [],
  modalQueriesInfo: [],
  queriesInfo: [],
  queriesLoading: false,
  modalVisible: false,
  closeLoading: false,
};

const updateHistoryStatus: UpdateHistoryStatus = (state, { payload }) => {
  state.count = payload;
};

const historyQueriesRequest: HistoryRequest = (state) => {
  state.queriesLoading = true;
  state.err = null;
  state.myQueries = [];
};

const historyQueriesSuccess: HistorySuccess = (state, { payload }) => {
  state.myQueries = payload;
  state.queriesLoading = false;
};

const historyQueriesFailure: HistoryFailure = (state, { payload }) => {
  state.queriesLoading = false;
  state.err = payload;
};

const historyReceviedRequest: HistoryRequest = (state) => {
  state.queriesLoading = true;
  state.err = null;
  state.myQueries = [];
};

const historyReceviedSuccess: HistorySuccess = (state, { payload }) => {
  state.myQueries = payload;
  state.count = state.myQueries.filter((item) => {
    return item?.finalStatus == 'missed' || item?.finalStatus == 'disconnected';
  })?.length;
  state.queriesLoading = false;
};

const historyReceviedFailure: HistoryFailure = (state, { payload }) => {
  state.queriesLoading = false;
  state.err = payload;
};

//modal opne
const toggleModalHistory: HistoryInfoRequest = (state, { payload }) => {
  state.modalVisible = payload;
};

//modal opne
const toggleQueriesHistory: HistoryInfoRequest = (state, { payload }) => {
  state.myQueries = payload;
};

//modal infomation
const historyQueriesInfoRequest: HistoryInfoRequest = (state) => {
  state.loading = true;
  state.err = null;
  state.queriesInfo = [];
};

const historyQueriesInfoSuccess: HistorySuccess = (state, { payload }) => {
  state.loading = false;
  state.queriesInfo = payload;
};

const historyQueriesInfoFailure: HistoryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
  state.queriesInfo = [];
};

//modal infomation
const historyQueriesCloseRequest: HistoryInfoRequest = (state, { payload }) => {
  state.closeLoading = true;
  state.err = null;
};

const historyQueriesCloseSuccess: HistoryCloseSuccess = (state) => {
  state.closeLoading = false;
};

const historyQueriesCloseFailure: HistoryFailure = (state, { payload }) => {
  state.closeLoading = false;
  state.err = payload;
};

//modal infomation recall
const historyQueriesRecallRequest: HistoryInfoRequest = (state, { payload }) => {
  state.loading = true;
  state.err = null;
};

const historyQueriesRecallSuccess: HistoryCloseSuccess = (state) => {
  state.loading = false;
};

const historyQueriesRecallFailure: HistoryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

//modal AnswerClosedQuery
const historyAnswerClosedQueryRequest: HistoryInfoRequest = (state, { payload }) => {
  state.loading = true;
  state.err = null;
};

const historyAnswerClosedQuerySuccess: HistoryClosedQuerySuccess = (state, { payload }) => {
  state.loading = false;
  state.queriesInfo = payload;
};

const historyAnswerClosedQueryFailure: HistoryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

//modal opne
const historyBothInfoModalRequest: HistoryInfoRequest = (state) => {
  state.loading = false;
  state.err = null;
  state.modalQueriesInfo = [];
};

const historyBothInfoModalSuccess: HistorySuccess = (state, { payload }) => {
  state.loading = false;
  state.modalQueriesInfo = payload;
};

const historyBothInfoModalFailure: HistoryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
  state.modalQueriesInfo = [];
};
const reducers = {
  updateHistoryStatus,
  historyQueriesRequest,
  historyQueriesSuccess,
  historyQueriesFailure,
  historyReceviedRequest,
  historyReceviedSuccess,
  historyReceviedFailure,
  historyQueriesInfoRequest,
  historyQueriesInfoSuccess,
  historyQueriesInfoFailure,
  historyQueriesCloseRequest,
  historyQueriesCloseSuccess,
  historyQueriesCloseFailure,
  historyQueriesRecallRequest,
  historyQueriesRecallSuccess,
  historyQueriesRecallFailure,
  toggleModalHistory,
  toggleQueriesHistory,
  historyAnswerClosedQueryRequest,
  historyAnswerClosedQuerySuccess,
  historyAnswerClosedQueryFailure,
  historyBothInfoModalRequest,
  historyBothInfoModalSuccess,
  historyBothInfoModalFailure,
};

export default createSlice({ name, initialState, reducers });
