import { NavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgIcon from '../../../components/common/SvgIcon';
import { actions } from '../../../ducks/messaging';
import { actions as candidateActions } from '../../../ducks/candidates';
import { MessageType } from '../../../ducks/messaging/types';
import { Pages } from '../../../navigators/Routes';
import { CallStackParamsList, RootStackParamList } from '../../../navigators/types';
import { getSendSlack, getSendSlack12, ISIOS, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import remoteConfig from '@react-native-firebase/remote-config';
import { actions as callsActions } from '../../../ducks/calls';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';
import DotsPreloader from '../../../components/preloaders/DotsPreloader';
import { strings } from '../../../utils/string';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CALL_END, END_CALL_HISTORY, END_CALL_NOT_RECEIVER_SCREEN, END_CALL_NOT_SHOW_CLOSESCREEN, IS_IOS } from '../../../utils/constants';

const IncomingCallScreen = () => {
  const dispatch = useAppDispatch();
  const { initMessage, message } = useAppSelector((state) => state.fcm);
  const { accessToken } = useAppSelector((state) => state.token);
  const { loading } = useAppSelector((state) => state.candidates);
  const navigation = useNavigation<NavigationProp<RootStackParamList & CallStackParamsList>>();
  const { bottom, top } = useSafeAreaInsets();

  const onDecline = () => {
    const obj1 = {
      title: strings.notification_decline,
      data: {
        description: initMessage?.description,
        matchId: initMessage?.matchId,
        passions: initMessage?.passions[0],
        type: initMessage?.type,
        userName: initMessage?.userName,
        userTagline: initMessage?.userTagline,
      },
    };
    getSendSlack(obj1);
    dispatch(callsActions.declineCallRequest());
    navigation.navigate(Pages.MainStack);
  };

  const onAcceptCall = async () => {
    const obj1 = {
      title: strings.notification_accepted_click,
      data: {
        description: initMessage?.description,
        matchId: initMessage?.matchId,
        passions: initMessage?.passions[0],
        type: initMessage?.type,
        userName: initMessage?.userName,
        userTagline: initMessage?.userTagline,
      },
    };
    getSendSlack(obj1);
    await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
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

    dispatch(callsActions.notNowCallRequest());
    navigation.navigate(Pages.MainStack);
  };

  useFocusEffect(
    useCallback(() => {
      if (initMessage && !initMessage?.reasonTitle && !initMessage?.reasonDescription) {
        const timeout = setTimeout(() => {
          const obj1 = {
            title: strings.request_time_is_out,
            data: {
              description: initMessage?.description,
              matchId: initMessage?.matchId,
              passions: initMessage?.passions[0],
              type: initMessage?.type,
              userName: initMessage?.userName,
              userTagline: initMessage?.userTagline,
            },
          };
          getSendSlack(obj1);
          dispatch(
            actions.updateMessageData({
              reasonTitle: 'Request time is out!',
              reasonDescription: 'Don’t worry you will get more Parlapp invites later.',
            }),
          );
        }, 15000 + remoteConfig().getValue('popUpDisplayDuration').asNumber() * 1000);

        return () => {
          clearTimeout(timeout);
        };
      }

      if (initMessage?.reasonTitle && initMessage?.reasonDescription) {
        setTimeout(() => {
          const obj1 = {
            title: strings.notification_close,
            data: {
              description: initMessage?.description,
              matchId: initMessage?.matchId,
              passions: initMessage?.passions[0],
              type: initMessage?.type,
              userName: initMessage?.userName,
              userTagline: initMessage?.userTagline,
            },
          };
          getSendSlack(obj1);

          navigation.navigate(Pages.MainStack);
          dispatch(actions.startWithInitMessage(null));
        }, 10000);
      }
    }, [initMessage]),
  );

  if (!initMessage) return null;

  return (
    <ImageBackground
      source={{ uri: initMessage?.userAvatar !== '' ? initMessage?.userAvatar : '', headers: { Authorization: accessToken ?? '' } }}
      resizeMode="cover"
      style={[styles.background, { backgroundColor: initMessage?.userAvatar !== '' ? 'transparent' : '#F1F7FF' }]}
    >
      <LinearGradient
        // colors={['rgba(61, 139, 255, 0.4)', 'rgba(0, 82, 204, 0.4)']}
        colors={['#4C9AFF', '#2454FF']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ flex: 1, marginTop: IS_IOS ? hp(2.7) : top + hp(2) }}>
          <SvgIcon name="white-logo" height={hp(7)} style={styles.whiteLogo} />
          <View style={styles.details}>
            <Text style={styles.description}>"{initMessage?.isCallBack ? initMessage?.description?.query : initMessage?.description}"</Text>

            {/* <View style={styles.passions}> */}
            {/* {initMessage?.passions &&
                initMessage?.passions.map((item) => (
                  <View key={item} style={styles.passion}>
                    <Text>{item}</Text>
                  </View>
                ))} */}
            {/* </View> */}
          </View>
          <View style={styles.info}>
            {!!initMessage?.userAvatar ? (
              <Image style={styles.avatar} resizeMode={'cover'} source={{ uri: initMessage?.userAvatar }} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initMessage?.userName?.charAt(0)?.toUpperCase() ?? 'P'}</Text>
              </View>
            )}
            <Text style={styles.caller}>{initMessage?.userName || 'Parla'}</Text>
            <Text style={styles.body}>Invite you to join Parlapp room</Text>
          </View>
        </View>
        {initMessage?.type === MessageType.MatchFound && !initMessage?.reasonTitle && !initMessage?.reasonDescription && (
          <View style={styles.actions}>
            {loading ? (
              <>
                <View />
                <DotsPreloader containerStyle={{ width: 50, alignSelf: 'center' }} />
                <View />
              </>
            ) : (
              <>
                <TouchableOpacity onPress={onAcceptCall} style={[styles.button, styles.accept]}>
                  {/* <LinearGradient colors={['#06C6BA', '#25E1D6', '#06E3D6']}> */}
                  <Text style={styles.buttonText}>Accept</Text>
                  {/* </LinearGradient> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={onDecline} style={[styles.button, styles.decline, { marginTop: hp(1.9) }]}>
                  {/* <LinearGradient colors={['#F21F52', '#FF5881']}> */}
                  <Text style={styles.buttonText}>Decline</Text>
                  {/* </LinearGradient> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={onNotNowCall} style={{ alignSelf: 'center', marginTop: hp(3.2) }}>
                  <Text style={[styles.buttonText, { color: Colors.secondary13 }]}>{'Not now'}</Text>
                </TouchableOpacity>
                {/* {!ISIOS && <View style={{ borderWidth: 1, borderColor: 'rgba(242, 242, 242, 0.1)' }}></View>} */}
              </>
            )}
          </View>
        )}
        {initMessage?.reasonTitle && initMessage?.reasonDescription && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>{initMessage?.reasonTitle}</Text>
            <Text style={styles.reasonDescription}>{initMessage?.reasonDescription}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;
