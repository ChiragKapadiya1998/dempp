import { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { useFocusEffect } from '@react-navigation/core';
import remoteConfig from '@react-native-firebase/remote-config';

import styles from './styles';
import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import { RatingProps } from '../../../components/forms/Rating/types';
import { TextInputProps } from '../../../components/forms/TextInput/types';
import { actions as feedbackActions } from '../../../ducks/feedback';
import { actions } from '../../../ducks/user';
import { getSendSlack, getSendSlack12, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { Colors } from '../../../styles';
import { strings } from '../../../utils/string';
import { CommonButtonProps } from '../../../components/common/CommonButton/types';

export default () => {
  const dispatch = useAppDispatch();
  const { call, role } = useAppSelector((state) => state.calls);
  const { data } = useAppSelector((state) => state.user);

  const [impression, setImpression] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [showRating, setShowRating] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const loading = useAppSelector((state) => state.feedback.loading);

  const scale = useRef(new Animated.Value(1)).current;
  const scaleUser = useRef(new Animated.Value(8)).current;
  const headingText = 'Was this a good match?';

  const onChangeRating = (nextRating: number) => {
    setRating(nextRating);
    setTimeout(() => setShowRating(false), 1600);
  };
  const onChangeFeedback = (nextFeedback: string) => setFeedback(nextFeedback);
  const isSubmitButtonDisabled = [
    rating === 0,
    data?.id !== call?.match?.proposedUserId && impression == '',
    remoteConfig().getValue('isfeedbackTextRequired').asBoolean() ? feedback == '' : false,
  ].includes(true);

  const onSubmitButtonPress = () => {
    Keyboard.dismiss();
    const caller = call?.caller;
    const receiver = call?.receiver;
    if (call?.id) {
      const obj1 = {
        title: strings.parla_room_call_feedback,
        data: {
          Qurey: call?.match?.query?.query,
          callerName: caller?.name,
          callerId: caller?.id,
          callerStatus: caller?.status,
          callerPhone: caller?.phone,
          receiverName: receiver?.name,
          receiverId: receiver?.id,
          feedback: feedback.trim(),
          ratingValue: rating,
        },
      };
      getSendSlack(obj1);

      dispatch(
        feedbackActions.createCallFeedbackRequest({
          callId: call?.id?.toString(),
          feedback: feedback.trim(),
          rating,
          isQueryClosed: impression == 'Yes, close the query' ? true : false,
        }),
      );
    }
    // dispatch(actions.updateUserRequest({ availabilityStatus: 'feeling-chatty' }));
  };

  // get star rating props
  const getStarRatingProps = (): RatingProps => ({
    value: rating,
    containerStyle: styles.rating,
    onChange: onChangeRating,
    color: Colors.primary4,
  });

  // get feedback input props
  const getFeedbackInputProps = (): TextInputProps => ({
    containerStyle: styles.feedbackInputContainer,
    style: styles.feedbackInput,
    label: 'Feedback',
    multiline: true,
    onChangeText: onChangeFeedback,
    textAlignVertical: 'top',
    value: feedback,
    labelHidden: true,
    error: '',
  });

  // get submit button props
  const getSubmitButtonProps = (): CommonButtonProps => ({
    containerStyle: [styles.submitButton],
    titleStyle: styles.submitButtonText,
    disabled: isSubmitButtonDisabled,
    onPress: onSubmitButtonPress,
    title: 'Send feedback',
    loading,
  });

  useEffect(() => {
    if (showLogo) {
      Animated.timing(scale, {
        duration: 300,
        useNativeDriver: false,
        toValue: 1,
      }).start();
      Animated.timing(scaleUser, {
        duration: 300,
        useNativeDriver: false,
        toValue: 5,
      }).start();
    } else {
      Animated.timing(scale, {
        duration: 300,
        useNativeDriver: false,
        toValue: 0,
      }).start();
      Animated.timing(scaleUser, {
        duration: 300,
        useNativeDriver: false,
        toValue: 5,
      }).start();
    }
  }, [showLogo]);

  const onFocus = () => {
    setShowLogo(false);
  };
  const onBlur = () => {
    setShowLogo(true);
  };

  const KeyboardController = useCallback(() => {
    if (Platform.OS === 'android') {
      const listenerShow = Keyboard.addListener('keyboardDidHide', () => onBlur());
      const listenerHide = Keyboard.addListener('keyboardDidShow', () => onFocus());
      RNAndroidKeyboardAdjust.setAdjustPan();

      return () => {
        listenerShow.remove();
        listenerHide.remove();
        onBlur();
        RNAndroidKeyboardAdjust.setAdjustResize();
      };
    }
    if (Platform.OS === 'ios') {
      const listenerShow = Keyboard.addListener('keyboardWillHide', () => onBlur());
      const listenerHide = Keyboard.addListener('keyboardWillShow', () => onFocus());

      return () => {
        listenerShow.remove();
        listenerHide.remove();
        onBlur();
      };
    }
  }, []);

  useFocusEffect(KeyboardController);

  return {
    rating,
    showRating,
    headingText,
    showLogo,
    scale,
    scaleUser,
    getStarRatingProps,
    getFeedbackInputProps,
    getSubmitButtonProps,
    impression,
    setImpression,
  };
};
