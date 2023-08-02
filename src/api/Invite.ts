import { actions } from '../ducks/invite';
import RequestHelper from '../utils/RequestHelper';

export default class InviteApi {
  static postInviteUser = async (
    token: string,
    payload: ReturnType<typeof actions.inviteUserRequest>['payload'],
  ): Promise<void> => {
    const url = 'invites';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };

    return RequestHelper.fetch(url, options);
  };
}
