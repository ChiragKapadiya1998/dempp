import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';

import useForm from './useForm';
import AudioRecorderPlayer from '../../../components/common/AudioRecorderPlayer';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import FlatButton from '../../../components/forms/FlatButton';
import ProfileImage from './components/ProfileImage';
import Stepper from '../../../components/common/Stepper';
import TextInput from '../../../components/forms/TextInput';
import { wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { Caption, ProfileImageContainer } from './styled';
import styles from './styles';

const SetUpProfileGeneralInfoScreen = (): JSX.Element => {
  const maxDuration = remoteConfig().getValue('taglineAudioDuration').asNumber() / 60;
  const {
    control,
    defaultUsername,
    errorMessage,
    getFullNameInputProps,
    getSubmitButtonProps,
    getTaglineInputProps,
    getUsernameInputProps,
    onChangeRecorderPlayerStatus,
    onOpenCamera,
    onOpenLibrary,
    profileImage,
    isSubmitButtonDisabled,
  } = useForm();

  const getMaxDuration = () => {
    if (maxDuration === 1) return `${maxDuration} minute`;
    else if (maxDuration < 1) return `${maxDuration} seconds`;
    else if (maxDuration > 1) return `${maxDuration} minutes`;
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <Stepper numberOfSteps={2} activeStep={1} containerStyle={styles.stepper} />
        <Caption>General information</Caption>
        <ProfileImageContainer>
          <ProfileImage uri={profileImage} onPress={onOpenCamera} />
          <FlatButton
            title={'Upload profile image'}
            variant={'outline1'}
            iconHeight={wp(6.5)}
            leftIcon={'uploadImg-icon'}
            iconColor={Colors.primary1}
            titleStyle={styles.uploadProfileImageButtonTxt}
            containerStyle={styles.uploadProfileImageButton}
            onPress={onOpenLibrary}
          />
        </ProfileImageContainer>

        <Controller
          control={control}
          defaultValue={defaultUsername ?? ''}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => <TextInput {...getUsernameInputProps({ onChange, onBlur, value })} />}
        />
        <Controller
          control={control}
          defaultValue=""
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => <TextInput {...getFullNameInputProps({ onChange, onBlur, value })} />}
        />
        <Controller
          control={control}
          defaultValue=""
          name="tagline"
          render={({ field: { onChange, onBlur, value } }) => <TextInput {...getTaglineInputProps({ onChange, onBlur, value })} />}
        />
        {errorMessage?.length > 0 ? (
          <ErrorMessage showIcon={true} containerStyle={styles.errorMessage}>
            {errorMessage}
          </ErrorMessage>
        ) : null}
        <AudioRecorderPlayer
          label={`About me and my know-hows (${getMaxDuration()} max)`}
          containerStyle={styles.audioPlayer}
          onChange={onChangeRecorderPlayerStatus}
        />
        <FlatButton
          {...getSubmitButtonProps()}
          containerStyle={[styles.bottonButton, { backgroundColor: isSubmitButtonDisabled ? Colors.greyish3 : Colors.primary4 }]}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SetUpProfileGeneralInfoScreen;
