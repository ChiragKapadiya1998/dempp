import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Passion } from '../passions/types';

export type AvailabilityStatus = 'sleep' | 'available' | 'feeling-chatty';

export type FeedbackOptions = 'very-disappointed' | 'somewhat-disappointed' | 'not-disappointed' | 'not-sure';
export type FeedbackCallOptions = 'Yes, close the query' | 'No, keep query open for callbacks';

export type AvailabilitySettings = {
  id: number;
  startTime: string;
  endTime: string;
  type: AvailabilityStatus;
};

export type Avatar = {
  m: string;
  s: string;
  l: string;
  original: string;
} | null;

export type User = {
  id: number;
  name: string | null;
  username: string;
  phone: string;
  maxQueriesPerDay: number;
  isProfileFilled: boolean;
  isOnBoardingFinished: boolean;
  tagline: string | null;
  availabilityStatus: AvailabilityStatus;
  avatar: Avatar;
  status: string;
  showReportModal: boolean;
  taglineAudio: string | null;
  taglineAudioDuration: number;
  passions: Passion[];
  availabilitySettings: AvailabilitySettings[];
  unavailableTo: string;
  oneSignalId: string;
  isActive: boolean;
  timeInHours: number;
  sleepTimeInHours: number;
  soundFileId: string;
};

export type UserQueries = {
  currentPage?: number;
  data?: object;
  pages?: number;
  perPage?: number;
  total?: number;
};

export type UpdateUserPayload = {
  username?: string;
  name?: string;
  maxQueriesPerDay?: number;
  isProfileFilled?: boolean;
  isOnBoardingFinished?: boolean;
  tagline?: string;
  availabilityStatus?: AvailabilityStatus;
  avatar?: string;
  status?: string;
  showReportModal?: boolean;
  taglineAudio?: string | null;
  taglineAudioDuration?: number;
  passions?: Partial<Passion>[];
  availabilitySettings?: AvailabilitySettings[];
  unavailableTo?: string;
  isActive?: boolean;
};
export type UpdateUserPayloadDemo = {
  availabilityStatus?: AvailabilityStatus;
  timeInHours?: number;
  soundFileId?: string;
};

export type State = {
  data: User | null;
  userQueries: UserQueries | null;
  loading: boolean;
  err: null | string;
  deletingUser: {
    loading: boolean;
    isModalShown: boolean;
  };
  isUserEditing: boolean;
  isEditTagline: boolean;
  isModesvisible: boolean;
  isModesValue: object;
  userError: null | string;
};
export type userState = {
  isModesvisible: boolean;
  isModesValue: object;
};

type GetUserSuccessAction = PayloadAction<User>;
type GetUserQueriesSuccessAction = PayloadAction<UserQueries>;
type GetUserFailureAction = PayloadAction<string>;

export type GetUserRequest = CaseReducer<State>;
export type GetUserSuccess = CaseReducer<State, GetUserSuccessAction>;
export type GetUserQueriesSuccess = CaseReducer<State, GetUserQueriesSuccessAction>;
export type GetUserFailure = CaseReducer<State, GetUserFailureAction>;

export type UpdateUserRequest = CaseReducer<State, PayloadAction<UpdateUserPayload>>;
export type UpdateUserStatusRequest = CaseReducer<State, PayloadAction<UpdateUserPayloadDemo>>;
export type UpdateUserSuccess = CaseReducer<State, PayloadAction<Partial<User & { passions: Passion[] }>>>;
export type UpdateUserFailure = CaseReducer<State, PayloadAction<string>>;

// AvailabilitySetting

export type PutAvailabilitySettingPayload = {
  maxQueriesPerDay: number;
  modes: AvailabilitySettings[];
};

export type PutAvailabilitySettingAction = PayloadAction<PutAvailabilitySettingPayload>;

export type PutAvailabilitySettingRequest = CaseReducer<State, PutAvailabilitySettingAction>;
export type PutAvailabilitySettingSuccess = CaseReducer<State, PutAvailabilitySettingAction>;
export type PutAvailabilitySettingFailure = CaseReducer<State, PayloadAction<string>>;

/** Get code to delete user */
export type DeleteUserGetCodeRequest = CaseReducer<State>;
export type DeleteUserGetCodeFailure = CaseReducer<State>;
export type DeleteUserGetCodeSuccess = CaseReducer<State>;

/** Regain code to delete user */
export type DeleteUserRegainCodeRequest = CaseReducer<State>;
export type DeleteUserRegainCodeFailure = CaseReducer<State>;
export type DeleteUserRegainCodeSuccess = CaseReducer<State>;

/** Check code to delete user */
export type DeleteUserCheckCodeRequestAction = PayloadAction<{ code: string }>;

export type DeleteUserCheckCodeRequest = CaseReducer<State, DeleteUserCheckCodeRequestAction>;

export type DeleteUserCheckCodeFailure = CaseReducer<State>;
export type DeleteUserCheckCodeSuccess = CaseReducer<State>;

/** Delete user */
export type DeleteUserRequestAction = PayloadAction<{ code: string }>;
export type DeleteUserRequest = CaseReducer<State, DeleteUserRequestAction>;
export type DeleteUserFailure = CaseReducer<State>;
export type DeleteUserSuccess = CaseReducer<State>;

/** Hide the confirm deleting user modal */
export type HideConfrimDeletingUser = CaseReducer<State>;

/** Edit Profile  */
export type UserEditPress = CaseReducer<State, PayloadAction<boolean>>;
export type UserModesPress = CaseReducer<State, PayloadAction<userState>>;
export type UserTaglineEditPress = CaseReducer<State, PayloadAction<boolean>>;
export type UserNameErrorValid = CaseReducer<State, PayloadAction<any>>;
