import { CountryCode, E164Number } from 'libphonenumber-js';
import { POST } from '../utils/constants';
import RequestHelper from '../utils/RequestHelper';
import { LogInResponse, SignUpResponse } from './Auth.types';

export default class AuthApi {
  /** Get registration code */
  static getRegistrationCode = async (phone: E164Number): Promise<void> => {
    const url = 'auth/sign-up/send-code';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Check registration code */
  static checkRegistrationCode = async (payload: { phone: E164Number; code: string }): Promise<any> => {
    const url = 'auth/sign-up/check-code';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Registrate a new user */
  static signUpUser = async ({
    phone,
    code,
    inviteId,
    groupId,
    country,
  }: {
    phone: E164Number;
    code: string;
    country: CountryCode;
    inviteId?: number;
    groupId?: number;
  }): Promise<SignUpResponse> => {
    const url = 'auth/sign-up';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        code,
        inviteId,
        groupId,
        country,
      }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Get code to log in */
  static getLoginCode = async (username: E164Number): Promise<LogInResponse> => {
    const url = 'auth/sign-in/send-code';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Log in */
  static logIn = async (username: E164Number, code: string): Promise<LogInResponse> => {
    const url = 'auth/sign-in';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, code }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Get reset password code */
  static getPasswordResetCode = async (phone: E164Number): Promise<void> => {
    const url = 'auth/reset-password/send-code';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Check reset password code */
  static checkPasswordResetCode = async (phone: E164Number, code: string): Promise<void> => {
    const url = 'auth/reset-password/check-code';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Reset password */
  static resetPassword = async ({
    phone,
    code,
    password,
    passwordConfirmation,
  }: {
    phone: E164Number;
    code: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<void> => {
    const url = 'auth/reset-password';
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code, password, passwordConfirmation }),
    };

    return RequestHelper.fetch(url, options);
  };
}
