import React, { useEffect, useState, useRef } from 'react';
import { Alert, AppState, AppStateStatus, Linking, LogBox, NativeModules, Platform, Text, TextInput } from 'react-native';
import { init, setBarsStyle } from 'react-native-transparent-status-and-navigation-bar';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import RNIM from 'react-native-incall-manager';
import NetInfo, { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { parse } from 'search-params';
import * as Sentry from '@sentry/react-native';
import RootNavigator from './navigators/RootStack';
import warningList from './utils/warningList';
import { store, persistor } from './store';
import { actions } from './ducks/invite';
import { actions as netinfoActions } from './ducks/netinfo';
import { InviteData } from './ducks/invite/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CALL_END, CALL_END_NAVIGATION, END_CALL_HISTORY } from './utils/constants';
import { getSendSlack} from './utils/hooks';

// console.ignoredYellowBox = true;
// console.disableYellowBox = true;

// LogBox.ignoreLogs(warningList);

init();

if (Platform.OS === 'ios') {
  NativeModules.InCallManager.addListener('Proximity');
}

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loadUi, setLoadUi] = useState(false);
  const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
    const fnObj = {
      title: 'link',
      data: {
        device: Platform.OS,
        data: JSON.stringify(link),
      },
    };
    getSendSlack(fnObj);

    if (!link) return;
    // if (__DEV__) {
    //   Alert.alert('deep', JSON.stringify(link));
    // }
    const { type, id }: InviteData = parse(link.url);
    console.log('type, id', type, id);

    if (!type || !id) return;

    store.dispatch(actions.updateInviteData({ type, id }));
  };

  useEffect(() => {
    AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active' && appStateVisible) {
        checkNetwork();
      }
      if (nextAppState === 'inactive') {
        RNIM.stop();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
  }, [appStateVisible]);

  const onConnectionStatusChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
    store.dispatch(netinfoActions.updateNetinfoStatus(state.isConnected));
  };

  useEffect(() => {
    const sentryInit = () => {
      Sentry.init({
        dsn: 'https://267f1097cfc04ef5992eb441a3620d3c@o4503998236852224.ingest.sentry.io/4503998252646400',
        enableInExpoDevelopment: true,
        tracesSampleRate: 1.0,
        environment: __DEV__ ? 'dev' : 'prod',
        debug: __DEV__,
      });
      console.log('ssse');
    };
    sentryInit();
  }, []);

  useEffect(() => {
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps.allowFontScaling = false;
    const onCallEnd = async () => {
      await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
      await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(false));
      await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
      setLoadUi(true);
    };
    onCallEnd();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(onConnectionStatusChange);

    return () => {
      unsubscribe();
    };
  }, [setIsConnected]);

  const checkNetwork = async () => {
    const netInfo = await NetInfo.fetch();
    setIsConnected(netInfo.isConnected);
    store.dispatch(netinfoActions.updateNetinfoStatus(netInfo.isConnected));
  };

  useEffect(() => {
    setBarsStyle(true, 'dark-content');
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    // ! Custom solution dynamicLinks().getInitialLink didnt work for ios.
    // ! But we can get initialUrl from Linking.getInitialURL and call via Linking.openURL then dynamicLinks().onLink can catch our link
    // ! will't work with enabled debuger (Test via Alert)
    dynamicLinks().getInitialLink().then(handleDynamicLink);
    // if (Platform.OS === 'ios') {
    //   Linking.getInitialURL().then((res) => {
    //     if (res) return Linking.openURL(res);
    //   });
    // } else {
    //   dynamicLinks().getInitialLink().then(handleDynamicLink); // Read link from BG
    // }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider {...{ store }}>
      <PersistGate loading={null} {...{ persistor }}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
