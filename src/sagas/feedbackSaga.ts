import { call, put, takeLatest, delay, select } from 'redux-saga/effects';

import FeedbackApi from '../api/Feedback';
import { actions as feedbackActions } from '../ducks/feedback';
import { handleRequestErrorSaga } from './errorSaga';
import { getState, StoreState } from '../store';
import { CreateCallFeedbackRequestAction, ParlaHelp } from '../ducks/feedback/types';
import NavigationHelper from '../utils/NavigationHelper';
import { Pages } from '../navigators/Routes';
import { RootStackParamList } from '../navigators/types';
import showAlert from '../utils/showAlert';
import { Alert } from 'react-native';

/** Create call feedback */
function* createCallFeedbackSaga({ payload: { callId, feedback, rating, isQueryClosed }, type }: CreateCallFeedbackRequestAction) {
  const token = getState().token.accessToken;

  try {
    if (!token) return new Error('Not authorized');

    yield call<typeof FeedbackApi.createCallFeedback>(FeedbackApi.createCallFeedback, token, {
      callId,
      rating,
      feedback,
      isQueryClosed,
    });

    yield put(feedbackActions.createCallFeedbackSuccess());
    yield NavigationHelper.navigate(Pages.FeedbackSant);
    // NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack);
    // yield delay(1000);
    // showAlert('Call feedback', 'Feedback has been created');
    yield handleRequestErrorSaga({ actionType: '' });
  } catch (error: any) {
    yield put(feedbackActions.createCallFeedbackFailure());
    yield handleRequestErrorSaga({ actionType: type, ...error });
  }
}

function* applicationFeedbackWorker({ payload }: ReturnType<typeof feedbackActions.applicationFeedbackRequest>) {
  const { accessToken } = yield select((state: StoreState) => state.token);
  try {
    if (!accessToken) throw new Error('No auth');
    console.log('payload', payload);

    yield call<typeof FeedbackApi.appFeedback>(FeedbackApi.appFeedback, accessToken, payload);

    yield put(feedbackActions.applicationFeedbackSuccess());
    yield handleRequestErrorSaga({ actionType: '' });
  } catch (err: any) {
    // Alert.alert(`${err.message}`);
    yield put(feedbackActions.applicationFeedbackFailure(err.message));
  }
}

//help
function* helplistDataWorker() {
  const { accessToken } = yield select((state: StoreState) => state.token);
  try {
    if (!accessToken) throw new Error('No auth');

    const helpData: ParlaHelp = yield call<typeof FeedbackApi.helpList>(FeedbackApi.helpList);
    yield put(feedbackActions.createCallHelpSuccess(helpData));
  } catch (err: any) {
    yield put(feedbackActions.createCallHelpFailure());
  }
}

export default function* () {
  yield takeLatest(feedbackActions.createCallFeedbackRequest.type, createCallFeedbackSaga);
  yield takeLatest(feedbackActions.applicationFeedbackRequest, applicationFeedbackWorker);
  yield takeLatest(feedbackActions.createCallHelpRequest, helplistDataWorker);
}
