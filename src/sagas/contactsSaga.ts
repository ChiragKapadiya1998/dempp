import { select, takeLatest, call, put } from 'redux-saga/effects';
import { contactsActions } from '../ducks/contacts';
import { StoreState } from '../store';
import Contacts, { Contact } from 'react-native-contacts';
import { CountryCode, E164Number, parsePhoneNumber } from 'libphonenumber-js';
// @ts-ignore
import CarrierInfo from 'react-native-carrier-info';
import { ParlaContact } from '../ducks/contacts/types';
import ContactsApi from '../api/Contacts';
import { request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const e164Number = (number: string, country: CountryCode) => {
  try {
    const phone = parsePhoneNumber(number, country);
    if (phone.isValid()) {
      return phone.number;
    }
    return;
  } catch (err) {
    return;
  }
};

const notUndefined = <T>(value: T | undefined | null): value is T => {
  return value !== null && value !== undefined;
};

function* getContactsWorker() {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);

    if (!accessToken) {
      throw new Error('No auth');
    }
    if (Platform.OS === 'ios') {
      const permission: 'undefined' | 'authorized' | 'denied' = yield Contacts.requestPermission();
      if (permission == 'denied') throw new Error('Denied');
    }
    if (Platform.OS === 'android') {
      const permission: PermissionStatus = yield request(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (permission === 'denied' || permission === 'blocked') throw new Error('Denied');
      // return;
    }

    const contacts: Contact[] = yield Contacts.getAll();

    const country: CountryCode = yield CarrierInfo.isoCountryCode()
      .then((res: string) => res.toUpperCase())
      .catch(() => {});

    const onlyNumbers: E164Number[] = contacts
      ?.filter((item) => !!item.phoneNumbers.length)
      .map((item) => {
        return item.phoneNumbers
          .filter((phone) => phone.number.charAt(0) !== '*')
          .map((phone) => e164Number(phone.number, country))
          .filter(notUndefined);
      })
      .flat();

    const validNumbers: E164Number[] = yield call(ContactsApi.getRegisteredUsers, accessToken, onlyNumbers);

    const parlaContacts: ParlaContact[] = contacts
      .map((contact) => {
        const parsePhoneNumbers = contact.phoneNumbers.map((phone) => {
          try {
            const parsed = parsePhoneNumber(phone.number, country);
            if (parsed.isValid()) {
              return {
                label: phone.label,
                number: parsed.number,
                inParla: !!validNumbers.find((p) => p === parsed.number),
                isSelect: false,
              };
            } else {
              return;
            }
          } catch (err) {
            return;
          }
        });

        const output = [...new Map(parsePhoneNumbers.map((o) => [o?.number, o])).values()];
        return {
          ...contact,
          phoneNumbers: output.filter(notUndefined),
        };
      })
      .filter((contact) => !!contact.phoneNumbers.length && contact.givenName !== '');

    yield put(contactsActions.getContactsSuccess(parlaContacts));
  } catch (err: any) {
    yield put(contactsActions.getContactsFailure(err.message));
    yield Alert.alert('Cannot get contacts', `Permission error: ${err.message}`);
  }
}

function* contactsSaga() {
  yield takeLatest(contactsActions.getContactsRequest, getContactsWorker);
}

export default contactsSaga;
