import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  Image,
  BackHandler,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/core';
import remoteConfig from '@react-native-firebase/remote-config';
import BackgroundTimer from 'react-native-background-timer';
import RNIM from 'react-native-incall-manager';
import momentDurationFormatSetup from 'moment-duration-format';
import moment from 'moment';
import NetInfo, { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { BottomTabs, CallPages, Pages } from '../../../navigators/Routes';
import { BottomStackParamsList, CallStackParamsList, RootStackParamList } from '../../../navigators/types';
import { getSendSlack, getSendSlack12, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as callsActions } from '../../../ducks/calls';
import { actions as candidatesActions } from '../../../ducks/candidates';
import { actions as modalsActions } from '../../../ducks/modals';
import LeftChevronButton from '../../../components/common/Header/components/LeftChevronButton';
import { actions as userActions } from '../../../ducks/user';
import CallConnectionModal from '../../../components/modals/CallCannection';
import { queryInputRef } from '../../../components/common/SearchInput';
import TitleSmall from '../../../components/common/TitleSmall';
import TimeAddMin from '../../../components/modals/TimeAddMin';
import SvgIcon from '../../../components/common/SvgIcon';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { strings } from '../../../utils/string';
import LostConnectionModal from '../../../components/modals/LostConnectionModal';
import { useRoute } from '@react-navigation/native';
import { CALL_END, CALL_END_NAVIGATION, END_CALL_HISTORY, IS_IOS } from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamily } from '../../../utils/functions';
import { actions as netinfoActions } from '../../../ducks/netinfo';
import { store } from '../../../store';
import NavigationHelper from '../../../utils/NavigationHelper';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';

const format = 'mm:ss';

// @ts-ignore
momentDurationFormatSetup(moment);

const CurrentCallScreen = () => {
  const Rounts = useRoute();
  const navigation = useNavigation<NavigationProp<CallStackParamsList>>();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { isConnected } = useAppSelector((state) => state.netinfo);
  const { call, role, loading, callStatus, callStartTime, prolongation, prolongationCaller, prolongationReceiver } = useAppSelector(
    (state) => state.calls,
  );
  const [muted, setMuted] = useState(false);
  const [netinfoValue, setNetInfoValue] = useState(true);
  const [timeAddModal, setTimeAddModal] = useState(false);
  const [lostConnectionModal, setLostConnectionModal] = useState(false);
  const [dynamic, setDinamic] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimeWarning, setTimeWarning] = useState(false);
  const [isTimeShowAddTime, setIsTimeShowAddTime] = useState(false);
  const prolongationStep = remoteConfig().getValue('aditionalCallDuration').asNumber();
  const timeWarningLimitValue = remoteConfig().getValue('timeWarningLimit').asNumber();
  const endCallDurationAfter = remoteConfig().getValue('endCallDurationAfterFailed').asNumber();
  const [timeLimit, setTimeLimit] = useState(remoteConfig().getValue('initialCallDuration').asNumber());
  const { data } = useAppSelector((state) => state.user);
  const [onlyIOSAddTime, setOnlyIOSAddTime] = React.useState(0);

  const candidates = Rounts?.params?.data == true ? 'Search Candidates' : 'Receiver Candidates';
  const netInfo = useNetInfo();

  const getTimerString = (time: number) => {
    const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2);

    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!netInfo.isConnected) {
      setNetInfoValue(false);
    }
  }, [netinfoValue]);

  const REQUEST_ENABLED_TIME =
    (role === 'receiver'
      ? remoteConfig().getValue('addButtonDelayReceiver').asNumber()
      : remoteConfig().getValue('addButtonDelayCaller').asNumber()) -
      timeLimit <
    timer / 1000;

  useEffect(() => {
    const getUser = async () => {
      await AsyncStorage.setItem(CALL_END, JSON.stringify(true));
      const caller = call?.caller;
      const receiver = call?.receiver;
      const obj1 = {
        title: strings.parla_room_success_class_create,
        data: {
          qurey: call?.match?.query?.query,
          callerName: caller?.name,
          callerId: caller?.id,
          callerStatus: caller?.status,
          callerPhone: caller?.phone,
          receiverName: receiver?.name,
          receiverId: receiver?.id,
          candidates: candidates,
        },
      };
      getSendSlack(obj1);
    };
    getUser();
  }, []);

  const updateTimer = useCallback(() => {
    setTimer(Date.now() - callStartTime);
  }, [callStartTime]);

  const onGoBack = () => {
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.parla_room_cancel,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
      },
    };
    getSendSlack(obj1);
    navigate(Pages.MainStack, {
      screen: Pages.HomeScreen,
      initial: false,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress, ...rest }: HeaderBackButtonProps) => <LeftChevronButton {...rest} onPress={onGoBack} tintColor={Colors.white} />,
    });
  }, []);

  useEffect(() => {
    const limit = Number(timeLimit) - Math.round(timer / 1000);
    if (limit <= timeWarningLimitValue) {
      setTimeWarning(true);
    } else {
      setTimeWarning(false);
    }
    if (timer / 1000 >= timeLimit) {
      onLeaveRoom();
    }
  }, [timer, timeLimit]);

  useEffect(() => {
    if (REQUEST_ENABLED_TIME) {
      Vibration.vibrate(400);
    }
  }, [REQUEST_ENABLED_TIME]);

  useEffect(() => {
    if (prolongationCaller) {
      Platform.OS == 'android' && setTimeLimit((prev) => prev + prolongationStep);
      if (Platform.OS == 'ios' && onlyIOSAddTime == 0) {
        setOnlyIOSAddTime((prev) => prev + 1);
        setTimeLimit((prev) => prev + prolongationStep);
      }
      dispatch(callsActions.prolongationSuccessBoth());
    }
  }, [prolongationCaller]);

  useEffect(() => {
    if (prolongationReceiver) {
      setTimeLimit((prev) => prev + prolongationStep);
      dispatch(callsActions.prolongationSuccessBoth());
    }
  }, [prolongationReceiver]);

  useEffect(() => {
    if (prolongationReceiver) {
      setIsTimeShowAddTime(true);
      setTimeout(() => {
        setOnlyIOSAddTime(0);
        setIsTimeShowAddTime(false);
      }, 6000);
    }
    if (prolongationCaller) {
      setIsTimeShowAddTime(true);
      setTimeout(() => {
        setOnlyIOSAddTime(0);
        setIsTimeShowAddTime(false);
      }, 6000);
    }
  }, [prolongationCaller, prolongationReceiver]);

  useEffect(() => {
    if (callStatus === 'failed' || callStatus === 'disconnected') {
      dispatch(modalsActions.toggleCallConnection(true));
    } else {
      dispatch(modalsActions.toggleCallConnection(false));
    }

    if (callStatus === 'failed') {
      setTimeout(async () => {
        await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
        await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(true));
        // await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
        dispatch(modalsActions.toggleCallConnection(false));
        !netinfoValue && NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.ConnectionCallScreen });
        dispatch(
          callsActions.updateCallRequest({
            status: 'failed',
            duration: timer,
            nextScreen: false,
          }),
        );
      }, endCallDurationAfter);
    }
  }, [callStatus]);

  const toggleMute = () => {
    setMuted((prev) => !prev);
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.microphone_click,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
      },
    };
    getSendSlack(obj1);
  };

  const toggleDinamic = () => {
    setDinamic((prev) => !prev);
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.volume_click,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
      },
    };
    getSendSlack(obj1);
  };

  const onAddTimeModal = () => {
    setTimeAddModal(true);
  };
  const onADDTime = () => {
    // if (role === 'caller') dispatch(callsActions.prolongationRequestCaller(role));
    dispatch(callsActions.prolongationSuccess({ prolongationStep: prolongationStep, receiver: call?.match?.proposedUserId }));
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.add_min,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
      },
    };
    getSendSlack(obj1);
    setTimeAddModal(false);
  };

  const onLeaveRoom = async () => {
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.parla_room_leave,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
        time: getTimerString(timer),
        maxTime: moment.duration(timeLimit, 'seconds').format(format),
      },
    };
    getSendSlack(obj1);
    await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
    await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(false));
    // await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
    dispatch(
      callsActions.updateCallRequest({
        status: 'finished',
        duration: timer,
        nextScreen: false,
      }),
    );
    dispatch(userActions.getUserRequest());
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure want to end Parla room?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            onLeaveRoom();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    RNIM.setSpeakerphoneOn(dynamic);
    RNIM.setForceSpeakerphoneOn(dynamic);

    return () => {
      RNIM.setSpeakerphoneOn(false);
      RNIM.setForceSpeakerphoneOn(false);
    };
  }, [dynamic]);

  useEffect(() => {
    RNIM.setMicrophoneMute(muted);
    dispatch(candidatesActions.mute(muted));
    return () => {
      RNIM.setMicrophoneMute(false);
      dispatch(candidatesActions.mute(false));
    };
  }, [muted]);

  useFocusEffect(
    useCallback(() => {
      if (!callStartTime) return;
      RNIM.start({ media: 'audio' });
      const timer = BackgroundTimer.setInterval(updateTimer, 1000);
      return () => {
        RNIM.stop();
        BackgroundTimer.clearInterval(timer);
      };
    }, [callStartTime]),
  );
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content', true);
      queryInputRef.current?.clear();
      return () => {
        StatusBar.setBarStyle('dark-content', true);
        setTimeLimit(remoteConfig().getValue('initialCallDuration').asNumber());
      };
    }, []),
  );

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  const onPreesEndCallHandle = () => {
    const caller = call?.caller;
    const receiver = call?.receiver;
    const obj1 = {
      title: strings.parla_room_end_call,
      data: {
        qurey: call?.match?.query?.query,
        callerName: caller?.name,
        callerId: caller?.id,
        callerStatus: caller?.status,
        callerPhone: caller?.phone,
        receiverName: receiver?.name,
        receiverId: receiver?.id,
        time: getTimerString(timer),
        maxTime: moment.duration(timeLimit, 'seconds').format(format),
      },
    };
    getSendSlack(obj1);
    setLostConnectionModal(false);
    dispatch(
      callsActions.updateCallRequest({
        status: 'finished',
        duration: timer,
        nextScreen: false,
      }),
    );
    dispatch(userActions.getUserRequest());
  };

  if (!call) return null;

  const caller = call?.caller;
  const receiver = call?.receiver;
  const amICaller = role === 'caller';

  const contactDisplayName = (!amICaller ? caller?.name : receiver?.name) ?? 'Noname';
  const contactAvatar = !amICaller ? caller?.avatar?.s : receiver?.avatar?.s;
  const contactTagline = (!amICaller ? caller?.tagline : receiver?.tagline) ?? 'No tagline';
  // const contactDisplayName = 'Parla';
  // const contactAvatar =
  //   'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsApAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYBBwj/xABDEAABAwIEAgUICAQEBwAAAAABAAIDBBEFEiExBkETIlFhcRQVMkKBkbHRByNSgpKhweEzcpPxQ1SioyY0NURTYmP/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAIxEAAgIBBAIDAQEAAAAAAAAAAAECEQMSITFBBFETFGEiI//aAAwDAQACEQMRAD8As45ipLH3VS2RSI5bc19OfPEnE6htDh1RWGPMIYy8tBtmtyTomtmpo5gMudgdbsuLqo4nn/4drxfeK3vICs6B5ZQ07C65bE0Xt3KL/qjSlpscYNdEwwWUkSLpkHYqsEQyyyY5imOLCEJ0YOxQBGskUR0ZGyY4EJANukmuc0bkD2phnh26Vl+wOCVoAhITbITqiIbvP4Sf0TfKG+rHI77tvilaHQeyaWKHFiXTVdRTsgeDBlzFzhzF0Z1VK1pPQA+L/wBkakwcWjr2ITmlPfLKeUbfefkgPfNnDekjF7+ofmk2hpDkgVHke4b1DR7h8VFfUMa+xrBa32mfJS5IelstQ8dqSpvK6cf95/upI1oPjZfMF0ZrSqybFoYQ0jo7E+tIL+4XUWXiOJmb64N7MjPmh5YrsSxTfRL4pJbgFXcaENH+oK3ilbFDGHva2zBue5YXGcfixCjdSxyOdIbElz+zuGiiP4sjYfqmtvYDqxk/FYvyYKVm68eTjR6Ia6nG0mb+UXQ3Yi3LmbHI4ewLzWXiupdfL0lj4NUOTiKseLW05ZpCVD82JS8SR6jLiZjIBbG3+Z+yiSY01rrGqhaLeoNf1Xl78Wq3bPY3wahOxCsdvUv8AAFm/N9I0Xifp6acciJ1qpS21hlbb9EB+M09zmbM8HbM75leamomf6U0p+8UwuB9IuPiVD8yT4L+rE9DfjdMxxcIYxpbrOCju4pY03Jp2WBABkusHmZfSxTmtc70InHwBKh+TkK+vjNlJxZcn66ANB0ysJQpOLXE/wDMn7sSyzaaqd6FJOfCJx/RKnpZqh+X+GBuXD9FPz5WP4caL7z++N8lS2WUGci5aACbC2qE/iV7hq6qdftf+6r5aCsfFHHTQy1BYTmMUZda/gheacWOvm6s/oOQ55RqOMnux95v1Jj4yIDsYc7eEnxcgjA8ZdthtV/Tsn+YMat/06o/CFN5f0f+ftHDir+VO38X7JnnSXlEz3lOOA4zzw+f3D5rnmHGP8hN+XzS/wBfTHeP2NOKT/Yj9x+a4neYcX/yMvvHzSSrJ6Y7x/hFfXzm953i+9uqi01DiFeL01FVVAPNkbnD32V9wRjlLhWMw1VdCZY2tLczYw57L8+S9qwriGgxSDpaOriewbtN2lviDsrhi+RXqJlNR2o8Kh4fxigAqq7D5qeD0Q+QAanYWvdSqrgfGcPpH1uJMjjp47ZgJbu1Nht3r1H6Rp434LSMbkOaujBLXX5OUv6RTTHhGt6Nrg8uZb8YWrwxS3Frb4Z5Jwrwg7iOedjKw0zYm5rmPPcXt2i3JaqP6KKYay4lUP8A5GtHxurD6HaLyiauANssQ5drj8l6NNhE7RdmoCcFgW0uRyjle8TzSL6McIZ6flcvjKAPyCkx8C4BDp5AXH/6SuP6rZujlY5zSDdu4smnKfTBPgumMMXKSOaXycNsyzOFMDZ6OE0v3mX+KIzAcLi/h4XRNt2U7fktG6KAi4z+9BdAPUcfatEoejNqXspvIoY/QpIQO6MBcMVv8MD7qNjtc3B8NmrJml7Yxo0cyq/h6sx7iLDjX4bhtGafpDH9ZU5XXG+lkPJCLpkaJPcVfmbST25Ru+C83jhEYBXqdVQ8RSU8kUmDRnOwtzMqmG1x3rzfFi3Ca99DVsmgqY7Xzsa9rbi4PVd2Ll8iadNHR48eUXXBjgPLCTe5Zz8Vpekb2Lz57sUYbwvc5oAN2MNiOr2X+238QUug4kqo52x1TDawdZ4sSDsR3d6IeSoKpIvJ4ut3GVm2ztP91wkIVFUU9ZD0kBvpq2+oTnkDlZdikmrRwuLTpjHFvao8mUbJ8jwo0huixJHC8X3XEI7pJWUeXgFpBboRtZWuFYpNSytcHuieNng7+KrdF0GwFie8LxYzcXses0mqNlWcQPxKnp4J8gdFO2QyNcMpFiNuR1V5xFjlLXYVJTw1MUrnFp6jwb2K86onEmS9tAuYfLaXXm1dKzyrfsweFddHo30eYgcPfUZJzE5zAPStfUr0SDiGr5VGcd9ivn+reHQwjQ6lMgmqWODYHyNPIMcR8Enlgv5cbHUrtOj6Hp+IpWSTmeCGYB7R1tCBlCnefYSw5sPpwz+b9l4Ph1bjZJY2vmDSetmdm5WVz5yro444jWyNB0a9wBAPerUMcldUDyZV2en1NdTSQS5IOjIBuRY8vYhRdEYwS9+32f3XlFfNxEMxGISysdv0bsv5BVMuL4sx1pK2rB7DIQnr0KkmDbm7dG8+lF4HDeVryQ6drfyKpfo/4ufh1N5rInipzLnY+mja51yRe+bTbZZOpr6mrjMdTUSzNPqveSLoME8tMLU8skQ/9HkLJ5U5WDgnGmey8S4zh4pD0ddjckl23c1wDQLguByW1y39q8vxWTCqniTEbwVMjeka2PymRznhoaAQbkk6359igw4hWOqADWT3foTnJugYnHnqJZpJJnzPJc95HpHtUzkmtisWOnZfQMpc8fRzTQ6ggRvvaxaRvf7DfwjsUCsmmyRUeJNJ6EWgeDYtb2B1tR3H8lUU1RJHILvv7dVfU9dDPD0NUxssZ9V3IqNTao3pJ2dwOqngfma5wLTqQtlT4jDUQZ5HRsdexBcAs7BFAyIGEdUcjyVfjGJyYe6N0VNTStfe5ljuRbvv3rfDN4+eDDPD5OOTXyVVJzmhH3wo76ul/wDPD/UCwp4ikc4OdQUVxsOj/dOPEIPpYbRnwYtvtROb60jZGqpr/wAeH8YSWIkxpsjriigZps1gskj7MR/XKo2SC6NTYAlSIaWSU2tZeclZ2HaPTpLdnzQ6aGZzwYWnNsrBlLFTDrvObsCLEZJ3FsDMoO7u1bKGyIsG6AZWeVPsW/4cepKn01JnADvqoyP4bTqfEp9PSRxWdu/mTqpbQB3lbRguSWw7OowNj0aNgNEqq8gyPJLS0N7VxovYbXK5KP2WpJGpKqSB5ppZCLeg88/FS5WGQETAEd6iV0QlYHsF3N0056JUFaCBDOe5rj8CovphXYOfC436ss3wKrp8MnjBLdQtK5lk3KO4qXjTBSMjDHLHVR52uAB3torQHS5dorR9PFJ6UYv2gWKiT4a1wsxxAO4Oh96lQ08FXZQV2s8ZAu0nWyNHEIjqVOmw8xxnKXst2i/5qL0Tw360guGgcDdZTjTs1hLotKKoLAATog4+xs1AXs3jOa3cq6OofG/KSp7HmohLb6EWI8Ur2GZsjsuUizQahEmjkikcx5sWmyF7FAHLXSTrHmQEkgLdsUEA6/4WrklU4jJC0Abf3KBHG59g91yrKlpQ3V4XSlfBlYGmo3SEPkuQrJjWxNys2XAbDKNk5umy0UaJse1EaRzQrnSxRASBurQBWnXRNfbt5JrHnUrjnu7UAJlrc7qDWx5ZOkYNDo4d6lXN7p0oa9rgR1XixUy3BDcPrRpFO7TZruzxVkWhZp9opXRuO35qyw6uAywzusNmPPwKmMuhSj2ie5DJKLIx3M+CCW95VCR0a80CemjmB06xGhG6Ll73e9cdcbl1u26CuDN1MDopC2YASD3HvCfSVRgeOzmpGOyQsfE0n6wgm/cqCaozaN965J/yzdO0SMYqI56sSRb5bO70KOUFoGVt+feoifG/IQ6wIG4PNRe4MlWPqiw70lKZBBI0PbE+xHqk2SV6SNRY08YjGykF/IbILXJ41XUtjII0ogKCE4FMAzd0+6CDonXTTGFC4XJubRMLkNgOcblJp6mXX3phKTXapAMqIOkiuw9duw7VABzDUq0DsrgeSi18OR3SttYnrKJIaZKw7EMoEFQersxxP5FT3sNgSd1nFPoK/JlhnJLToHHl3JxfsTj2iwNws3xM+YVEYL3CMs6oB0vz/RaZwuq3F6Dy6nytNpGG7CdvBLIriOL33Me5xduSfErifLE+GR0crS17dCCmLjNxJLiSACsqJYxlZI4DsBKSGki2FI07TdEDkFuye1dxyhQU5pQr7IjUDH5ly6ad0kAFzLhKZ6x9iXNAx11wO1K4U1KwDZrhcMgMRZICQdLBDadEjuEMCvkikhlcx17eqe0JHUaqfiABjYeea3sVf6xHcoKJ9BXFhEM77t2a48u5WRB7FnLXOquMMe59MMxJsSBdOL6E0VnElJmY2qYNW9VwHZyKzy29W1r6eVrhcFhuPYsRyWOWNOzSDtCSSSWRZ1JJJAH/2Q==';
  // const contactTagline = 'No tagline';

  const myContactDisplayName = (amICaller ? caller?.name : receiver?.name) ?? 'Noname';
  const myContactAvatar = amICaller ? caller?.avatar?.s : receiver?.avatar?.s;

  const TimeRoomeMessage = (value: boolean) => {
    return (
      <View style={[styles.informWindow, { backgroundColor: value ? Colors.primary14 : Colors.accent18 }]}>
        <SvgIcon name={value ? 'round-right-icon' : 'union-icon'} height={wp(6)} color={value ? Colors.primary14 : Colors.primary11} />
        <Text style={[styles.infoText, { color: value ? Colors.destructive3 : Colors.primary11 }]}>
          {value
            ? `Time in the room was extended for ${moment.duration(prolongationStep, 'seconds').format('m')} minutes`
            : `Your contact just extended time in the room for ${moment.duration(prolongationStep, 'seconds').format('m')} minutes`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={{ flex: 1, zIndex: -1 }}>
        <View style={styles.queryContainer}>
          <Text style={styles.query}>“{call?.match?.query?.query ?? "Query you've typed in to find an ideal buddy to talk to"}”</Text>
        </View>
        <ImageBackground source={require('../../../assets/talkbubble.png')} style={styles.mainContainer} resizeMode={'stretch'}>
          {/* <Image source={require('../../../../assets/images/arrow-up.png')} style={styles.arrowUpImage} /> */}
          {/* <View style={styles.contactContainer}> */}
          <TitleSmall style={styles.yourContact}>{'your parlapp contact'}</TitleSmall>
          <View style={styles.contact}>
            {contactAvatar ? (
              <FastImage source={{ uri: contactAvatar }} resizeMode={'cover'} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{contactDisplayName.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
          <Text style={styles.displayName}>{contactDisplayName}</Text>
          {/* <TitleSmall style={styles.taglineTtitle}>{'Tagline'}</TitleSmall> */}
          <Text style={styles.taglineSubTitle}>{contactTagline}</Text>
          {/* </View> */}
        </ImageBackground>
        <View style={styles.progressMain}>
          <View style={[styles.progressContent, { marginBottom: hp(0.3) }]}>
            <Text style={styles.currentText}>{'Current'}</Text>
            <Text style={styles.currentText}>{'Max'}</Text>
          </View>
          {/* <Progress.Bar
            height={5}
            borderWidth={0}
            width={wp(91.5)}
            color={'#FE9359'}
            unfilledColor={Colors.accent18}
            progress={Math.floor(timer / 1000) / timeLimit}
            animationType="timing"
          /> */}
          <View
            style={{
              width: wp(91.5),
              backgroundColor: Colors.accent18,
              borderRadius: 2.5,
              borderColor: Colors.accent18,
              borderWidth: 0.1,
              height: 5,
            }}
          >
            <SimpleGradientProgressbarView
              style={styles.progressBar}
              fromColor={'#FE9359'}
              toColor={Colors.accent20}
              progress={Math.floor(timer / 1000) / timeLimit}
              maskedCorners={[10, 10, 10, 10]}
              cornerRadius={2.5}
            />
          </View>
          <View style={[styles.progressContent, { marginTop: hp(0.3) }]}>
            <Text style={styles.currentText}>{getTimerString(timer)}</Text>
            <Text style={styles.currentText}>{moment.duration(timeLimit, 'seconds').format(format)}</Text>
          </View>
        </View>
        <View style={styles.extendTime}>
          {data?.id == call?.match?.proposedUserId &&
            (isTimeShowAddTime ? (
              <>{TimeRoomeMessage(true)}</>
            ) : (
              <>
                <TouchableOpacity
                  // style={!prolongation[role] ? styles.addTimeButton : styles.addTimeButtonDisabled}
                  style={styles.addTimeButton}
                  onPress={onAddTimeModal}
                  // disabled={prolongation[role]}
                >
                  <Text style={styles.addTimeButtonText}>{`+   ${moment.duration(prolongationStep, 'seconds').format('m')} min`}</Text>
                </TouchableOpacity>
                <Text style={styles.extendTimeText}>{'Extend time in room'}</Text>
              </>
            ))}
        </View>
        {isTimeWarning ? (
          <View style={[styles.informWindow, { backgroundColor: '#FFE4EB' }]}>
            <SvgIcon name={'union-icon'} height={wp(6)} color={Colors.destructive4} />
            <Text style={styles.timeWarningText}>Call will end in 1 min</Text>
          </View>
        ) : null}
        {data?.id !== call?.match?.proposedUserId && isTimeShowAddTime ? TimeRoomeMessage(false) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleMute} style={styles.controllersButtons}>
          <SvgIcon name={muted ? 'microphone-muted-icon' : 'microphone-icon'} height={wp(8)} color={muted ? Colors.destructive4 : Colors.greyish3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLeaveRoom} style={{ marginHorizontal: wp(5) }}>
          <SvgIcon name={'callEnd'} height={68} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDinamic} style={styles.controllersButtons}>
          <SvgIcon name={dynamic ? 'volume-high' : 'volume-off'} height={wp(8.7)} color={Colors.greyish3} />
        </TouchableOpacity>
      </View>
      <CallConnectionModal />
      {lostConnectionModal && <LostConnectionModal onPreesEndCall={onPreesEndCallHandle} />}
      {timeAddModal && <TimeAddMin setTimeAddModal={setTimeAddModal} onADDTime={onADDTime} />}
    </SafeAreaView>
  );
};

export default CurrentCallScreen;

{
  /* <View style={styles.youInfoContainer}>
        <TitleSmall style={{ marginBottom: 5 }}>{'You'}</TitleSmall>
        <View style={styles.contact}>
          {myContactAvatar ? (
            <FastImage source={{ uri: myContactAvatar }} resizeMode={'cover'} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{myContactDisplayName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <Text style={[styles.displayName, styles.myDisplayName]}>{myContactDisplayName ?? 'Anonymus'}</Text>
        </View>
      </View> */
}
{
  /* <View style={styles.timeInfo}>
        <View style={styles.currentTime}>
          <TitleSmall>{'Current'}</TitleSmall>
          <Text style={styles.timeCounter}>{getTimerString(timer)}</Text>
        </View>
        <View style={styles.maxTime}>
          <TitleSmall>{'Max'}</TitleSmall>
          <Text style={styles.timeCounter}>{moment.duration(timeLimit, 'seconds').format(format)}</Text>
        </View>
        <View style={styles.extendTime}>
          {REQUEST_ENABLED_TIME && (
            <>
              <TitleSmall>{'Extend time in room'}</TitleSmall>
              <TouchableOpacity
                style={!prolongation[role] ? styles.addTimeButton : styles.addTimeButtonDisabled}
                onPress={onAddTimeModal}
                disabled={prolongation[role]}
              >
                <Text style={styles.addTimeButtonText}>{'Add 5 min'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View> */
}
