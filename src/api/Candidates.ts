import Config from 'react-native-config';
import { QueryBody, SearchCandidatesResponse, MatchResponse, recallQueryBody, callBackQueryBody } from '../ducks/candidates/types';
import { getSendSlack } from '../utils/hooks';
import RequestHelper from '../utils/RequestHelper';
import axios from 'axios';

export default class CandidatesApi {
  static getQueries = async (token: string, payload: QueryBody): Promise<SearchCandidatesResponse> => {
    const url = 'queries';
    const useDataOnlyPush = false;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload, useDataOnlyPush }),
    };
    console.log('options', options);

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Get Queries api called',
      data: {
        candidates: 'Search Candidates',
        url: url,
        method: 'POST',
        body: JSON.stringify({ ...payload, useDataOnlyPush }),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static getRemoteDescription = async (token: string, matchId: number | string): Promise<MatchResponse> => {
    const url = `matches/${matchId}`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Get Remote Description api called',
      data: {
        candidates: 'Receiver Candidates',
        url: url,
        method: 'GET',
        response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static cancelQuery = async (token: string, id: number | string, status: string) => {
    const url = `queries/${id}`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ status: status }), //disconnected/unanswered/closed
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Cancel Query api called',
      data: {
        url: url,
        method: 'PATCH',
        status: status,
        // response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static recallQueries = async (token: string, id: number, payload: recallQueryBody): Promise<SearchCandidatesResponse> => {
    const url = `${Config.BASE_URL}/queries/${id}/recall`;

    const apiResponse = axios(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log(err));
    const obj = {
      title: 'Recall Queries api called',
      data: {
        candidates: 'Search Candidates',
        url: url,
        method: 'POST',
        body: JSON.stringify({ ...payload }),
        // response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static callBackQueries = async (token: string, payload: callBackQueryBody): Promise<SearchCandidatesResponse> => {
    const url = `${Config.BASE_URL}/calls/callback`;
    console.log('callBackQueries payload', payload);

    const apiResponse = axios(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then(({ data }) => {
        console.log('datadata', data);

        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    const obj = {
      title: 'Call back Queries api called',
      data: {
        candidates: 'Search Candidates',
        url: url,
        method: 'POST',
        body: JSON.stringify(payload),
        response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };
}
