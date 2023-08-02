import { CountryCode, E164Number } from 'libphonenumber-js';
import RequestHelper from '../utils/RequestHelper';

export default class PhoneApi {
  static updatePhone = async (token: string, phone: E164Number): Promise<{ phone: E164Number }> => {
    const url = 'users/me/update-phone/send-code';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phone }),
    };

    return RequestHelper.fetch(url, options);
  };

  static confirmPhone = async (token: string, payload: { phone: E164Number; code: string; country: CountryCode }): Promise<void> => {
    const url = 'users/me/update-phone';
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };

    return RequestHelper.fetch(url, options);
  };
}
