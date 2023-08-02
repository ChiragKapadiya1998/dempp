import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { TOKEN } from '../../utils/constants';
import { State } from './types';
import { actions as authActions } from '../auth';

const initialState: State = {
  accessToken: null,
  expiresAt: null,
  isProfileFilled: false,
  username: null,
};

const name = TOKEN;
const reducers = {};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder
    .addCase(authActions.logInSuccess, (state, action) => {      
      state.accessToken = action.payload.token.accessToken;
      state.isProfileFilled = action.payload.user.isProfileFilled;
      state.username = action.payload.user.username;
    })
    .addCase(authActions.logout, () => initialState)
    .addCase(authActions.signUpSuccess, (state, action) => {
      state.accessToken = action.payload.token.accessToken;
      state.isProfileFilled = action.payload.user.isProfileFilled;
      state.username = action.payload.user.username;
    })
    .addCase(authActions.setUpUserProfileSuccess, (state, action) => {
      state.isProfileFilled = true;
      state.username = action.payload.username;
    })
    .addCase(authActions.setUserProfileSuccess, (state, action) => {
      state.isProfileFilled = true;
      state.username = action.payload.username;
    })
    .addCase(authActions.loginUser, (state, action) => {
      state.isProfileFilled = true;
      state.username=action.payload.username
    });
};

export default createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});
