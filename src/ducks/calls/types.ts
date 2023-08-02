import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RTCPeerConnectionState } from 'react-native-webrtc';
import { PassionFromResponse } from '../passions/types';
import { User } from '../user/types';

type Query = {
  id: number;
  keywords: string[];
  passions: PassionFromResponse[];
  query: string;
};
type Match = {
  id: 446;
  proposedUserId: 13;
  query: Query;
  queryId: number;
  status: string;
};

export type CallData = {
  caller: User;
  callerId: number;
  duration: number | null;
  id: number;
  match: Match;
  matchId: 446;
  receiver: User;
  receiverId: number;
  status: string;
  settings: {
    receiver: {
      sdp: string;
    };
  };
};

export type UpdateCallDTO = {
  status: 'failed' | 'finished' | 'cancelled';
  duration: number; // seconds
  nextScreen: boolean;
};

export type Role = 'caller' | 'receiver';

/** Report user */
export type ReportUserRequestAction = PayloadAction<{
  callId: string;
  explanation: string;
  reason: string;
}>;

export type State = {
  report: {
    loading: boolean;
  };
  call: CallData | null;
  role: Role;
  err: string | null;
  loading: boolean;
  callStatus: RTCPeerConnectionState;
  callStartTime: number;
  prolongation: {
    receiver: boolean;
    caller: boolean;
  };
  prolongationCaller: boolean;
  prolongationReceiver: boolean;
};

export type ReportUserRequest = CaseReducer<State, ReportUserRequestAction>;
export type ReportUserFailure = CaseReducer<State>;
export type ReportUserSuccess = CaseReducer<State>;
export type CreateCallRequest = CaseReducer<State, PayloadAction<{ sdp: string }>>;
export type CreateCallSuccess = CaseReducer<State, PayloadAction<{ call: CallData; role: Role }>>;
export type CreateCallFailure = CaseReducer<State, PayloadAction<string>>;

export type UpdateCallRequest = CaseReducer<State, PayloadAction<UpdateCallDTO>>;
export type UpdateCallSuccess = CaseReducer<State>;
export type UpdateCallFailure = CaseReducer<State, PayloadAction<string>>;

export type GetCallRequest = CaseReducer<State, PayloadAction<CallData['id']>>;
export type GetCallSuccess = CaseReducer<State, PayloadAction<{ call: CallData; role: Role }>>;
export type GetCallFailure = CaseReducer<State, PayloadAction<string>>;

export type DeclineCallRequest = CaseReducer<State>;
export type DeclineCallSuccess = CaseReducer<State>;
export type DeclineCallFailure = CaseReducer<State, PayloadAction<string>>;

export type NotNowCallRequest = CaseReducer<State>;
export type NotNowCallSuccess = CaseReducer<State>;
export type NotNowCallFailure = CaseReducer<State, PayloadAction<string>>;

export type AcceptCall = CaseReducer<State>;
export type ChangeCallStatus = CaseReducer<State, PayloadAction<RTCPeerConnectionState>>;

export type ProlongationRequest = CaseReducer<State, PayloadAction<keyof State['prolongation']>>;
export type ProlongationSuccess = CaseReducer<State, PayloadAction<any>>;
export type ProlongationSuccessBoth = CaseReducer<State>;
export type ClearCallData = CaseReducer<State>;
export type SyncTimer = CaseReducer<State, PayloadAction<number>>;
