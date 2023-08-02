import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image, BackHandler } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Dots from '../MatchingScreen/components/Dots';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { getSendSlack, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import FastImage from 'react-native-fast-image';
import TitleSmall from '../../../components/common/TitleSmall';
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { actions as pushActions } from '../../../ducks/push';
import { CallStackParamsList, RootStackParamList } from '../../../navigators/types';
import { actions as candidatesActions } from '../../../ducks/candidates';
import remoteConfig from '@react-native-firebase/remote-config';
import Alert from '../../../components/modals/Alert';
import { AlertType } from '../../../components/modals/Alert/types';
import { actions } from '../../../ducks/history';
import { fontFamily } from '../../../utils/functions';
import { CallPages, Pages } from '../../../navigators/Routes';
import NavigationHelper from '../../../utils/NavigationHelper';
import AlertBox from '../../../components/modals/AlertBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOT_SHOW_MATCHING_SCREEN } from '../../../utils/constants';

const InviteToRoomScreen = () => {
  const Rounts = useRoute();
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<CallStackParamsList>>();
  const isConnnected = Rounts && Rounts?.params && Rounts?.params?.data;
  const callData = Rounts && Rounts?.params && Rounts?.params?.callData;
  const matchId = Rounts && Rounts?.params && Rounts?.params?.matchId;
  const myQueryTab = Rounts && Rounts?.params && Rounts?.params?.myQueryTab;
  const matchAcceptedWaitValue = remoteConfig().getValue('matchAcceptedWaitDuration').asNumber();
  const querierResponserContactingDuration = remoteConfig().getValue('querierResponserContactingDuration').asNumber();
  const { initMessage, message } = useAppSelector((state) => state.fcm);

  const [isShowWait, setisShowWait] = useState(true);

  const { currentQuery } = useAppSelector((state) => state.candidates);
  const { queriesInfo, modalQueriesInfo } = useAppSelector((state) => state.history);
  const [opneModal, setOpneModal] = useState(false);
  const [callBackQuery, setCallBackQuery] = useState<boolean>(false);
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  let oldStatus = myQueryTab ? queriesInfo?.query?.status : queriesInfo.finalStatus;
  let newStatus = myQueryTab ? modalQueriesInfo?.query?.status : modalQueriesInfo.finalStatus;

  const { call, role } = useAppSelector((state) => state.calls);

  useEffect(() => {
    const getValueUpdate = async () => {
      await AsyncStorage.setItem(NOT_SHOW_MATCHING_SCREEN, JSON.stringify(false));
    };
    getValueUpdate();
  }, []);

  const closeModal = () => {
    setOpneModal(false);
    dispatch(candidatesActions.searchCandidatesFailure());
    setIsOpenedModal(false);
    setCallBackQuery(false);
    navigation.goBack();
  };

  const onOkBtnConfirm = async () => {
    setOpneModal(false);
    dispatch(candidatesActions.searchCandidatesFailure());

    setIsOpenedModal(false);
    setCallBackQuery(false);
    navigation.goBack();
  };

  const onDeclineBtnConfirm = async () => {
    setOpneModal(false);
    const finalID = myQueryTab ? queriesInfo?.query?.id : matchId;
    myQueryTab
      ? dispatch(actions.historyQueriesCloseRequest({ id: finalID, status: 'closed' }))
      : dispatch(actions.historyQueriesCloseRequest({ id: finalID, status: 'declined' }));
    dispatch(candidatesActions.searchCandidatesFailure());
    setIsOpenedModal(false);
    setCallBackQuery(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (callData) {
      if (opneModal && newStatus !== undefined) oldStatus == newStatus ? setCallBackQuery(true) : setIsOpenedModal(true);
    }
  }, [modalQueriesInfo]);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        const finalID = myQueryTab ? queriesInfo?.query?.id : matchId;
        callData && setOpneModal(true);

        callData && dispatch(actions.historyBothInfoModalRequest({ id: finalID, myQueryTab: myQueryTab }));
      }, matchAcceptedWaitValue * 1000);

      return () => {
        clearInterval(timer);
        setOpneModal(false);
        setIsOpenedModal(false);
        setCallBackQuery(false);
        setisShowWait(false);
      };
    }, []),
  );

  const onGoBack = () => {
    if (currentQuery) {
      dispatch(candidatesActions.searchCandidatesFailure());
      dispatch(candidatesActions.cancelQueryRequest({ id: currentQuery, status: 'closed' }));
      NavigationHelper.navigate<RootStackParamList, Pages.MainStack>(Pages.MainStack, { screen: Pages.HomeScreen });
    }
  };

  // useEffect(() => {
  //   setisShowWait(true);
  //   if (!callData && !call) {
  //     setTimeout(() => {
  //       if (isShowWait && currentQuery) {
  //         NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.ConnectionCallScreen });
  //       }
  //     }, querierResponserContactingDuration * 1000);
  //   }

  //   return () => {
  //     setisShowWait(false);
  //   };
  // }, []);

  useEffect(() => {
    dispatch(pushActions.toggleMessagePush(false));

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => callData && closeModal());

    return () => backHandler.remove();
  }, []);

  const caller = call?.caller;
  const receiver = call?.receiver;
  const amICaller = role === 'caller';

  const contactDisplayName = (!amICaller ? caller?.name : receiver?.name) ?? callData?.[0]?.name ?? 'Parla';
  const contactAvatar = !amICaller ? caller?.avatar?.s : receiver?.avatar?.s ?? callData?.[0]?.avatar?.s;
  const contactTagline = (!amICaller ? caller?.tagline : receiver?.tagline) ?? callData?.[0]?.tagline ?? 'No tagline';

  return (
    <LinearGradient colors={['#4C9AFF', '#2454FF']} style={styles.background}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* {callData && (
          <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end', marginRight: wp(2), marginTop: hp(1) }}>
            <SvgIcon name={'cancel-icon'} height={14} color={Colors.white} />
          </TouchableOpacity>
        )} */}
        <Text style={styles.queryText}>“{call?.match?.query?.query ?? "Query you've typed in to find an ideal buddy to talk to"}”</Text>

        <Image source={require('../../../../assets/images/arrow-up.png')} style={styles.arrowUpImage} />
        <View style={styles.contactContainer}>
          <TitleSmall style={{ color: Colors.greyish2, fontWeight: '600', fontFamily: fontFamily.rf_regular }}>{'your parlapp contact'}</TitleSmall>
          <View style={styles.contact}>
            {contactAvatar ? (
              <FastImage source={{ uri: contactAvatar }} resizeMode={'cover'} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{contactDisplayName.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
          <Text style={styles.displayName}>
            {contactDisplayName == 'Parla' ? 'Loading' : contactDisplayName}
            {contactDisplayName == 'Parla' && <Dots color={Colors.black} />}
          </Text>
          <Text style={styles.taglineSubTitle}>{contactTagline}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusDescription}>{'Contacting'}</Text>
          <Text style={styles.statusDescription}>{`${contactDisplayName}`}</Text>
          <Text style={styles.statusText}>
            {isConnnected ? isConnnected : 'Please wait'}
            <Dots color={Colors.white} />
          </Text>
        </View>
      </SafeAreaView>
      {/* {!callData && call ? (
        <TouchableOpacity
          style={[styles.addFromButton, { marginTop: hp(10), marginBottom: hp(1) + insets.bottom }]}
          onPress={() => {
            curentUser?.id == call?.match?.proposedUserId ? dispatch(callsActions.declineCallRequest()) : onGoBack();
          }}
        >
          <Text style={styles.addFromButtonText}>{curentUser?.id == call?.match?.proposedUserId ? 'Decline query' : 'Close query'}</Text>
        </TouchableOpacity>
      ) : null} */}

      {callBackQuery && (
        <AlertBox
          onBackdropPressValue={true}
          isVisible={callBackQuery}
          setIsVisible={setCallBackQuery}
          btnStyle={{ flexDirection: 'column' }}
          btnContentStyle={{ flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }}
          title="Sorry, the person you are trying to reach didn’t answer. "
          message=""
          buttons={[
            {
              text: myQueryTab ? `I will try later` : `I can try later`,
              onPress: onOkBtnConfirm,
            },
            {
              text: myQueryTab ? `Close query` : `Decline query`,
              variant: 'destructive',
              onPress: onDeclineBtnConfirm,
            },
          ]}
        />
      )}

      {isOpenedModal && (
        <AlertBox
          onBackdropPressValue={true}
          isVisible={isOpenedModal}
          setIsVisible={setIsOpenedModal}
          btnStyle={{ flexDirection: 'column' }}
          btnContentStyle={{ flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }}
          title="Sorry, the person you are trying to reach is not available now. "
          message=""
          buttons={[
            {
              text: `Ok`,
              onPress: onOkBtnConfirm,
            },
          ]}
        />
      )}
    </LinearGradient>
  );
};

export default InviteToRoomScreen;
