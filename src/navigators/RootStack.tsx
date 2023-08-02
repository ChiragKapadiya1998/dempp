import 'react-native-gesture-handler';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SetUpProfileStack from './SetUpProfileStack';
import NavigationHelper from '../utils/NavigationHelper';
import { AppTheme } from './AppTheme';
import { Colors } from '../styles';
import { Pages } from './Routes';
import { RootStackParamList } from './types';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { selectors as tokenSelectors } from '../ducks/token';
import PushAlert from '../components/common/PushAlert';
import CallStack from './CallStack';
import RNBootSplash from 'react-native-bootsplash';
import { actions } from '../ducks/initiation';
import InternetConnection from '../components/common/InternetConnection';
import { fontFamily } from '../utils/functions';
import moment from 'moment';
import remoteConfig from '@react-native-firebase/remote-config';
import { actions as userActions } from '../ducks/user';

const AuthStack = lazy(() => import('./AuthStack'));
const MainStack = lazy(() => import('./MainStack'));
const OnboardingScreen = lazy(() => import('../screens/onboarding/OnboardingScreen'));

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const dispatch = useAppDispatch();
  const isUnavailableToTesting = remoteConfig().getValue('isUnavailableToTesting').asBoolean();
  const isAuth = useAppSelector(tokenSelectors.getAccessToken);
  const isProfileFilled = useAppSelector(tokenSelectors.getIsProfileFilled);
  const { isFirstStart, isRemoteConfigEnabled } = useAppSelector((state) => state.initial);
  const { data } = useAppSelector((state) => state.user);

  let initialRoute: Pages;
  useEffect(() => {
    dispatch(actions.remoteConfigInitRequest());
    // isAuth && dispatch(userActions.getUserSessionStausRequest());
  }, []);
  // console.log('isRemoteConfigEnabled', isRemoteConfigEnabled);

  // if (!isRemoteConfigEnabled) return null;

  if (isFirstStart) initialRoute = Pages.OnboardingScreen;
  else if (!isAuth) initialRoute = Pages.AuthStack;
  else if (isAuth && !isProfileFilled) initialRoute = Pages.SetUpProfileStack;
  else initialRoute = Pages.MainStack;

  const onReady = () => {
    NavigationHelper.isReady = true;
    RNBootSplash.hide({ fade: true });
  };

  return (
    <Suspense fallback={null}>
      <SafeAreaProvider>
        <NavigationContainer ref={NavigationHelper.navigationRef} theme={AppTheme} onReady={onReady}>
          <Stack.Navigator
            mode="card"
            initialRouteName={initialRoute}
            screenOptions={{
              cardStyle: { backgroundColor: Colors.white },
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen name={Pages.AuthStack} component={AuthStack} options={{ headerShown: false }} />
            {isAuth && (
              <>
                <Stack.Screen name={Pages.MainStack} component={MainStack} options={{ headerShown: false }} />
                <Stack.Screen name={Pages.CallStack} component={CallStack} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name={Pages.SetUpProfileStack} component={SetUpProfileStack} options={{ headerShown: false, gestureEnabled: false }} />
              </>
            )}
            {isFirstStart && <Stack.Screen name={Pages.OnboardingScreen} component={OnboardingScreen} options={{ headerShown: false }} />}
          </Stack.Navigator>
          <PushAlert />
          <InternetConnection />
        </NavigationContainer>
        {isUnavailableToTesting ? (
          <Text
            style={{
              position: 'absolute',
              fontFamily: fontFamily.rf_regular,
              top: 40,
              left: 100,
              backgroundColor: Colors.accent14,
              color: 'white',
            }}
          >
            {moment(data?.unavailableTo).format('YYYY-MM-DD hh:mm:ss A')}
          </Text>
        ) : null}
      </SafeAreaProvider>
    </Suspense>
  );
};

export default RootStack;
