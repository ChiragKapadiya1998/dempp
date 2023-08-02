import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import SvgIcon from '../../../components/common/SvgIcon';
import { wp } from '../../../styles/metrics';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabs, Pages } from '../../../navigators/Routes';
import { getSendSlack, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as callsActions } from '../../../ducks/calls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CALL_END,
  CALL_END_NAVIGATION,
  END_CALL_HISTORY,
  END_CALL_NOT_RECEIVER_SCREEN,
  END_CALL_NOT_SHOW_CLOSESCREEN,
  NOT_SHOW_MATCHING_SCREEN,
} from '../../../utils/constants';
import NavigationHelper from '../../../utils/NavigationHelper';
import { BottomStackParamsList } from '../../../navigators/types';
import { actions as candidatesActions } from '../../../ducks/candidates';

const ConnectionRoomScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const { currentQuery } = useAppSelector((state) => state.candidates);
  const { initMessage, message } = useAppSelector((state) => state.fcm);

  const onCancel = async () => {
    await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
    await AsyncStorage.setItem(CALL_END_NAVIGATION, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(true));
    await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(true));
    await AsyncStorage.setItem(END_CALL_NOT_RECEIVER_SCREEN, JSON.stringify(true));
    if (currentQuery) {
      dispatch(
        callsActions.updateCallRequest({
          status: 'failed',
          duration: 0,
          nextScreen: true,
        }),
      );
    } else {
      NavigationHelper.navigate<BottomStackParamsList, BottomTabs.HistoryScreen>(BottomTabs.HistoryScreen);
    }
  };

  useEffect(() => {
    const updateCall = async () => {
      await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(true));
      await AsyncStorage.setItem(END_CALL_NOT_RECEIVER_SCREEN, JSON.stringify(true));
      await AsyncStorage.setItem(NOT_SHOW_MATCHING_SCREEN, JSON.stringify(false));
    };
    updateCall();
  }, []);

  useEffect(() => {
    const finalID = currentQuery
      ? currentQuery
      : message?.isCallBack
      ? message?.description?.id || initMessage?.description?.id
      : message?.queryId || initMessage?.queryId;

    const callBack = message?.description?.id || initMessage?.description?.id;

    const obj = {
      title: ' ConnectionRoomScreen ',
      data: {
        method: 'getCall',
        currentQuery: currentQuery,
        isCallBack: message?.isCallBack,
        message: callBack,
        finalID: finalID,

        // response: JSON.stringify(callData),
      },
    };
    getSendSlack(obj);
    finalID && dispatch(candidatesActions.cancelQueryRequest({ id: finalID, status: 'disconnected' }));
  }, []);

  return (
    // <LinearGradient colors={['#F21F52', '#FF5881']} style={styles.background}>
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.statusContainer}>
        <SvgIcon name={'no-connection-icon'} height={wp(27)} />
        <Text style={styles.connectionTitle}>{'Sorry, connection lost'}</Text>
        <Text style={styles.connectionDesc}>
          {'Please, check the Internet connection\nto continue using Parlapp.\nYou can recall query from the\nhistory screen.'}
        </Text>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>{'End the call'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default ConnectionRoomScreen;
