import { StoreState } from '../../store';

export const getAccessToken = (state: StoreState) =>
  state.token.accessToken ?? null;

export const getIsProfileFilled = (state: StoreState) =>
  state.token.isProfileFilled;
