import { createSlice } from '@reduxjs/toolkit';
import { FEEDBACK } from '../../utils/constants';

import {
  ApplicationFeedbackRequest,
  ApplicationFeedbackSuccess,
  ApplicationFeedbackFailure,
  CreateCallFeedbackFailure,
  CreateCallFeedbackRequest,
  CreateCallFeedbackSuccess,
  State,
  DropFeedbackState,
  CreateCallHelpRequest,
  CreateCallHelpFailure,
  CreateCallHelpSuccess,
} from './types';

const initialState: State = {
  loading: false,
  success: false,
  helpData: [],
};

const name = FEEDBACK;

/** Create call feedback */
const createCallFeedbackRequest: CreateCallFeedbackRequest = (state) => {
  state.loading = true;
};
const createCallFeedbackFailure: CreateCallFeedbackFailure = (state) => {
  state.loading = false;
};
const createCallFeedbackSuccess: CreateCallFeedbackSuccess = (state) => {
  state.loading = false;
};

const applicationFeedbackRequest: ApplicationFeedbackRequest = (state) => {
  state.loading = true;
};
const applicationFeedbackSuccess: ApplicationFeedbackSuccess = (state) => {
  state.loading = false;
  state.success = true;
};
const applicationFeedbackFailure: ApplicationFeedbackFailure = (state) => {
  state.loading = false;
};

const dropFeedbackState: DropFeedbackState = () => initialState;

/** Create call feedback */
const createCallHelpRequest: CreateCallHelpRequest = (state) => {
  state.helpData = state.helpData || [];
};
const createCallHelpFailure: CreateCallHelpFailure = (state) => {
  state.helpData = [];
};
const createCallHelpSuccess: CreateCallHelpSuccess = (state, { payload }) => {
  state.helpData = payload;
};

const reducers = {
  createCallFeedbackRequest,
  createCallFeedbackFailure,
  createCallFeedbackSuccess,
  applicationFeedbackRequest,
  applicationFeedbackSuccess,
  applicationFeedbackFailure,
  dropFeedbackState,
  createCallHelpRequest,
  createCallHelpFailure,
  createCallHelpSuccess,
};

export default createSlice({ name, initialState, reducers });
