import React, { useEffect, useState } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { View, Text, TouchableOpacity } from 'react-native';
import TitleSmall from '../TitleSmall';
import TimeCounterText from '../TimeCounterText';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import remoteConfig from '@react-native-firebase/remote-config';
import { actions as callsActions } from '../../../ducks/calls';
import styles from './styles';

// @ts-ignore
momentDurationFormatSetup(moment);

const format = 'mm:ss';

const TimerMaxTime = () => {
  const { role, callStartTime, prolongation } = useAppSelector((state) => state.calls);
  const dispatch = useAppDispatch();
  const [timeLimit, setTimeLimit] = useState(remoteConfig().getValue('initialCallDuration').asNumber());
  const prolongationStep = remoteConfig().getValue('aditionalCallDuration').asNumber();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (callStartTime === 0) return;
    const timer = setInterval(() => {
      setTime(Date.now() - callStartTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [callStartTime]);

  const REQUEST_ENABLED_TIME =
    callStartTime !== 0 &&
    (role === 'receiver'
      ? remoteConfig().getValue('addButtonDelayReceiver').asNumber()
      : remoteConfig().getValue('addButtonDelayCaller').asNumber()) -
      timeLimit <
      time / 1000;

  useEffect(() => {
    if (prolongation.caller && prolongation.receiver) {
      setTimeLimit((prev) => prev + prolongationStep);
      dispatch(callsActions.prolongationSuccess());
    }
  }, [prolongation]);

  const onAddTime = () => {
    if (role === 'caller') dispatch(callsActions.prolongationRequestCaller(role));
    if (role === 'receiver') dispatch(callsActions.prolongationRequestReceiver(role));
  };

  return (
    <>
      <View style={{ flex: 0.3 }}>
        <TitleSmall>Max</TitleSmall>
        <TimeCounterText>{moment.duration(timeLimit, 'seconds').format(format)}</TimeCounterText>
      </View>
      <View style={styles.extendTime}>
        {REQUEST_ENABLED_TIME && (
          <>
            <TitleSmall>Extend time in room</TitleSmall>
            <TouchableOpacity
              style={!prolongation[role] ? styles.addTimeButton : styles.addTimeButtonDisabled}
              onPress={onAddTime}
              disabled={prolongation[role]}
            >
              <Text style={styles.addTimeButtonText}>Add 5 min</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default TimerMaxTime;
