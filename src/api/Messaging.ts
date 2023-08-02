import RequestHelper from '../utils/RequestHelper';
import { User } from '../ducks/user/types';
import { Query } from '../ducks/candidates/types';

export type ActiveMatches = {
  id: number;
  proposedUserId: number;
  queryId: number;
  status: string;
  sdp: string;
  query: Query & { user: User };
}[];

export default class MessagingApi {
  static getMatches = async (token: string): Promise<ActiveMatches> => {
    console.log("---------token")
    console.log(token)
    const url = 'users/me/active-matches';
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static patchNotification = async (token: string, matchId: number): Promise<ActiveMatches> => {
    const url = `matches/${matchId}/notification`;
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isDelivered: true,
      }),
    };
    return RequestHelper.fetch(url, options);
  };
}
