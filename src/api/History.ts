import { History } from '../ducks/history/types';
import RequestHelper from '../utils/RequestHelper';

export default class HistoryApi {
  static getHistoryqueries = async (token: string): Promise<History[]> => {
    const url = `queries`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static getHistoryReceived = async (token: string): Promise<History[]> => {
    const url = `matches`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static getHistoryReceivedInfo = async (token: string, payload: number): Promise<History[]> => {
    console.log('token', token);
    const url = `matches/${payload}`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };
  static getHistoryqueriesInfo = async (token: string, payload: number): Promise<History[]> => {
    const url = `queries/${payload}`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static getHistoryQueriesClose = async (token: string, callId: number): Promise<History[]> => {
    const url = `queries/${callId}`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'closed' }),
    };

    return RequestHelper.fetch(url, options);
  };

  static getHistoryQueriesDecline = async (token: string, callId: number): Promise<History[]> => {
    const url = `matches/${callId}/decline`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };
  static getHistoryqueriesRecall = async (token: string, payload: number): Promise<History[]> => {
    const url = `queries/${payload}/recall`;
    console.log('token', token);

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('options', options);

    return RequestHelper.fetch(url, options);
  };

  static getHistoryAnswerClosed = async (token: string, payload: any): Promise<History[]> => {
    const url = `matches/${payload?.id}/answerclosedquery`;
    console.log('token', token);

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isAnswerClosedQuery: payload?.status }),
    };
    return RequestHelper.fetch(url, options);
  };
}
