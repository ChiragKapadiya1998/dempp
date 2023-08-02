import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import remoteConfig from '@react-native-firebase/remote-config';

import { actions as candidateActions } from '../../../ducks/candidates';
import { actions as pushActions } from '../../../ducks/push';
import { actions as callsActions } from '../../../ducks/calls';
import { actions } from '../../../ducks/messaging';
import { getSendSlack, getSendSlack12, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { MessageType } from '../../../ducks/messaging/types';
import {
  CALL_END,
  CALL_END_NAVIGATION,
  END_CALL_HISTORY,
  END_CALL_NOT_RECEIVER_SCREEN,
  END_CALL_NOT_SHOW_CLOSESCREEN,
  SMALL_PRELOADER_SIZE,
} from '../../../utils/constants';
import DotsPreloader from '../../preloaders/DotsPreloader';
import SvgIcon from '../SvgIcon';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { strings } from '../../../utils/string';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PushAlert = () => {
  const dispatch = useAppDispatch();
  const translateY = useRef(new Animated.Value(0)).current;
  const { message } = useAppSelector((state) => state.fcm);
  const { showPush } = useAppSelector((state) => state.push);
  const { loading: callsLoading } = useAppSelector((state) => state.calls);
  const { loading: candidatesLoading } = useAppSelector((state) => state.candidates);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const loading = callsLoading || candidatesLoading;

  const onDecline = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    const obj1 = {
      title: strings.notification_decline,
      data: {
        description: message?.description,
        matchId: message?.matchId,
        passions: message?.passions[0],
        type: message?.type,
        userName: message?.userName,
        userTagline: message?.userTagline,
      },
    };
    getSendSlack(obj1);

    dispatch(pushActions.toggleMessagePush(false));
    dispatch(callsActions.declineCallRequest());
  };

  const onAcceptCall = async () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    const obj1 = {
      title: strings.notification_accepted_click,
      data: {
        description: message?.description,
        matchId: message?.matchId,
        passions: message?.passions[0],
        type: message?.type,
        userName: message?.userName,
        userTagline: message?.userTagline,
      },
    };
    getSendSlack(obj1);
    await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
    await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_NOT_RECEIVER_SCREEN, JSON.stringify(false));
    dispatch(candidateActions.answerCandidateRequest());
  };

  const onNotNowCall = () => {
    const obj1 = {
      title: strings.notification_not_now,
      data: {
        description: message?.description,
        matchId: message?.matchId,
        passions: message?.passions[0],
        type: message?.type,
        userName: message?.userName,
        userTagline: message?.userTagline,
      },
    };
    getSendSlack(obj1);
    dispatch(pushActions.toggleMessagePush(false));
    dispatch(callsActions.notNowCallRequest());
  };

  useEffect(() => {
    if (showPush) {
      Animated.timing(translateY, {
        useNativeDriver: true,
        toValue: 420,
        duration: 300,
      }).start((res) => {
        if (res.finished) {
          const newTimer = setTimeout(() => {
            dispatch(pushActions.toggleMessagePush(false));
            const obj1 = {
              title: strings.request_time_is_out,
              data: {
                description: message?.description,
                matchId: message?.matchId,
                passions: message?.passions[0],
                type: message?.type,
                userName: message?.userName,
                userTagline: message?.userTagline,
              },
            };
            getSendSlack(obj1);
          }, remoteConfig().getValue('popUpDisplayDuration').asNumber() * 1000);
          setTimer(newTimer);
        }
      });
    } else {
      Animated.timing(translateY, {
        useNativeDriver: true,
        toValue: 0,
        duration: 300,
      }).start((res) => {
        if (res.finished) {
          // dispatch(actions.newMessage(null));
        }
      });
    }
  }, [showPush]);

  useEffect(() => {
    if (message?.reasonDescription && message?.reasonTitle && showPush) {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }

      Animated.timing(translateY, {
        useNativeDriver: true,
        toValue: 0,
        duration: 300,
        delay: 5000,
      }).start((res) => {
        if (res.finished) {
          const obj1 = {
            title: strings.notification_close,
            data: {
              description: message?.description,
              matchId: message?.matchId,
              passions: message?.passions[0],
              type: message?.type,
              userName: message?.userName,
              userTagline: message?.userTagline,
            },
          };
          getSendSlack(obj1);
          dispatch(pushActions.toggleMessagePush(false));
        }
      });
    }
  }, [message, showPush]);

  if (!message || message.type === MessageType.MatchAccepted) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      {message && (
        // <LinearGradient colors={['#3D8BFF', '#0052CC']} style={styles.messageContainer}>
        <View style={styles.messageContainer}>
          <View style={styles.messageHeader}>
            {!!message?.userAvatar ? (
              <Image style={styles.avatar} resizeMode={'cover'} source={{ uri: message.userAvatar }} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{message?.userName?.charAt(0)?.toUpperCase()}</Text>
              </View>
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.displayName} numberOfLines={1}>
                {message?.userName ?? 'Anonymous'}
              </Text>
              <Text style={styles.inviteText} numberOfLines={1}>
                {'Invites you to join a Parlapp room'}
              </Text>
              {/* )} */}
            </View>
            {/* <SvgIcon name={'parla-push-icon'} height={hp(5)} color={'white'} /> */}
          </View>

          <View style={styles.divider} />

          <View style={styles.bottomContainer}>
            {!!message?.passions && !message?.reasonTitle && !message?.reasonDescription && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {`“${message?.isCallBack ? message?.description : message?.description}”` ?? 'No description'}
                </Text>
                <View style={styles.passions}>
                  {/* {message.passions.map((passion: string) => (
                    <View style={styles.passion} key={passion}>
                      <Text style={styles.passionText}>{passion}</Text>
                    </View>
                  ))} */}
                </View>
              </View>
            )}

            {message?.type === MessageType.MatchFound && !message?.reasonTitle && !message?.reasonDescription && (
              <View style={styles.actions}>
                {loading ? (
                  <View style={styles.connection}>
                    <Text style={styles.actionText}>{'Connecting'}</Text>
                    <DotsPreloader containerStyle={{ width: SMALL_PRELOADER_SIZE, transform: [{ translateY: 3 }] }} />
                  </View>
                ) : (
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={onAcceptCall} style={[styles.action, { backgroundColor: Colors.destructive3 }]}>
                      <Text style={[styles.actionText, { color: Colors.white }]}>{'Join Room'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDecline} style={[styles.action, { backgroundColor: Colors.destructive4, marginLeft: wp(2.14) }]}>
                      <Text style={[styles.actionText, { color: Colors.white }]}>{'Decline'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onNotNowCall} style={[[styles.action, { marginLeft: wp(1.9) }]]}>
                      <Text style={[styles.actionText, { color: Colors.greyish3 }]}>{'Not now'}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {message?.reasonTitle && message?.reasonDescription && (
              <View style={styles.reasonContainer}>
                <Text style={styles.reasonTitle}>{message.reasonTitle ?? 'Server error'}</Text>
                <Text style={styles.reasonDescription}>{message.reasonDescription ?? 'Please contact to support and describe situation.'}</Text>
              </View>
            )}
          </View>
        </View>
        // </LinearGradient>
      )}
    </Animated.View>
  );
};

export default PushAlert;
