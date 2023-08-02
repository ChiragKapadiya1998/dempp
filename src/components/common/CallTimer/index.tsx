import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import TitleSmall from '../TitleSmall';
import TimeCounterText from '../TimeCounterText';
import { useAppSelector } from '../../../utils/hooks';

const format = 'mm:ss';

const CallTimer = () => {
  const [time, setTime] = useState(0);
  const { callStartTime } = useAppSelector((state) => state.calls);

  useEffect(() => {
    if (callStartTime === 0) return;
    const timer = setInterval(() => {
      setTime(Date.now() - callStartTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [callStartTime]);

  return (
    <View style={{ flex: 0.3 }}>
      <TitleSmall>Current</TitleSmall>
      <TimeCounterText>{moment(time).format(format)}</TimeCounterText>
    </View>
  );
};

export default CallTimer;
