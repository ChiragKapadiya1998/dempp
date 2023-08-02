import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import createSagaMiddleware from 'redux-saga';

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import rootSaga from './sagas/rootSaga';
import {
  ENABLED,
  ERRORS,
  AUTH,
  TOKEN,
  USER,
  PASSIONS,
  INITIAL,
  INVITE,
  DISTURB,
  FCM,
  MODALS,
  FEEDBACK,
  CANDIDATES,
  CALLS,
  PUSH,
  PHONE,
  CONTACTS,
  NETINFO,
  HISTORY,
} from './utils/constants';

import { reducer as authReducer } from './ducks/auth';
import { reducer as errorsReducer } from './ducks/errors';
import { reducer as tokenReducer } from './ducks/token';
import { reducer as userReducer } from './ducks/user';
import { reducer as passionsReducer } from './ducks/passions';
import { reducer as initiationReducer } from './ducks/initiation';
import { reducer as inviteReducer } from './ducks/invite';
import { reducer as netinfoReducer } from './ducks/netinfo';
import { reducer as disturbReducer } from './ducks/disturb';
import { reducer as messagingReducer } from './ducks/messaging';
import { reducer as modalsReducer } from './ducks/modals';
import { reducer as feedbackReducer } from './ducks/feedback';
import { reducer as candidatesReducer } from './ducks/candidates';
import { reducer as callsReducer } from './ducks/calls';
import { reducer as pushReducer } from './ducks/push';
import { reducer as phoneReducer } from './ducks/phone';
import { reducer as contactsReducer } from './ducks/contacts';
import { reducer as hisotryReducer } from './ducks/history';

const persistConfigs = {
  [TOKEN]: { key: TOKEN, storage: AsyncStorage },
  [INITIAL]: { key: INITIAL, storage: AsyncStorage },
};

const persistedTokenReducer = persistReducer(persistConfigs[TOKEN], tokenReducer);
const persistedInitialReducer = persistReducer(persistConfigs[INITIAL], initiationReducer);

const rootReducer = combineReducers({
  [TOKEN]: persistedTokenReducer,
  [INITIAL]: persistedInitialReducer,

  [DISTURB]: disturbReducer,
  [AUTH]: authReducer,
  [ERRORS]: errorsReducer,
  [USER]: userReducer,
  [PASSIONS]: passionsReducer,
  [INVITE]: inviteReducer,
  [NETINFO]: netinfoReducer,
  [FCM]: messagingReducer,
  [MODALS]: modalsReducer,
  [FEEDBACK]: feedbackReducer,
  [CANDIDATES]: candidatesReducer,
  [CALLS]: callsReducer,
  [PUSH]: pushReducer,
  [PHONE]: phoneReducer,
  [CONTACTS]: contactsReducer,
  [HISTORY]: hisotryReducer,
});

const reducer = rootReducer;
const sagaMiddleware = createSagaMiddleware();
const devTools = __DEV__;

const defaultMiddlewareConfig = {
  thunk: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const useFlipper = true;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware(defaultMiddlewareConfig).concat(sagaMiddleware);

    if (useFlipper) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
  devTools,
});

export const { dispatch, getState } = store;
export const persistor = persistStore(store);
export type StoreState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
