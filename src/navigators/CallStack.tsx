import React, { useEffect } from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';

import CurrentCallScreen from '../screens/call/CurrentCallScreen';
import IncomingCallScreen from '../screens/call/IncomingCallScreen';
import CallFeedbackScreen from '../screens/call/CallFeedbackScreen';
import MatchingScreen from '../screens/call/MatchingScreen';
import ReportScreen from '../screens/call/ReportScreen';
import InviteToRoomScreen from '../screens/call/InviteToRoomScreen';
import ReportSent from '../screens/call/ReportSent';

import options from './options';
import { CallPages } from './Routes';
import { CallStackParamsList } from './types';
import { useAppDispatch } from '../utils/hooks';
import { actions as callsActions } from '../ducks/calls';
import { actions as pushActions } from '../ducks/push';
import ConnectionRoomScreen from '../screens/call/ConnectionRoomScreen';

const Stack = createStackNavigator<CallStackParamsList>();

const CallStack = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(callsActions.clearCallData());
      dispatch(pushActions.toggleMessagePush(false));
    },
    [],
  );

  return (
    <Stack.Navigator initialRouteName={CallPages.IncommingCallScreen}>
      <Stack.Screen name={CallPages.IncommingCallScreen} component={IncomingCallScreen} options={options.incomingCallScreenOptions} />
      <Stack.Screen name={CallPages.CurrentCallScreen} component={CurrentCallScreen} options={options.currentCallScreenOptions} />
      <Stack.Screen name={CallPages.CallFeedbackScreen} component={CallFeedbackScreen} options={options.feedBackCallScreenOptions} />
      <Stack.Screen name={CallPages.MatchingScreen} component={MatchingScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name={CallPages.ReportScreen} component={ReportScreen} options={options.reportScreenOptions} />
      <Stack.Screen name={CallPages.InviteToRoomScreen} component={InviteToRoomScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name={CallPages.ConnectionCallScreen} component={ConnectionRoomScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen
        name={CallPages.ReportSent}
        component={ReportSent}
        options={{ headerShown: false, gestureEnabled: false, animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default CallStack;
