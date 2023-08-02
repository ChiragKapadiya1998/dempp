import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  disturbPeriod: number; // as hours
};

//  Disturb settings

export type DisturbSwitcher = CaseReducer<State, PayloadAction<number>>;
