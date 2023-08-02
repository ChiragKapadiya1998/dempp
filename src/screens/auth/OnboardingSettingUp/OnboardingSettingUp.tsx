import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import FlatButton from '../../../components/forms/FlatButton';
import { hp, wp } from '../../../styles/metrics';
import styles from './styles';
import SvgIcon from '../../../components/common/SvgIcon';
import { Colors } from '../../../styles';
import UserSelectImg from './components/UserSelectImg';
import PassionsCategories from './components/PassionsCategories';
import NavigationHelper from '../../../utils/NavigationHelper';
import { ISIOS, useAppDispatch, useAppSelector, useBackHandler } from '../../../utils/hooks';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import { actions as authActions } from '../../../ducks/auth';
import { Status as RecorderPlayerStatus } from '../../../components/common/AudioRecorderPlayer/types';
import { appStartInfoData } from '../../../utils/reportReasons';
import { actions as passionsActions } from '../../../ducks/passions';
import requestErrors from '../../../utils/requestErrors';
import AudioPlayer from './components/AudioPlayer';
import { Passion } from '../SetUpProfilePassionsScreen/types';
import FlatButtonIcon from '../../../components/common/FlatButtonIcon';
import { fontFamily } from '../../../utils/functions';
import { Pages } from '../../../navigators/Routes';
import { IS_IOS } from '../../../utils/constants';

const OnboardingSettingUp = () => {
  const route = useRoute();
  const { username } = useAppSelector((state) => state.token);
  const { navigate, goBack } = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullname, setFullName] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [disabled, setDisabled] = useState(true);
  const [passionsValue, setPassionsValue] = useState(0);
  const [showToastMessage, setShowToastMessage] = useState(false);

  const [profileAudio, setProfileAudio] = useState<string>('');
  const [profileAudioDuration, setProfileAudioDuration] = useState<number>(0); // secs
  const [recorderPlayerStatus, setRecorderPlayerState] = useState<RecorderPlayerStatus>(RecorderPlayerStatus.Idle);
  const [error, setError] = useState<null | string>(null);

  const min = remoteConfig().getValue('knowHowsMin').asNumber();
  const maxDuration = remoteConfig().getValue('taglineAudioDuration').asNumber() / 60;
  const isAudioTagRequired = remoteConfig().getValue('isAudioTagRequired').asBoolean();
  const isProfileRequired = remoteConfig().getValue('isAvatarRequired').asBoolean();

  const dispatch = useAppDispatch();
  const { bottom } = useSafeAreaInsets();

  const { categories, loading: passionsLoading } = useAppSelector((state) => state.passions);
  const { err, isUserNewProfileSetting } = useAppSelector((state) => state.auth);
  const { loading, data: user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const arrayOfPassionsLength = categories.map((item) => item.passions.filter((item) => item.selected).length);
    const passionsLength = arrayOfPassionsLength.length ? arrayOfPassionsLength.reduce((a, b) => a + b) : arrayOfPassionsLength.length;

    setPassionsValue(passionsLength);

    const isNotEnough = passionsLength < min;
    setDisabled(isNotEnough);
    setError(!isNotEnough ? null : `Please select at least ${min} know hows.`);
  }, [categories]);

  useFocusEffect(
    useCallback(() => {
      if (err) {
        const findError = requestErrors.find((rError) => rError.code === err);
        setError(findError ? findError.message : err);
        dispatch(authActions.clearError());
      }
    }, [err]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(passionsActions.toggleEditPassions(true));
    }, []),
  );

  const isSubmitButtonDisabled = [
    profileAudio == null,
    profileAudioDuration == 0,
    recorderPlayerStatus === RecorderPlayerStatus.Recording,
    recorderPlayerStatus === RecorderPlayerStatus.Playing,
  ].includes(true);

  const onNextPress = () => {
    if (activeIndex >= 0) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const onSavePress = () => {
    const payload: {
      fullName: string;
      tagline: string;
      profileImage?: string | undefined;
      profileAudio: string;
      profileAudioDuration: number;
      passions: Passion[];
      isProfileFilled: boolean;
      isOnBoardingFinished: boolean;
    } = {
      fullName: fullname.trim(),
      tagline: aboutText,
      profileAudio,
      profileAudioDuration,
      passions: categories.map((item) => item.passions.filter((item) => item.selected)).flat(),
      isProfileFilled: true,
      isOnBoardingFinished: true,
    };

    if (profileImage) payload.profileImage = profileImage;
    dispatch(authActions.setUserProfileRequest(payload));
  };
  const onBackPress = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      activeIndex === 3 && dispatch(passionsActions.getPassionCategoryRequest());
    } else {
      if (!user?.username) {
        NavigationHelper.goToSetupProfileScreen();
      } else {
        NavigationHelper.goToHomeScreen();
      }
      // navigate.goBack();
    }
  };

  setTimeout(() => {
    setShowToastMessage(false);
  }, 800);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
    });

    return () => backHandler.remove();
  }, [activeIndex]);

  const getMaxDuration = () => {
    if (maxDuration === 1) return `${maxDuration} min`;
    else if (maxDuration < 1) return `${maxDuration} sec`;
    else if (maxDuration > 1) return `${maxDuration} min`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {Platform.OS == 'ios' && (
          <TouchableOpacity onPress={onBackPress}>
            <SvgIcon name="dropDownArrow" height={11.5} color={Colors.greyish3} style={{ transform: [{ rotate: '90deg' }] }} />
          </TouchableOpacity>
        )}
        <View style={styles.headerDot}>
          {appStartInfoData.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dotContent,
                  {
                    backgroundColor: index == activeIndex ? item.color : Colors.primary4,
                    width: index == activeIndex ? wp(7.2) : wp(2.5),
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      {activeIndex == 0 && (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, marginBottom: ISIOS ? hp(3.5) : hp(6) }}>
          <View style={[styles.content, { flex: 1 }]}>
            <Text style={styles.chooseText}>{'What’s your full\n name?'}</Text>
            <TextInput
              keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
              placeholder="Full Name"
              style={styles.otherPassionInput}
              onChangeText={setFullName}
              value={fullname}
            />
          </View>
          <FlatButtonIcon
            isLinearGradient={false}
            title={'Next'}
            disabled={fullname.length < 3 || fullname == ''}
            containerStyle={[styles.containerStyle, { backgroundColor: fullname.length < 3 || fullname == '' ? Colors.greyish26 : Colors.primary4 }]}
            onPress={onNextPress}
          />
        </KeyboardAvoidingView>
      )}
      {activeIndex == 1 && (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, marginBottom: ISIOS ? hp(3.5) : hp(6) }}>
          <View style={[styles.content, { flex: 1 }]}>
            <Text style={[styles.chooseText]}>{'Tell community a \nfew words about yourself'}</Text>
            <ScrollView>
              <TextInput
                placeholder={'High-school science professor. Expert in general science and chemistry.'}
                style={[styles.otherPassionInput, { maxHeight: hp(13), minHeight: IS_IOS ? 0 : hp(7.2) }]}
                onChangeText={setAboutText}
                value={aboutText}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={1}
                placeholderTextColor={Colors.greyish3}
                keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
              />
            </ScrollView>
          </View>
          <FlatButtonIcon
            isLinearGradient={false}
            title={'Next'}
            disabled={aboutText == ''}
            containerStyle={[styles.containerStyle, { backgroundColor: aboutText == '' ? Colors.greyish26 : Colors.primary4 }]}
            onPress={onNextPress}
          />
          {/* <FlatButton
            disabled={aboutText == ''}
            title={'Next'}
            onPress={onNextPress}
            rightIcon={'right-arrow-icon'}
            iconColor={Colors.white}
            variant={'solid1'}
            loading={false}
            iconHeight={15}
            containerStyle={[styles.submitButton, { backgroundColor: aboutText == '' ? Colors.greyish2 : Colors.primary4, marginTop: hp(6) }]}
            titleStyle={{ marginRight: wp(3), textAlign: 'center' }}
          /> */}
        </KeyboardAvoidingView>
      )}
      {/* {activeIndex == 2 && (
        <>
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <Text style={[styles.chooseText, { marginHorizontal: 15, marginBottom: hp(4) }]}>{'Voice introduction is\n always better!'}</Text>
              <Text
                style={[styles.chooseSubText]}
              >{`If you missed something in a tagline,\n you can add a few words here.\n(${getMaxDuration()} maximum)`}</Text>
              <AudioPlayer
                setProfileAudioDuration={setProfileAudioDuration}
                setProfileAudio={setProfileAudio}
                isa={profileAudio}
                iscount={profileAudioDuration}
                setRecorderPlayerState={setRecorderPlayerState}
              />
            </View>
          </View>
          <FlatButton
            disabled={isSubmitButtonDisabled}
            title={'Next'}
            onPress={onNextPress}
            rightIcon={'right-arrow-icon'}
            iconColor={Colors.white}
            variant={'solid1'}
            loading={false}
            iconHeight={15}
            containerStyle={[
              styles.submitButton,
              {
                backgroundColor: isSubmitButtonDisabled ? Colors.greyish2 : Colors.primary4,
                marginTop: hp(6),
              },
            ]}
            titleStyle={{ marginRight: wp(3), textAlign: 'center' }}
          />
        </>
      )} */}
      {activeIndex == 2 && (
        <>
          <View style={{ flex: 1 }}>
            <View style={[styles.content, { marginTop: hp(13) }]}>
              <Text style={[styles.chooseText, { marginBottom: hp(1.9) }]}>{'Add a photo'}</Text>
              <Text style={[styles.chooseSubText]}>{'Photo of you will make a conversation\nmore friendly'}</Text>
              <View style={{ alignItems: 'center', marginTop: hp(4.5) }}>
                <UserSelectImg setProfileImage={setProfileImage} uri={profileImage} />
              </View>
            </View>
          </View>
          {/* <FlatButton
            disabled={profileImage == ''}
            title={'Next'}
            onPress={onNextPress}
            rightIcon={'right-arrow-icon'}
            iconColor={Colors.white}
            variant={'solid1'}
            loading={false}
            iconHeight={15}
            containerStyle={[styles.submitButton, { backgroundColor: profileImage == '' ? Colors.greyish3 : Colors.primary4, marginTop: hp(6) }]}
            titleStyle={{ marginRight: wp(3), textAlign: 'center', color: Colors.white }}
          /> */}
          <FlatButtonIcon
            isLinearGradient={false}
            title={'Next'}
            disabled={profileImage == ''}
            containerStyle={[styles.containerStyle, { backgroundColor: profileImage == '' ? Colors.greyish26 : Colors.primary4 }]}
            onPress={onNextPress}
          />
        </>
      )}

      {activeIndex == 3 && (
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View>
              <View style={[styles.content, { marginTop: hp(3) }]}>
                <Text style={[styles.chooseText, { marginHorizontal: 15, marginBottom: hp(1.3) }]}>{'Almost done!'}</Text>
                <Text style={[styles.chooseSubText]}>{`Select at least ${remoteConfig()
                  .getValue('knowHowsMin')
                  .asNumber()} know-hows that you \ncan talk about`}</Text>
              </View>
              <View style={styles.catagoriesContainer}>
                <PassionsCategories
                  onPreesShow={(data) => {
                    setShowToastMessage(data);
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          {showToastMessage && (
            <View
              style={{
                backgroundColor: Colors.greyish18,
                // position: 'absolute',
                bottom: hp(0),
                height: hp(4),
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 20,
                  color: Colors.white,
                }}
              >
                {'tag already exists!'}
              </Text>
            </View>
          )}
          <View style={error ? styles.footerContentSave : { paddingBottom: ISIOS ? hp(4) : hp(7) }}>
            {error ? (
              <ErrorMessage containerStyle={styles.errorMessage} showIcon={true}>
                {error}
              </ErrorMessage>
            ) : null}
            <FlatButton
              title={'Save'}
              disabled={disabled || isUserNewProfileSetting}
              onPress={onSavePress}
              variant={'solid1'}
              loading={isUserNewProfileSetting}
              iconHeight={15}
              containerStyle={[styles.submitButton, { marginTop: hp(1), backgroundColor: passionsValue < 5 ? Colors.greyish26 : Colors.primary4 }]}
              titleStyle={{ marginRight: wp(3), textAlign: 'center', fontFamily: fontFamily.rf_medium }}
            />
          </View>
        </View>
      )}
      {/* {(activeIndex == 3 || activeIndex == 2) && (!isProfileRequired || !isAudioTagRequired) && (
        <TouchableOpacity style={[styles.footerContent, { marginTop: hp(2) }]} onPress={onNextPress}>
          <Text style={styles.footerText}>I'll do it later</Text>
          <SvgIcon name="dropDownArrow" height={hp(0.7)} style={{ transform: [{ rotate: '-90deg' }] }} />
        </TouchableOpacity>
      )} */}
      {activeIndex == 2 && !isProfileRequired && (
        <TouchableOpacity style={[styles.footerContent, { marginTop: hp(2), marginBottom: hp(8) }]} onPress={onNextPress}>
          <Text style={styles.footerText}>I'll do it later</Text>
          <SvgIcon name="dropDownArrow" height={hp(0.7)} style={{ transform: [{ rotate: '-90deg' }] }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default OnboardingSettingUp;
