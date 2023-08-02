import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CountryCode, E164Number } from 'libphonenumber-js';

export type PassionMeta = {
  page?: number;
  pageSize?: number;
  query: string;
};

export type PassionCategory = {
  id: number;
  name: string;
  passions: Passion[];
  creatorId: null | number;
  createdAt: Date;
  updated_at: Date;
};

export type PassionFromResponse = {
  id?: number;
  name: string;
  categoryId?: number;
};

export interface Passion extends PassionFromResponse {
  selected: boolean;
}

export type State = {
  number: E164Number | null;
  country: CountryCode | null;
  loading: boolean;
  err: string | null;
  backLogin: boolean;
};

export type UpdatePhoneRequest = CaseReducer<State, PayloadAction<{ phone: E164Number; country: CountryCode }>>;
export type UpdatePhoneSuccess = CaseReducer<State>;
export type UpdatePhoneFailure = CaseReducer<State, PayloadAction<string>>;

export type ConfirmPhoneRequest = CaseReducer<State, PayloadAction<{ code: string }>>;
export type ConfirmPhoneSuccess = CaseReducer<State>;
export type ConfirmPhoneFailure = CaseReducer<State, PayloadAction<string>>;
