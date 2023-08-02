import RequestHelper from '../utils/RequestHelper';
import { E164Number } from 'libphonenumber-js';

export default class ContactsApi {
  static getRegisteredUsers = async (token: string, numbers: E164Number[]): Promise<E164Number[]> => {
    const url = `users/check-existing`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phones: numbers }),
    };

    return RequestHelper.fetch(url, options);
  };
}
