import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Platform, View, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AvailabilityStatus } from '../../../ducks/user/types';
import { ISIOS, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import SearchInput, { queryInputRef } from '../../../components/common/SearchInput';
import PassionResults from '../../../components/common/PassionResults';
import WhiteErrorModal from '../../../components/modals/WhiteErrorModal';
import { actions } from '../../../ducks/user';
import { actions as pushActions } from '../../../ducks/push';
import { actions as feadbackActions } from '../../../ducks/feedback';
import { actions as messagingActions } from '../../../ducks/messaging';
import { actions as historyActions } from '../../../ducks/history';

import SvgIcon from '../../../components/common/SvgIcon';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HelpUseModal from './components/HelpUseModal';

import FeelingChattyModal from './components/FeelingChattyModal';
import { CallPages, Pages } from '../../../navigators/Routes';

import ModesChattyView from './components/ModesChattyView';
import { store } from '../../../store';
import AlertBox from '../../../components/modals/AlertBox';

const modeColor = (mode: AvailabilityStatus) => {
  switch (mode) {
    case 'sleep':
      return '#F0F1F2';
    case 'feeling-chatty':
      return '#F1F7FF';
    default:
      return Colors.white;
  }
};

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState('');
  const { navigate } = useNavigation();
  const [showLogo, setShowLogo] = useState(true);
  const [addQueryInput, setAddQueryInput] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isSuggestion, setIsSuggestion] = useState(true);
  const [showViewBanner, setShowViewBanner] = useState(false);
  const [maxQueriesLimitReached, setMaxQueriesLimitReached] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const { data, isModesvisible, userQueries, isModesValue } = useAppSelector((state) => state.user);
  const { showNotificationError } = useAppSelector((state) => state.fcm);
  const { isConnected } = useAppSelector((state) => state.netinfo);
  const userQueryLimitValue = remoteConfig().getValue('userQueryLimit').asNumber();

  const dispatch = useAppDispatch();
  const maxQuery = data?.availabilityStatus == 'available' ? true : false;
  const onTexFocus = () => {
    setShowLogo(false);
    setAddQueryInput(true);
    Animated.timing(scale, {
      duration: 300,
      useNativeDriver: false,
      toValue: 0,
    }).start();
    setIsSuggestion(true);
    setShowViewBanner(true);
  };

  useEffect(() => {
    dispatch(feadbackActions.createCallHelpRequest());
    dispatch(historyActions.historyReceviedRequest());
  }, []);

  useEffect(() => {
    dispatch(actions.getUserRequest());
    dispatch(actions.getUserQueriesRequest());
    return () => {};
  }, [isFocused, isConnected]),
    useEffect(() => {
      if (data?.queriesReceivedCount >= data?.maxQueriesPerDay) {
        setMaxQueriesLimitReached(true);
      } else {
        setMaxQueriesLimitReached(false);
      }
    }, [data?.unavailableTo, data?.sleepTimeInHours, isFocused]);

  const onTexBlur = () => {
    setShowLogo(true);
    Animated.timing(scale, {
      duration: 300,
      useNativeDriver: false,
      toValue: searchText?.length === 0 ? 1 : 0,
    }).start();
    queryInputRef?.current?.blur();
    setIsSuggestion(false);
    setShowViewBanner(false);
  };

  const onChange = (text: string) => {
    setSearchText(text);
    if (text == '') {
      setIsSuggestion(false);
      setShowViewBanner(false);
    }
  };

  const onPressModal = () => {
    dispatch(messagingActions.NotificationPermissionHandler(false));
  };

  const onSubmitPress = () => {
    setIsSuggestion(false);
    setShowViewBanner(false);
  };
  useEffect(() => {
    if (searchText?.length > 0) {
      Animated.timing(scale, {
        duration: 300,
        useNativeDriver: false,
        toValue: 0,
      }).start();
    } else {
      Animated.timing(scale, {
        duration: 300,
        useNativeDriver: false,
        toValue: 1,
      }).start();
    }
  }, [searchText]);
  const userQueriesTotal = userQueries?.data?.filter((item) => item.status == 'answered').length;
  const isQueryLeftWarning = userQueriesTotal >= userQueryLimitValue;
  const isSearchBox = data?.isProfileFilled ? true : !isQueryLeftWarning;

  const onPressChattycClick = () => {
    const chagegeValue = {
      isModesvisible: true,
      isModesValue: isModesValue,
    };
    dispatch(actions.userModesPress(chagegeValue));
  };
  return (
    <>
      <View style={[styles.screen, { backgroundColor: modeColor(data?.availabilityStatus || 'available') }]}>
        {!showViewBanner && searchText == '' && data?.availabilityStatus !== undefined && (
          <ModesChattyView
            maxQueriesLimitReached={maxQueriesLimitReached}
            onPress={onPressChattycClick}
            maxQuery={maxQuery}
            sleepTimeHours={data?.unavailableTo}
            availabilityStatus={data?.availabilityStatus}
            containerStyle={{ backgroundColor: !maxQuery ? '#DEE1E6' : '#F1F7FF', marginBottom: data?.isProfileFilled === false ? hp(1.4) : 0 }}
          />
        )}
        {addQueryInput ? (
          <>
            {!showViewBanner && searchText == '' && data?.isProfileFilled === false && userQueries?.total !== undefined && (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigate(Pages.SetUpProfileStack, {
                    screen: Pages.OnboardingSettingUp,
                    initial: false,
                    params: { username: data?.username },
                  });
                }}
              >
                <Animated.View
                  style={[
                    styles.headerContent,
                    {
                      transform: [{ scale }],
                      backgroundColor: !isQueryLeftWarning ? Colors.destructive5 : Colors.primary6,
                      paddingVertical: scale.interpolate({ inputRange: [0, 1], outputRange: [0, hp(2)] }),
                      marginTop: scale.interpolate({ inputRange: [0, 1], outputRange: [0, hp(0)] }),
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    {!isQueryLeftWarning ? (
                      <SvgIcon name={'setUp-notification-icon'} height={wp(6.5)} color={Colors.white} />
                    ) : (
                      <SvgIcon name={'opps-icon'} height={wp(6.5)} color={Colors.white} />
                    )}

                    <Text style={[styles.headerText, { color: !isQueryLeftWarning ? '#FE772E' : '#FF709A' }]}>
                      {!isQueryLeftWarning
                        ? `Set up an account to ask more query \nQueries left - ${Number(userQueryLimitValue - userQueriesTotal) || ''}`
                        : "Oops, you don't have remaining queries.\nSet up an account to continue using\nParlapp"}
                    </Text>
                  </View>

                  <SvgIcon
                    name={'dropDownArrow'}
                    height={wp(2)}
                    style={styles.bodyIcon}
                    color={!isQueryLeftWarning ? Colors.destructive6 : Colors.destructive7}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            )}
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{ scale }],
                  height: scale.interpolate({ inputRange: [0, 1], outputRange: [0, data?.isProfileFilled === false ? hp(24.5) : hp(31.5)] }),
                  paddingTop: scale.interpolate({ inputRange: [0, 1], outputRange: [0, data?.isProfileFilled === false ? hp(11.5) : hp(16.5)] }),
                },
              ]}
            >
              {isConnected ? <SvgIcon name={'parlapp-text-logo'} height={hp(11)} /> : <SvgIcon name={'no-connection-icon'} height={wp(26)} />}
            </Animated.View>
          </>
        ) : null}
        {isSearchBox && (
          <SearchInput
            showLogo={showLogo}
            focused={isSuggestion}
            onCancelPress={() => {
              Animated.timing(scale, {
                duration: 300,
                useNativeDriver: false,
                toValue: 1,
              }).start();
              onChange('');
              queryInputRef?.current?.blur();
            }}
            onSubmitPress={onSubmitPress}
            onChange={(text: string) => onChange(text)}
            onTexFocus={onTexFocus}
            onTexBlur={onTexBlur}
            setAddQueryInput={setAddQueryInput}
          />
        )}
        {isConnected ? (
          showLogo ? (
            isSearchBox && <PassionResults setAddQueryInput={setAddQueryInput} addQueryInput={addQueryInput} />
          ) : (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.emptyView} />
            </TouchableWithoutFeedback>
          )
        ) : (
          <>
            <Text style={styles.connectionTitle}>{showLogo ? 'Connection lost' : ''}</Text>
            <Text style={styles.connectionDesc}>{showLogo ? 'Please check the Internet or WiFi connection to continue using Parla' : ''}</Text>
          </>
        )}
      </View>
      {/* {showLogo && <SearchButton />} */}
      {searchText == '' && (
        <View style={{ backgroundColor: modeColor(data?.availabilityStatus || 'available') }}>
          <TouchableOpacity style={styles.footerContent} onPress={() => setIsVisibleModal(!isVisibleModal)}>
            <Text style={styles.footerText}>Need help to use Parlapp?</Text>
            <View style={styles.footerIcon}>
              <SvgIcon name={'question-icon'} height={wp(2.9)} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <WhiteErrorModal />
      {isVisibleModal && <HelpUseModal isVisibleModal={isVisibleModal} setIsVisibleModal={setIsVisibleModal} />}
      {isModesvisible && <FeelingChattyModal isVisibleModal={isModesvisible} />}
      {showNotificationError && (
        <AlertBox
          onBackdropPressValue={true}
          isVisible={showNotificationError}
          btnStyle={{ flexDirection: 'column' }}
          btnContentStyle={{ flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }}
          title="To use Parlapp, you need to allow notifications"
          message=""
          buttons={[
            {
              text: `Ok`,
              onPress: onPressModal,
            },
          ]}
        />
      )}
    </>
  );
};
export default HomeScreen;

// const onFocus = () => {
//   setShowLogo(false);
// };
// const onBlur = () => {
//   setShowLogo(true);
// };

// const KeyboardController = useCallback(() => {
//   if (Platform.OS === 'android') {
//     const listenerShow = Keyboard.addListener('keyboardDidHide', () => onBlur());
//     const listenerHide = Keyboard.addListener('keyboardDidShow', () => onFocus());
//     RNAndroidKeyboardAdjust.setAdjustPan();

//     return () => {
//       listenerShow.remove();
//       listenerHide.remove();
//       onBlur();
//       RNAndroidKeyboardAdjust.setAdjustResize();
//     };
//   }
//   if (Platform.OS === 'ios') {
//     const listenerShow = Keyboard.addListener('keyboardWillHide', () => onBlur());
//     const listenerHide = Keyboard.addListener('keyboardWillShow', () => onFocus());

//     return () => {
//       listenerShow.remove();
//       listenerHide.remove();
//       onBlur();
//     };
//   }
// }, []);

// useFocusEffect(KeyboardController);
//  <TouchableOpacity
//    onPress={() => {
//      // navigate(Pages.SettingStack);
//      NavigationHelper.navigate<RootStackParamList, Pages.CallStack>(Pages.CallStack, { screen: CallPages.CallFeedbackScreen });
//    }}
//  >
//    <Text>dasdada</Text>
//  </TouchableOpacity>

// <TouchableOpacity
//   onPress={() => {
//     store.dispatch(pushActions.toggleMessagePush(true));
//     store.dispatch(
//       messagingActions.newMessage({
//         ...data,
//         description: 'Black',
//         matchId: 43773,
//         reasonTitle: 'asdas',
//         userName: 'Test253',
//         userTagline: 'Dsaads',
//       }),
//     );
//   }}
// >
//   <Text>dasdada</Text>
// </TouchableOpacity>;
