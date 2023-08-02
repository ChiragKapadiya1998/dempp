import Config from 'react-native-config';
import { REQUEST_TIMEOUT, SIGNAL, ENABLED } from './constants';
import { getSendSlack } from './hooks';
import { strings } from './string';

/** Make and handle a request */
export default class RequestHelper {
  static fetch = async (url: string, options: RequestInit): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT * 8);

    options[SIGNAL] = controller.signal;

    try {
      const response = await fetch(`${Config.BASE_URL}/${url}`, options);
      clearTimeout(timeoutId);
      // if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('=== Next request ===', Config.BASE_URL);
      // eslint-disable-next-line no-console
      console.log(`> ${options.method} ${url}`);
      // eslint-disable-next-line no-console
      console.log(`< Response ${response.status}`);
      // }

      switch (response.status) {
        case 204: {
          return {};
        }
        case 400:
        case 401:
        case 403:
        case 404: {
          const error = await response.json();
          return Promise.reject({
            status: response.status,
            message: Array.isArray(error.message) ? error.message[0] : error.message,
          });
        }
        case 502:
        case 500: {
          return Promise.reject({
            status: response.status,
            message: 'Internal server error',
          });
        }
        case 503: {
          return Promise.reject({
            status: response.status,
            message: 'The server is being updated',
          });
        }
        default: {
          // Success
          const finaldata = await response.json();
          const slackObjReq = {
            title: strings.api_respose,
            data: {
              API_RESPOSE: JSON.stringify(finaldata),
            },
          };
          // getSendSlack(slackObjReq);
          return finaldata;
        }
      }
    } catch (error: any) {
      return Promise.reject({
        message: error?.message ?? 'Oops, something went wrong...',
      });
    }
  };
}
