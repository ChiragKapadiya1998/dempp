import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { E164Number } from 'libphonenumber-js';
import { Contact, PhoneNumber } from 'react-native-contacts';

export interface ParlaContact extends Omit<Contact, 'phoneNumbers'> {
  phoneNumbers: {
    label: string;
    number: E164Number;
    inParla: boolean;
  }[];
}

export type State = {
  err: string | null;
  loading: boolean;
  contacts: ParlaContact[];
};

export type GetContactsRequest = CaseReducer<State>;
export type GetContactsSuccess = CaseReducer<State, PayloadAction<ParlaContact[]>>;
export type GetContactsFailure = CaseReducer<State, PayloadAction<string>>;
