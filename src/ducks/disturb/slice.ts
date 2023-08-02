import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { actions as authActions } from '../auth';
import { State } from './types';
import { DISTURB } from '../../utils/constants';
import { DisturbSwitcher } from './types';

const initialState: State = {
  disturbPeriod: 0,
};

const disturbSwitcher: DisturbSwitcher = (state, { payload }) => {
  state.disturbPeriod = payload;
};

const name = DISTURB;
const reducers = {
  disturbSwitcher,
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
