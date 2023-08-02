import { select, takeLatest, call, put } from 'redux-saga/effects';

import HistoryApi from '../api/History';
import { actions } from '../ducks/history';
import { HistoryRequestAction } from '../ducks/history/types';
import { actions as modalsActions } from '../ducks/modals';
import { StoreState } from '../store';
import { Await } from '../utils/types';

function* historyQueries() {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);

    if (!accessToken) {
      throw new Error('No auth');
    }
    const response: Await<ReturnType<typeof HistoryApi.getHistoryqueries>> = yield call<typeof HistoryApi.getHistoryqueries>(
      HistoryApi.getHistoryqueries,
      accessToken,
    );
    const finalData = response?.data.map((item) => {
      return {
        ...item,
        tabValue: 1,
      };
    });

    yield put(actions.historyQueriesSuccess(finalData));
    // yield put(modalsActions.toggleInvite({ title: 'Invitation success', message: 'The invitation was successfully sent.' }));
    // yield Keyboard.dismiss();
  } catch (err: any) {
    yield put(actions.historyQueriesFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}
function* historyRecevied() {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);

    if (!accessToken) {
      throw new Error('No auth');
    }
    const response: Await<ReturnType<typeof HistoryApi.getHistoryReceived>> = yield call<typeof HistoryApi.getHistoryReceived>(
      HistoryApi.getHistoryReceived,
      accessToken,
    );
    const finalData = response?.data.map((item) => {
      return {
        ...item,
        tabValue: 2,
      };
    });
    yield put(actions.historyReceviedSuccess(finalData));
    // yield put(modalsActions.toggleInvite({ title: 'Invitation success', message: 'The invitation was successfully sent.' }));
    // yield Keyboard.dismiss();
  } catch (err: any) {
    yield put(actions.historyReceviedFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historyQueriesInfo({ payload }: HistoryRequestAction) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);
    if (!accessToken) {
      throw new Error('No auth');
    }
    if (payload?.index == 1) {
      const response: Await<ReturnType<typeof HistoryApi.getHistoryqueriesInfo>> = yield call<typeof HistoryApi.getHistoryqueriesInfo>(
        HistoryApi.getHistoryqueriesInfo,
        accessToken,
        payload?.id,
      );

      yield put(actions.historyQueriesInfoSuccess(response));
    } else {
      const response: Await<ReturnType<typeof HistoryApi.getHistoryReceivedInfo>> = yield call<typeof HistoryApi.getHistoryReceivedInfo>(
        HistoryApi.getHistoryReceivedInfo,
        accessToken,
        payload?.id,
      );
      yield put(actions.historyQueriesInfoSuccess(response));
    }

    // yield put(modalsActions.toggleInvite({ title: 'Invitation success', message: 'The invitation was successfully sent.' }));
    // yield Keyboard.dismiss();
  } catch (err: any) {
    yield put(actions.historyQueriesInfoFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historyQueriesClose({ payload }: HistoryRequestAction) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);
    const { myQueries }: StoreState['history'] = yield select((state: StoreState) => state.history);

    if (!accessToken) {
      throw new Error('No auth');
    }

    const response: Await<ReturnType<typeof HistoryApi.getHistoryQueriesClose>> =
      payload?.status == 'closed'
        ? yield call<typeof HistoryApi.getHistoryQueriesClose>(HistoryApi.getHistoryQueriesClose, accessToken, payload?.id)
        : yield call<typeof HistoryApi.getHistoryQueriesDecline>(HistoryApi.getHistoryQueriesDecline, accessToken, payload?.id);

    const finaldata = myQueries?.map((element: any) => {
      if (element.tabValue == 1) {
        if (element?.id === payload?.id) {
          return { ...element, status: payload?.status };
        } else {
          return element;
        }
      }
      if (payload?.status == 'closed') {
        if (element.tabValue == 2) {
          if (element.query.id == payload?.id) {
            return {
              ...element,
              finalStatus: payload?.status,
            };
          } else {
            return {
              ...element,
            };
          }
        }
      } else {
        if (element.tabValue == 2) {
          if (element.id == payload?.id) {
            return {
              ...element,
              finalStatus: payload?.status,
            };
          } else {
            return {
              ...element,
            };
          }
        }
      }
    });

    yield put(actions.toggleQueriesHistory(finaldata));

    yield put(actions.toggleModalHistory(false));
    yield put(actions.historyQueriesCloseSuccess());
  } catch (err: any) {
    console.log('errrr', err);

    yield put(actions.historyQueriesCloseFailure(err.message));
    yield put(actions.historyQueriesFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historyQueriesRecall({ payload }: HistoryRequestAction) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);

    if (!accessToken) {
      throw new Error('No auth');
    }

    const response: Await<ReturnType<typeof HistoryApi.getHistoryqueriesRecall>> = yield call<typeof HistoryApi.getHistoryqueriesRecall>(
      HistoryApi.getHistoryqueriesRecall,
      accessToken,
      payload,
    );
    console.log('responseresponseresponse', response);

    yield put(actions.historyQueriesRecallSuccess());
    // yield put(modalsActions.toggleInvite({ title: 'Invitation success', message: 'The invitation was successfully sent.' }));
    // yield Keyboard.dismiss();
  } catch (err: any) {
    yield put(actions.historyQueriesRecallFailure(err.message));
    yield put(actions.historyQueriesFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historyAnswerClosed({ payload }: HistoryRequestAction) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);
    const { queriesInfo }: StoreState['history'] = yield select((state: StoreState) => state.history);

    if (!accessToken) {
      throw new Error('No auth');
    }

    const response: Await<ReturnType<typeof HistoryApi.getHistoryAnswerClosed>> = yield call<typeof HistoryApi.getHistoryAnswerClosed>(
      HistoryApi.getHistoryAnswerClosed,
      accessToken,
      payload,
    );

    const finalData = { ...queriesInfo, isAnswerClosedQuery: payload?.status, isAnswered: true };
    yield put(actions.historyAnswerClosedQuerySuccess(finalData));
  } catch (err: any) {
    yield put(actions.historyAnswerClosedQueryFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historyBothQueriesInfo({ payload }: HistoryRequestAction) {
  try {
    const { accessToken }: StoreState['token'] = yield select((state) => state.token);
    if (!accessToken) {
      throw new Error('No auth');
    }
    if (payload?.myQueryTab) {
      const response: Await<ReturnType<typeof HistoryApi.getHistoryqueriesInfo>> = yield call<typeof HistoryApi.getHistoryqueriesInfo>(
        HistoryApi.getHistoryqueriesInfo,
        accessToken,
        payload?.id,
      );

      yield put(actions.historyBothInfoModalSuccess(response));
    } else {
      const response: Await<ReturnType<typeof HistoryApi.getHistoryReceivedInfo>> = yield call<typeof HistoryApi.getHistoryReceivedInfo>(
        HistoryApi.getHistoryReceivedInfo,
        accessToken,
        payload?.id,
      );
      yield put(actions.historyBothInfoModalSuccess(response));
    }
  } catch (err: any) {
    yield put(actions.historyBothInfoModalFailure(err.message));
    yield put(modalsActions.toggleInvite({ title: '', message: err.message }));
  }
}

function* historySaga() {
  yield takeLatest(actions.historyQueriesRequest, historyQueries);
  yield takeLatest(actions.historyReceviedRequest, historyRecevied);
  yield takeLatest(actions.historyQueriesInfoRequest, historyQueriesInfo);
  yield takeLatest(actions.historyQueriesCloseRequest, historyQueriesClose);
  yield takeLatest(actions.historyQueriesRecallRequest, historyQueriesRecall);
  yield takeLatest(actions.historyAnswerClosedQueryRequest, historyAnswerClosed);
  yield takeLatest(actions.historyBothInfoModalRequest, historyBothQueriesInfo);
}

export default historySaga;
