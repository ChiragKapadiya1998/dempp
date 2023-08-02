import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';

export type State = {
  loading: boolean;
  success: boolean;
  helpData: ParlaHelp[];
};

/** Create call feedback */
export type CreateCallFeedbackRequestAction = PayloadAction<{
  callId: string;
  feedback: string;
  rating: number;
  isQueryClosed: boolean;
}>;

export type CreateCallHelpRequestAction = PayloadAction<{
  callId: string;
  feedback: string;
  rating: number;
  isQueryClosed: boolean;
}>;

export type ParlaHelp = {
  topic: string;
  QAs: ParlaHelpSub[];
};

export type ParlaHelpSub = {
  question: string;
  answer: string;
};

export type FeedbackDTO = {
  feedback: string;
  impression: string;
};

export type CreateCallFeedbackRequest = CaseReducer<State, CreateCallFeedbackRequestAction>;
export type CreateCallFeedbackFailure = CaseReducer<State>;
export type CreateCallFeedbackSuccess = CaseReducer<State>;

export type CreateCallHelpRequest = CaseReducer<State>;
export type CreateCallHelpFailure = CaseReducer<State>;
export type CreateCallHelpSuccess = CaseReducer<State, PayloadAction<ParlaHelp[]>>;

export type ApplicationFeedbackRequest = CaseReducer<State, PayloadAction<FeedbackDTO>>;
export type ApplicationFeedbackSuccess = CaseReducer<State>;
export type ApplicationFeedbackFailure = CaseReducer<State, PayloadAction<string>>;

export type DropFeedbackState = CaseReducer<State>;
