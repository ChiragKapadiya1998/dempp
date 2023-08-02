import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View, ScrollView, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import rnAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { useFocusEffect } from '@react-navigation/core';
import { fontFamily } from '../../../utils/functions';

import { FeedbackOptions } from '../../../ducks/user/types';
import { actions } from '../../../ducks/feedback';
import { InSetsValue, ISIOS, useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import SvgIcon from '../../../components/common/SvgIcon';
import FlatButton from '../../../components/forms/FlatButton';
// import TextInput from '../../../components/forms/TextInput';
import OptionItem from './components/OptionItem';
import styles from './styles';

import { MainTitleContainer, QuestionText, RequiredText } from './styled';
import { Colors } from '../../../styles';
import FlatButtonIcon from '../../../components/common/FlatButtonIcon';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SettingsStackParamsList } from '../../../navigators/types';
import { Pages } from '../../../navigators/Routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const options: { key: FeedbackOptions; label: string }[] = [
  { key: 'very-disappointed', label: 'Very disappointed' },
  { key: 'somewhat-disappointed', label: 'Somewhat disappointed' },
  { key: 'not-disappointed', label: 'Not disappointed' },
  { key: 'not-sure', label: 'Not sure yet' },
];

const FeedbackScreen = () => {
  const [feedback, setFeedBack] = useState<string>('');
  const [impression, setImpression] = useState<string>('');
  const [showInputSection, setShowInputSection] = useState<boolean>(false);
  const { success, loading } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { isKeyboardHows } = useKeyboard();
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProp<SettingsStackParamsList>>();

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
    dispatch(actions.applicationFeedbackRequest({ impression, feedback }));
  };

  if (success) {
    navigation.navigate(Pages.FeedbackSant);
    // return (
    //   <View style={[styles.container, styles.TYContiner]}>
    //     {/* <SvgIcon name="thank-you" height={308} style={styles.icon} /> */}
    //     <Image source={require('../../../assets/updatedIcon.png')} style={styles.TYImage} resizeMode="contain" />

    //     <Text style={styles.title}>{'Feedback sent!'}</Text>
    //     {/* <Text style={styles.TYDescription}>Your feedback valuable for us!</Text> */}
    //   </View>
    // );
  }

  if (showInputSection) {
    return (
      <View style={{ flex: 1, paddingTop: 22, backgroundColor: Colors.secondary5 }}>
        {isKeyboardHows ? (
          <MainTitleContainer>
            <View>
              <Text style={styles.inputSectionTitle}>{'Improve\nParlapp with\nyour feedback'}</Text>
              <SvgIcon name="feedback-tagline" height={14} />
            </View>
            <SvgIcon name="feedback-survey" height={83} />
          </MainTitleContainer>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <SvgIcon name="feedback-survey" height={143} />
            <Text style={styles.title}>{'Improve Parlapp with\nyour feedback'}</Text>
            <SvgIcon name="feedback-tagline" height={14} />
          </View>
        )}
        <View style={styles.contentContainer}>
          <KeyboardAvoidingView behavior="height" style={{ flexGrow: 1 }}>
            <KeyboardAwareScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={{ flexGrow: isKeyboardHows ? 0 : 1 }}
            >
              <View style={{ flex: 1 }}>
                <QuestionText style={{ color: Colors.accent19, fontWeight: '500', fontFamily: fontFamily.rf_medium }}>
                  {'How can we improve Parla for you?'}
                </QuestionText>
                <TextInput
                  style={[styles.feedbackInput]}
                  placeholder={'Your suggestion'}
                  multiline
                  numberOfLines={1}
                  onChangeText={setFeedBack}
                  // textAlignVertical={'top'}
                  value={feedback}
                  placeholderTextColor={Colors.greyish26}
                  keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
                />
              </View>
              <FlatButton
                disabled={!feedback.length}
                loading={loading}
                title={'Send feedback'}
                variant={'solid2'}
                containerStyle={[
                  styles.nextButton,
                  { backgroundColor: feedback.length ? Colors.primary4 : Colors.greyish3, marginBottom: insets.bottom + wp(6.4) },
                ]}
                onPress={onRateApp}
              />
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SvgIcon name="feedback-survey" height={143} />
      <Text style={styles.title}>{'Improve Parlapp with\nyour feedback'}</Text>
      <SvgIcon name="feedback-tagline" height={14} color={Colors.primary4} />

      <View style={styles.contentContainer}>
        <ScrollView>
          <QuestionText style={{ color: Colors.accent19, fontFamily: fontFamily.rf_medium, fontSize: fontSize(15), letterSpacing: -0.3 }}>
            {'How would you feel if you could no\nlonger use Parla?'}
            {/* <RequiredText>*</RequiredText> */}
          </QuestionText>
          {options.map((item, key) => (
            <OptionItem key={key} isSelected={item.key === impression} title={item.label} onPress={() => setImpression(item.key)} />
          ))}
          {/* {!impression ? (
            <FlatButton
              disabled={!impression.length}
              loading={false}
              title={'Send feedback'}
              variant={'solid2'}
              containerStyle={styles.nextButton}
              onPress={() => setShowInputSection(true)}
            />
          ) : ( */}
          <FlatButtonIcon
            isLinearGradient={false}
            title={'Next'}
            containerStyle={{
              marginHorizontal: wp(0),
              backgroundColor: !impression.length ? Colors.greyish26 : Colors.primary4,
              marginTop: hp(2.5),
              paddingVertical: hp(2.3),
            }}
            onPress={() => setShowInputSection(true)}
          />
          {/* )} */}
        </ScrollView>
      </View>
    </View>
  );
};

export default FeedbackScreen;
