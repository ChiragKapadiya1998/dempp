import { put } from 'redux-saga/effects';
import { actions as errorAction } from '../ducks/errors';

// Handle request error
export function* handleRequestErrorSaga({
  actionType,
  message,
  status,
}: {
  status?: number;
  message?: string;
  actionType: string;
}) {
  switch (status) {
    case 400: {
      yield put(
        errorAction.push({
          actionType,
          message,
        }),
      );
      break;
    }
    default: {
      yield put(
        errorAction.push({
          actionType,
          message,
        }),
      );
    }
  }
}
