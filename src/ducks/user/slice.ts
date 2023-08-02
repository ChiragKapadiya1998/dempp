import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { USER } from '../../utils/constants';
import {
  DeleteUserCheckCodeRequest,
  DeleteUserCheckCodeSuccess,
  DeleteUserFailure,
  DeleteUserGetCodeFailure,
  DeleteUserGetCodeRequest,
  DeleteUserGetCodeSuccess,
  DeleteUserRegainCodeFailure,
  DeleteUserRegainCodeRequest,
  DeleteUserRegainCodeSuccess,
  DeleteUserRequest,
  DeleteUserSuccess,
  GetUserFailure,
  GetUserQueriesSuccess,
  GetUserRequest,
  GetUserSuccess,
  HideConfrimDeletingUser,
  PutAvailabilitySettingFailure,
  PutAvailabilitySettingRequest,
  PutAvailabilitySettingSuccess,
  State,
  UpdateUserFailure,
  UpdateUserRequest,
  UpdateUserStatusRequest,
  UpdateUserSuccess,
  UserEditPress,
  UserModesPress,
  UserNameErrorValid,
  UserTaglineEditPress,
} from './types';
import { actions as authActions } from '../auth';

const initialState: State = {
  data: null,
  userQueries: null,
  loading: false,
  err: null,
  deletingUser: {
    loading: false,
    isModalShown: false,
  },
  isUserEditing: false,
  isEditTagline: false,
  isModesvisible: false,
  isModesValue: {},
  userError: null,
};

const getUserRequest: GetUserRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const getUserSuccess: GetUserSuccess = (state, { payload }) => {
  state.data = payload;
  state.loading = false;
};

const getUserFailure: GetUserFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const getUserSessionStausRequest: GetUserRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const updateUserRequest: UpdateUserRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const updateUserStatusRequest: UpdateUserStatusRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const updateUserSuccess: UpdateUserSuccess = (state, { payload }) => {
  state.data = state.data ? { ...state.data, ...payload } : payload ? payload : state.data;
  state.loading = false;
  state.err = null;
};

const updateUserFailure: UpdateUserFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

const putAvailabilitySettingRequest: PutAvailabilitySettingRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const putAvailabilitySettingSuccess: PutAvailabilitySettingSuccess = (state, { payload }) => {
  state.data = state.data
    ? {
        ...state.data,
        availabilitySettings: payload.modes,
        maxQueriesPerDay: payload.maxQueriesPerDay,
      }
    : state.data;
  state.loading = false;
};

const putAvailabilitySettingFailure: PutAvailabilitySettingFailure = (state, { payload }) => {
  state.err = payload;
  state.loading = false;
};

/** Get code to delete user */
const getCodeToDeleteUserRequest: DeleteUserGetCodeRequest = (state) => {
  state.deletingUser.loading = true;
};
const getCodeToDeleteUserFailure: DeleteUserGetCodeFailure = (state) => {
  state.deletingUser.loading = false;
};
const getCodeToDeleteUserSuccess: DeleteUserGetCodeSuccess = (state) => {
  state.deletingUser.loading = false;
};

/** Regain code to delete user */
const regainCodeToDeleteUserRequest: DeleteUserRegainCodeRequest = (state) => {
  state.deletingUser.loading = true;
};
const regainCodeToDeleteUserFailure: DeleteUserRegainCodeFailure = (state) => {
  state.deletingUser.loading = false;
};
const regainCodeToDeleteUserSuccess: DeleteUserRegainCodeSuccess = (state) => {
  state.deletingUser.loading = false;
};

/** Check code to delete user */
const checkCodeToDeleteUserRequest: DeleteUserCheckCodeRequest = (state) => {
  state.deletingUser.loading = true;
};
const checkCodeToDeleteUserFailure: DeleteUserRegainCodeFailure = (state) => {
  state.deletingUser.loading = false;
};
const checkCodeToDeleteUserSuccess: DeleteUserCheckCodeSuccess = (state) => {
  state.deletingUser.loading = false;
  state.deletingUser.isModalShown = true;
};

/** Delete user */
const deleteUserRequest: DeleteUserRequest = (state) => {
  state.deletingUser.loading = true;
};
const deleteUserFailure: DeleteUserFailure = (state) => {
  state.deletingUser.loading = false;
};
const deleteUserSuccess: DeleteUserSuccess = (state) => {
  state.deletingUser.loading = false;
  state.deletingUser.isModalShown = false;
};

/** Hide the confirm deleting user modal */
const hideConfirmDeletingUserModal: HideConfrimDeletingUser = (state) => {
  state.deletingUser.isModalShown = false;
};
const userEditPress: UserEditPress = (state, { payload }) => {
  state.isUserEditing = payload;
};

const userModesPress: UserModesPress = (state, { payload }) => {
  state.isModesvisible = payload.isModesvisible;
  state.isModesValue = payload.isModesValue;
};
const userTaglineEditPress: UserTaglineEditPress = (state, { payload }) => {
  state.isEditTagline = payload;
};

const userNameErrorValid: UserNameErrorValid = (state, { payload }) => {
  state.userError = payload;
};

//Queries search list
const getUserQueriesRequest: GetUserRequest = (state) => {
  state.err = null;
};

const getUserQueriesSuccess: GetUserQueriesSuccess = (state, { payload }) => {
  state.userQueries = payload;
};

const getUserQueriesFailure: GetUserFailure = (state, { payload }) => {
  state.err = payload;
};

const updateUserNameRequest: UpdateUserRequest = (state) => {
  state.err = null;
  state.loading = true;
};

const name = USER;
const reducers = {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  getUserSessionStausRequest,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  putAvailabilitySettingRequest,
  putAvailabilitySettingSuccess,
  putAvailabilitySettingFailure,
  getCodeToDeleteUserRequest,
  getCodeToDeleteUserFailure,
  getCodeToDeleteUserSuccess,
  regainCodeToDeleteUserRequest,
  regainCodeToDeleteUserFailure,
  regainCodeToDeleteUserSuccess,
  checkCodeToDeleteUserRequest,
  checkCodeToDeleteUserFailure,
  checkCodeToDeleteUserSuccess,
  deleteUserRequest,
  deleteUserFailure,
  deleteUserSuccess,
  hideConfirmDeletingUserModal,
  userEditPress,
  userTaglineEditPress,
  userModesPress,
  updateUserStatusRequest,
  getUserQueriesRequest,
  getUserQueriesSuccess,
  getUserQueriesFailure,
  userNameErrorValid,
  updateUserNameRequest,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});
