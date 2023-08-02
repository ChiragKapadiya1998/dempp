import { CallData, UpdateCallDTO } from '../ducks/calls/types';
import RequestHelper from '../utils/RequestHelper';
import { POST } from '../utils/constants';
import { getSendSlack } from '../utils/hooks';

export default class CallApi {
  static createCall = async (token: string, matchId: number | string, sdp: string): Promise<CallData> => {
    const url = `matches/${matchId}/accept`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sdp }),
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'create api called',
      data: {
        url: url,
        method: 'PATCH',
        body: JSON.stringify({ sdp }),
        // response: JSON.stringify(apiResponse?.status),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static createCallBack = async (token: string, matchId: number | string, sdp: string): Promise<CallData> => {
    const url = `matches/${matchId}/callback/accept`;

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sdp }),
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'create call back api called',
      data: {
        url: url,
        method: 'PATCH',
        body: JSON.stringify({ sdp }),
        // response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static declineCall = async (token: string, matchId: number | string): Promise<void> => {
    const url = `matches/${matchId}/decline`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Decline api called',
      data: {
        url: url,
        method: 'PATCH',
        response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static notNowCall = async (token: string, matchId: number | string): Promise<void> => {
    const url = `matches/${matchId}/timeout`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'not Now Call api called',
      data: {
        url: url,
        method: 'PATCH',
        response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static reportUser = async (
    token: string,
    { callId, explanation, reason }: { callId: string; explanation: string; reason: string },
  ): Promise<void> => {
    const url = `calls/${callId}/reports`;
    const options: RequestInit = {
      method: POST,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ explanation, reason }),
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Report user api called',
      data: {
        url: url,
        method: 'POST',
        body: JSON.stringify({ explanation, reason }),
        response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static updateCall = async (token: string, callId: string | number, updateDTO: UpdateCallDTO): Promise<CallData> => {
    const finalData = {
      status: updateDTO?.status,
      duration: updateDTO?.duration,
    };
    const url = `calls/${callId}`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(finalData),
    };
    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Update api called End',
      data: {
        url: url,
        method: 'PATCH',
        body: JSON.stringify(finalData),
        // response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static getCall = async (token: string, callId: string | number): Promise<CallData> => {
    const url = `calls/${callId}`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Get call api called',
      data: {
        url: url,
        method: 'GET',
        // response: JSON.stringify(apiResponse),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };

  static prolongationCall = async (token: string, callId: number, duration: number): Promise<CallData> => {
    const url = `calls/${callId}/add-time`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ duration }),
    };

    const apiResponse = RequestHelper.fetch(url, options);

    const obj = {
      title: 'Prolongation call api called add Time',
      data: {
        url: url,
        method: 'POST',
        body: JSON.stringify({ duration }),
        options: JSON.stringify(options),
      },
    };
    getSendSlack(obj);

    return apiResponse;
  };
}
