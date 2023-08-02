import { Passion } from '../ducks/passions/types';
import RequestHelper from '../utils/RequestHelper';

export default class PassionApi {
  static getRecomendedPassions = async (token: string, query: string): Promise<Passion[]> => {
    const url = `passions/recommended?query=${query}&pageSize=15`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static getPassionCategories = async (token: string) => {
    const url = 'passion-categories';
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };
}
