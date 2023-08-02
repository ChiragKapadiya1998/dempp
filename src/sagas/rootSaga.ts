import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import passionsSaga from './passionsSaga';
import userSaga from './userSaga';
import inviteSaga from './inviteSaga';
import feedbackSaga from './feedbackSaga';
import messagingSaga from './messagingSaga';
import candidatesWatcher from './candidatesSaga';
import callsSaga from './callsSaga';
import initialSaga from './initialSaga';
import phoneSaga from './phoneSaga';
import contactsSaga from './contactsSaga';
import historySaga from './historySaga';

function* rootSaga() {
  yield all([
    initialSaga(),
    authSaga(),
    userSaga(),
    passionsSaga(),
    inviteSaga(),
    feedbackSaga(),
    messagingSaga(),
    candidatesWatcher(),
    callsSaga(),
    phoneSaga(),
    contactsSaga(),
    historySaga(),
  ]);
}

export default rootSaga;
