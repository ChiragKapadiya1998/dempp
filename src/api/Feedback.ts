import axios from 'axios';
import { FeedbackDTO } from '../ducks/feedback/types';
import { GET, POST } from '../utils/constants';
import { getSendSlack } from '../utils/hooks';
import RequestHelper from '../utils/RequestHelper';

export default class FeedbackApi {
  /** Create call feedback */
  static createCallFeedback = async (
    token: string,
    {
      callId,
      rating,
      feedback,
      isQueryClosed,
    }: {
      callId: string;
      rating: number;
      feedback: string;
      isQueryClosed: boolean;
    },
  ): Promise<void> => {
    const url = `calls/${callId}/feedback`;
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, feedback, isQueryClosed }),
    };

    const obj = {
      title: ' create Call Feedback ',
      data: {
        method: url,
        rating: rating,
        feedback: feedback,
        isQueryClosed: isQueryClosed,

        // response: JSON.stringify(callData),
      },
    };
    getSendSlack(obj);

    return RequestHelper.fetch(url, options);
  };

  static appFeedback = async (token: string, dto: FeedbackDTO) => {
    const url = 'feedback';
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    };
    return RequestHelper.fetch(url, options);
  };

  static helpList = async () => {
    const url = 'https://parl-stg-public.s3.eu-west-1.amazonaws.com/faq.json';
    return axios(url, {
      method: GET,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };
}
