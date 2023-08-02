import { POST, PATCH } from '../utils/constants';
import RequestHelper from '../utils/RequestHelper';
import { tz } from 'moment';
import 'moment-timezone';

import { PutAvailabilitySettingPayload, UpdateUserPayload, UpdateUserPayloadDemo, User } from '../ducks/user/types';
import { Passion } from '../ducks/passions/types';
import { MatchResponse } from '../ducks/candidates/types';
import axios from 'axios';
import Config from 'react-native-config';

export default class UserApi {
  static getUser = async (token: string): Promise<User> => {
    const url = 'users/me';
    const options: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static getUserQueries = async (token: string): Promise<User> => {
    const url = 'queries';
    const options: RequestInit = {
      method: 'GET',
      headers: {
        method: 'PATCH',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  static updateUser = async (token: string, dto: UpdateUserPayload) => {
    const form = new FormData();

    if (dto?.avatar) {
      const uri = dto.avatar;
      const imagePath = uri.split('/');
      const name = imagePath[imagePath.length - 1];
      const type = 'image/jpeg';

      form.append('avatar', {
        uri,
        name,
        type,
      });
      delete dto.avatar;
    } else if (dto?.taglineAudio) {
      const uri = dto.taglineAudio;
      const name = 'sound.mp3';
      const type = 'audio/mp3';

      form.append('taglineAudio', {
        uri,
        name,
        type,
      });

      delete dto.taglineAudio;
    } else if (dto?.taglineAudioDuration) {
      form.append('taglineAudioDuration', dto?.taglineAudioDuration);
      delete dto.taglineAudioDuration;
    } else if (dto?.passions) {
      dto?.passions.forEach((passion, index) => {
        form.append(`passions[${index}][name]`, passion.name);
        if (passion.id) {
          form.append(`passions[${index}][id]`, passion.id);
        }
        if (passion.categoryId) {
          form.append(`passions[${index}][categoryId]`, passion.categoryId);
        }
      });
      delete dto.passions;
    }

    Object.keys(dto).forEach((key) => form.append(key, dto[key as keyof UpdateUserPayload]));

    const url = 'users/me';
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    };

    return RequestHelper.fetch(url, options);
  };
  static updateStatusUser = async (token: string, payload: UpdateUserPayloadDemo) => {
    const url = `${Config.BASE_URL}/users/me`;
    return axios(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log(err))
      .finally(() => {});

    // return RequestHelper.fetch(url, options);
  };

  static putAvailabilitySetting = async (token: string, dto: PutAvailabilitySettingPayload) => {
    const url = 'users/me/availability-settings';
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Check username unicity */
  static checkUsernameUnicity = async (token: string, username: string): Promise<void> => {
    const url = 'users/check-uniqueness';
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Set up user profile */
  static setUpUserProfile = async (
    token: string,
    {
      // username,
      name,
      tagline,
      taglineAudio,
      avatar,
      passions,
      taglineAudioDuration,
      isProfileFilled,
      isOnBoardingFinished,
    }: {
      // username: string;
      name: string;
      tagline: string;
      taglineAudio: string;
      avatar: string;
      passions: Passion[];
      taglineAudioDuration: number;
      isProfileFilled: boolean;
      isOnBoardingFinished: boolean;
    },
  ): Promise<any> => {
    const url = `${Config.BASE_URL}/users/me`;
    const form = new FormData();

    // form.append('username', username);
    form.append('name', name);
    form.append('tagline', tagline);
    form.append('isProfileFilled', isProfileFilled);
    form.append('isOnBoardingFinished', isOnBoardingFinished);
    if (avatar) {
      // image
      const imagePathSplitted = avatar.split('/');
      const imageName = imagePathSplitted[imagePathSplitted.length - 1];
      form.append('avatar', {
        uri: avatar,
        name: imageName,
        type: 'image/jpeg',
      });
    }

    // audio
    const audioPathSplitted = taglineAudio.split('/');
    const audioName = audioPathSplitted[audioPathSplitted.length - 1];
    form.append('taglineAudio', {
      uri: taglineAudio || undefined,
      name: audioName || undefined,
      type: 'audio/mp3',
    });

    form.append('taglineAudioDuration', taglineAudioDuration);

    // passions
    passions.forEach((passion, index) => {
      form.append(`passions[${index}][name]`, passion.name);
      if ('id' in passion) {
        form.append(`passions[${index}][id]`, passion.id);
      }
      if (passion.categoryId) {
        form.append(`passions[${index}][categoryId]`, passion.categoryId);
      }
    });

    form.append('timezone', tz.guess(true));
console.log('token-------------------')
    console.log(token)
    return axios(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: form,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log(err))
      .finally(() => {});

    // const options: RequestInit = {
    //   method: PATCH,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: form,
    // };

    // console.log('optionsoptions', options);

    // return RequestHelper.fetch(url, options);
  };

  /** Get code to delete user */
  static getCodeToDeleteUser = async (token: string): Promise<void> => {
    const url = 'users/me/delete/send-code';
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return RequestHelper.fetch(url, options);
  };

  /** Check code to delete user */
  static checkCodeToDeleteUser = async (token: string, code: string): Promise<void> => {
    const url = 'users/me/delete/check-code';
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    };

    return RequestHelper.fetch(url, options);
  };

  /** Delete user */
  static deleteUser = async (token: string, code: string): Promise<void> => {
    const url = 'users/me/delete';
    const options: RequestInit = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    };

    return RequestHelper.fetch(url, options);
  };

  static getAllActiveMatches = async (token: string): Promise<MatchResponse> => {
    const url = `users/me/active-matches`;
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

// UserApi.updateUser(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJuYW1lIjoiQWxleCIsImlhdCI6MTYzMDUyMDA1NSwiZXhwIjoxNjYyMDU2MDU1fQ.A0T2hi5jaIiUB1Ci9r1q3o0yI6CuugiK8YCw_AyxCcQ',
//   {
//     taglineAudio:
//       'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
//   },
// ).catch(console.error);

// fetch(
//   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
// ).then(console.log);
