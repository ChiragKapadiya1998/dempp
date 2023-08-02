import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { MODALS } from '../../utils/constants';
import { State, TogglePressetsMenu, ToggleCallConnection, ToggleProlongationModal, ToggleInvite } from './types';

import { actions as authActions } from '../auth';

const name = MODALS;
const initialState: State = {
  userPresetsMenu: false,
  inviteModal: false,
  invite: {
    title: '',
    message: '',
  },
  callCannection: false,
  prolongation: false,
};

const togglePressetsMenu: TogglePressetsMenu = (state, { payload }) => {
  state.userPresetsMenu = payload;
};
const toggleInvite: ToggleInvite = (state, { payload }) => {
  state.inviteModal = !state.inviteModal;
  state.invite = payload;
};

const toggleCallConnection: ToggleCallConnection = (state, { payload }) => {
  state.callCannection = payload;
};

const toggleProlongationModal: ToggleProlongationModal = (state, { payload }) => {
  state.callCannection = payload;
};

const reducers = {
  togglePressetsMenu,
  toggleInvite,
  toggleCallConnection,
  toggleProlongationModal,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({ name, initialState, reducers, extraReducers });
