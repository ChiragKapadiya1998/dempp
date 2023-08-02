import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/core';
import remoteConfig from '@react-native-firebase/remote-config';

import { actions as candidatesActions } from '../../../ducks/candidates';
import { actions as userActions } from '../../../ducks/user';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { CallStackParamsList, RootStackParamList } from '../../../navigators/types';
import LeftChevronButton from '../../../components/common/Header/components/LeftChevronButton';
import Radar from './components/Radar';
import Dots from './components/Dots';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { HeadingText, QueryText, MatchingText } from './styled';
import styles from './styles';
import { matching } from '../../../utils/lottieSources';
import LinearGradient from 'react-native-linear-gradient';
import { fontFamily } from '../../../utils/functions';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { CALL_END, END_CALL_NOT_SHOW_CLOSESCREEN } from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertBox from '../../../components/modals/AlertBox';
import NavigationHelper from '../../../utils/NavigationHelper';
import { Pages } from '../../../navigators/Routes';
import { store } from '../../../store';

const MatchingScreen = () => {
  const Routes = useRoute();

  const navigation = useNavigation<NavigationProp<CallStackParamsList>>();
  const { currentQuery, matchDataLength, matchDataNotFound } = useAppSelector((state) => state.candidates);
  const answerDuration = remoteConfig().getValue('batchTimeDuration').asNumber();
  const userMatchingDuration = remoteConfig().getValue('userMatchingDuration').asNumber();
  const isUnavailableToTesting = remoteConfig().getValue('isUnavailableToTesting').asBoolean();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { meta } = useAppSelector((state) => state.passions);

  const ref = useRef(matchDataLength);

  const [startTime, setStartTime] = useState(moment());
  const [showModalError, setShowModalError] = useState(false);
  ref.current = matchDataLength;

  useEffect(() => {
    setStartTime(moment());
  }, []);

  useEffect(() => {
    const UpdateCallValue = async () => {
      const value = await AsyncStorage.getItem(CALL_END);
      if (!JSON.parse(value)) {
        setTimeout(() => {
          setShowModalError(matchDataNotFound);
        }, 100);
      }
    };
    UpdateCallValue();
  }, [matchDataNotFound]);

  const onGoBack = () => {
    if (currentQuery) {
      dispatch(candidatesActions.searchCandidatesFailure());
      dispatch(candidatesActions.cancelQueryRequest({ id: currentQuery, status: 'closed' }));
    }
    navigation.goBack();
  };

  const onEndCallPress = () => {
    if (currentQuery) {
      dispatch(candidatesActions.searchCandidatesFailure());
      dispatch(candidatesActions.cancelQueryRequest({ id: currentQuery, status: 'unanswered' }));
    }
    navigation.goBack();
  };

  const onPressModal = () => {
    setShowModalError(false);
    if (currentQuery) {
      dispatch(candidatesActions.searchCandidatesFailure());
      dispatch(candidatesActions.cancelQueryRequest({ id: currentQuery, status: 'unanswered' }));
      dispatch(candidatesActions.searchCandidatesToggles({ value: false, errorMessage: null }));
      navigation.goBack();
    }
  };

  useEffect(() => {
    const durationTime = moment.duration(Routes?.params?.NewTime.diff(startTime)).asSeconds();
    if (durationTime > userMatchingDuration) {
      onGoBack();
    }
  }, [Routes?.params?.NewTime]);

  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(async () => {
        if (ref?.current > 0) {
          if (isUnavailableToTesting) {
            dispatch(userActions.getUserRequest());
          }
          await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(false));
          dispatch(candidatesActions.searchCandidatesReSendRequest());
        }
      }, answerDuration * 1000);

      return () => {
        clearInterval(timer);
      };
    }, []),
  );

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: ({ onPress, ...rest }: HeaderBackButtonProps) => <LeftChevronButton {...rest} onPress={onGoBack} tintColor={Colors.white} />,
  //   });
  // }, []);

  const query = meta.query || "Query you've typed in to find an ideal buddy to talk to";

  return (
    <LinearGradient colors={['#4C9AFF', '#2454FF']} style={styles.screen}>
      <SafeAreaView style={styles.screen} edges={['top']}>
        <StatusBar barStyle={'light-content'} />
        <QueryText style={styles.headerText}>“{query}”</QueryText>
        <Image source={require('../../../../assets/images/arrow-up.png')} style={styles.arrowUpImage} />
        <View style={styles.cardContent}>
          <MatchingText style={{ fontSize: fontSize(10), color: Colors.greyish27, fontFamily: fontFamily.rf_semibold }}>
            {'MATCHING'}
            <Dots />
          </MatchingText>
        </View>
        <Radar />
        <Text style={styles.footerText}>{'Now Parla is searching the best available matches for your query. It may take some time.'}</Text>
        <TouchableOpacity style={[styles.addFromButton, { marginTop: hp(10), marginBottom: hp(3) + insets.bottom }]} onPress={onEndCallPress}>
          <Text style={styles.addFromButtonText}>{'End the call'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {showModalError && (
        <AlertBox
          onBackdropPressValue={true}
          isVisible={showModalError}
          btnStyle={{ flexDirection: 'column' }}
          btnContentStyle={{ flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }}
          title="Oops! We did not find a user to answer your question. Please, try changing your request"
          message=""
          buttons={[
            {
              text: `Ok`,
              onPress: onPressModal,
            },
          ]}
        />
      )}
    </LinearGradient>
  );
};

export default MatchingScreen;
