import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View, ScrollView, SafeAreaView, TouchableWithoutFeedback, Alert } from 'react-native';
import rnAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { useFocusEffect } from '@react-navigation/core';

import { FeedbackOptions } from '../../../ducks/user/types';
import { actions } from '../../../ducks/feedback';
import { useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import SvgIcon from '../../../components/common/SvgIcon';
import FlatButton from '../../../components/forms/FlatButton';
import TextInput from '../../../components/forms/TextInput';
import OptionItem from './components/OptionItem';
import styles from './styles';
import StarRating from '../../../components/forms/Rating';

import { MainTitleContainer, QuestionText, RequiredText } from './styled';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { RatingProps } from '../../../components/forms/Rating/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationHelper from '../../../utils/NavigationHelper';
import { actions as authActions } from '../../../ducks/auth';
import { fontFamily } from '../../../utils/functions';
import { RootStackParamList } from '../../../navigators/types';
import { Pages } from '../../../navigators/Routes';

const options: { key: FeedbackOptions; label: string }[] = [
  { key: 'very-disappointed', label: 'Very disappointed' },
  { key: 'somewhat-disappointed', label: 'Somewhat disappointed' },
  { key: 'not-disappointed', label: 'Not disappointed' },
  { key: 'not-sure', label: 'Not sure yet' },
];

const FeedbackScreen = () => {
  const { isKeyboardHows } = useKeyboard();

  const [feedback, setFeedBack] = useState<string>('');
  const [impression, setImpression] = useState<string>('');
  const [showInputSection, setShowInputSection] = useState<boolean>(false);
  const { success, loading } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      // rnAndroidKeyboardAdjust.setAdjustNothing();

      return () => {
        setFeedBack('');
        setImpression('');
        setShowInputSection(false);
        dispatch(actions.dropFeedbackState());
        // rnAndroidKeyboardAdjust.setAdjustPan();
      };
    }, []),
  );

  const onRateApp = () => {
    Keyboard.dismiss();
    NavigationHelper.navigate<RootStackParamList, Pages.OnboardingScreen>(Pages.OnboardingScreen);
    dispatch(authActions.logout());
    // dispatch(actions.applicationFeedbackRequest({ impression, feedback }));
  };

  const onChangeRating = (nextRating: number) => {
    setRating(nextRating);
  };
  const getStarRatingProps = (): RatingProps => ({
    value: rating,
    containerStyle: styles.rating,
    onChange: onChangeRating,
    color: Colors.primary4,
  });

  return (
    <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <SafeAreaView />

      {!isKeyboardHows ? (
        <>
          <SvgIcon name="feedback-survey" height={150} style={{ marginTop: hp(4) }} />
          <Text style={styles.title}>{'Improve Parlapp with\nyour feedback'}</Text>
          <SvgIcon name="feedback-tagline" height={14} style={{ marginBottom: wp(15) }} />
        </>
      ) : (
        <MainTitleContainer style={{ marginTop: hp(4), marginBottom: wp(10) }}>
          <View>
            <Text style={styles.inputSectionTitle}>{'Improve Parlapp with\nyour feedback'}</Text>
            <SvgIcon name="feedback-tagline" height={14} />
          </View>
          <SvgIcon name="feedback-survey" height={83} />
        </MainTitleContainer>
      )}

      <View style={styles.contentContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
          <QuestionText style={{ fontFamily: fontFamily.rf_medium, fontWeight: '500' }}>{'Please give us your feedback:'}</QuestionText>
          <TextInput
            containerStyle={styles.feedbackInput}
            labelHidden={true}
            label={'Feedback'}
            multiline
            numberOfLines={1}
            onChangeText={setFeedBack}
            textAlignVertical={'top'}
            value={feedback}
          />

          <QuestionText style={{ marginTop: hp(2.5), fontFamily: fontFamily.rf_medium, fontWeight: '500' }}>
            {'Rate your experience with Parlapp:'}
          </QuestionText>
          <StarRating {...getStarRatingProps()} />
          <FlatButton
            disabled={!feedback.length}
            loading={loading}
            title={'Send Feedback'}
            variant={'solid2'}
            containerStyle={[styles.nextButton, { backgroundColor: !feedback.length ? Colors.greyish3 : Colors.primary4, minHeight: hp(5.9) }]}
            onPress={onRateApp}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default FeedbackScreen;
