import { takeLatest, put } from '@redux-saga/core/effects';
import { actions } from '../ducks/initiation';
import { Pages } from '../navigators/Routes';
import { RootStackParamList } from '../navigators/types';
import NavigationHelper from '../utils/NavigationHelper';
import { defaultLocalConfig } from '../utils/localConfig';
import remoteConfig from '@react-native-firebase/remote-config';

function* initialSaga() {
  yield takeLatest(actions.remoteConfigInitRequest, remoteConfigInit);
  yield takeLatest(actions.firstStartSuccess, inititalWorker);
}

function* inititalWorker() {
  yield NavigationHelper.navigate<RootStackParamList, Pages.AuthStack>(Pages.AuthStack, { screen: Pages.SignUpPhoneScreen });
}

function* remoteConfigInit() {
  try {
    yield remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
    });

    yield remoteConfig().setDefaults(defaultLocalConfig);

    const fetchedRemotely: boolean = yield remoteConfig().fetchAndActivate();
    if (fetchedRemotely) {
      yield put(actions.remoteConfigInitSuccess({ type: 'remote', message: 'Configs were retrieved from the backend and activated.' }));
    } else {
      yield put(
        actions.remoteConfigInitSuccess({
          type: 'local',
          message: 'No configs were fetched from the backend, and the local configs were already activated',
        }),
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(actions.remoteConfigInitFailure(err.message));
    } else {
      yield put(actions.remoteConfigInitFailure(JSON.stringify(err)));
    }
    console.error('Remote config init: ', err);
  }
}

export default initialSaga;
