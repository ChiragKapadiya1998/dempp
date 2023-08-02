import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import styles from './styles';
import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import { FormData } from './types';
import { MAX_LENGTH_TEXT_INPUT } from '../../../utils/constants';
import { TextInputProps } from '../../../components/forms/TextInput/types';
import { setUpProfileSchema } from '../../../utils/yupSchemas';
import { useAppSelector, useImagePicker } from '../../../utils/hooks';
import { actions as authActions, selectors as authSelectors } from '../../../ducks/auth';
import { Status as RecorderPlayerStatus, AudioRecorderPlayerProps } from '../../../components/common/AudioRecorderPlayer/types';
import imagePickerOptions from '../../../utils/imagePickerOptions';
import remoteConfig from '@react-native-firebase/remote-config';

export default () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isLoading = useAppSelector(authSelectors.getIsUsernameUnicityChecking);
  const defaultUsername = useAppSelector((state) => state.token.username);

  const [isScreenMounted, setIsScreenMounted] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [requestError, setRequestError] = useState<string | null>(null);
  const errors = useAppSelector((state) => state.errors);

  const [recorderPlayerStatus, setRecorderPlayerState] = useState<RecorderPlayerStatus>(RecorderPlayerStatus.Idle);

  const [profileAudio, setProfileAudio] = useState<string>('');
  const [profileAudioDuration, setProfileAudioDuration] = useState<number>(0); // secs
  const [profileImage, setProfileImage] = useState<string>('');

  const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(false);
  const [isFullNameEmpty, setIsFullNameEmpty] = useState<boolean>(true);
  const [isTaglineEmpty, setIsTaglineEmpty] = useState<boolean>(true);

  useEffect(() => {
    if (!isScreenMounted) setIsScreenMounted(true);
  }, [isScreenMounted]);

  useEffect(() => {
    // Monitor and get new request errors
    if (isScreenMounted && isFocused) {
      setRequestError(errors[errors.length - 1]?.message ?? null);
    }
  }, [errors.length]);

  // Form hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    resolver: yupResolver(setUpProfileSchema),
    mode: 'onSubmit',
  });

  const { onOpenCamera, onOpenLibrary } = useImagePicker(setProfileImage, imagePickerOptions);

  const isUsernameIncorrect = !!formErrors.username;
  const isFullNameIncorrect = !!formErrors.fullName;
  const isTaglineIncorrect = !!formErrors.tagline;

  const isUsernameError = !!formErrors.username?.message;
  const isFullNameError = !!formErrors.fullName?.message;
  const isTaglineError = !!formErrors.tagline?.message;
  const isRequestError = !!requestError;

  let errorMessage = '';
  if (isUsernameError) {
    errorMessage = formErrors.username?.message ?? '';
  } else if (isFullNameError) {
    errorMessage = formErrors.fullName?.message ?? '';
  } else if (isTaglineError) {
    errorMessage = formErrors.tagline?.message ?? '';
  } else if (isRequestError) errorMessage = requestError ?? '';

  // Submit button state
  const isSubmitButtonDisabled = [
    isUsernameIncorrect,
    isUsernameEmpty,
    isFullNameIncorrect,
    isFullNameEmpty,
    isTaglineIncorrect,
    isTaglineEmpty,
    isRequestError,
    recorderPlayerStatus === RecorderPlayerStatus.Recording,
    recorderPlayerStatus === RecorderPlayerStatus.Playing,
    remoteConfig().getValue('isAudioTagRequired').asBoolean() ? !profileAudio : false,
    remoteConfig().getValue('isAvatarRequired').asBoolean() ? !profileImage : false,
  ].includes(true);

  const onChangeRecorderPlayerStatus: AudioRecorderPlayerProps['onChange'] = (status, path, duration) => {
    setRecorderPlayerState(status);
    setProfileAudio(path ?? '');
    setProfileAudioDuration(duration);
  };

  const onChangeUsernameMiddleware = (onChangeText: (text: string) => void) => (nextText: string) => {
    onChangeText(nextText);
    setIsUsernameEmpty(!nextText);
    setRequestError(null);
  };

  const onChangeFullNameMiddleware = (onChangeText: (text: string) => void) => (nextText: string) => {
    onChangeText(nextText);
    setIsFullNameEmpty(!nextText);
    setRequestError(null);
  };

  const onChangeTaglineMiddleware = (onChangeText: (text: string) => void) => (nextText: string) => {
    onChangeText(nextText);
    setIsTaglineEmpty(!nextText);
    setRequestError(null);
  };

  // Press submit button
  const onPressContinue = (data: FormData) => {
    const payload: {
      username: string;
      fullName: string;
      tagline: string;
      profileImage?: string | undefined;
      profileAudio: string;
      profileAudioDuration: number;
    } = {
      username: data.username,
      fullName: data.fullName,
      tagline: data.tagline,
      profileAudio,
      profileAudioDuration,
    };

    if (profileImage) payload.profileImage = profileImage;
    dispatch(authActions.checkUsernameUnicityRequest(payload));
  };

  const getSubmitButtonProps = (): FlatButtonProps => ({
    title: 'Continue',
    variant: 'solid2',
    disabled: isSubmitButtonDisabled,
    containerStyle: [styles.continueButton, { marginBottom: 16 + insets.bottom }],
    onPress: handleSubmit(onPressContinue),
    loading: isLoading,
  });

  // Get username text input props
  const getUsernameInputProps = ({
    onChange,
    onBlur,
    value,
  }: {
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
  }): TextInputProps => ({
    autoCompleteType: 'password',
    containerStyle: styles.usernameInput,
    label: 'Username',
    maxLength: MAX_LENGTH_TEXT_INPUT,
    onBlur,
    onChangeText: onChangeUsernameMiddleware(onChange),
    textContentType: 'password',
    value: value ?? '',
    required: true,
  });

  // Get full name text input props
  const getFullNameInputProps = ({
    onChange,
    onBlur,
    value,
  }: {
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
  }): TextInputProps => ({
    autoCompleteType: 'name',
    containerStyle: styles.textInput,
    label: 'Full Name',
    maxLength: MAX_LENGTH_TEXT_INPUT,
    onBlur,
    onChangeText: onChangeFullNameMiddleware(onChange),
    required: true,
    textContentType: 'name',
    value: value ?? '',
  });

  // Get tagline text input props
  const getTaglineInputProps = ({
    onChange,
    onBlur,
    value,
  }: {
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
  }): TextInputProps => ({
    autoCompleteType: 'name',
    containerStyle: styles.textInput,
    style: styles.taglineInput,
    label: 'Tagline',
    maxLength: remoteConfig().getValue('taglineLength').asNumber(),
    multiline: true,
    numberOfLines: 4,
    numberRemainingCharactersShown: true,
    onBlur,
    onChangeText: onChangeTaglineMiddleware(onChange),
    required: true,
    textAlignVertical: 'top',
    textContentType: 'name',
    value: value ?? '',
  });

  return {
    control,
    defaultUsername,
    getSubmitButtonProps,
    errorMessage,
    profileImage,
    onOpenCamera,
    onOpenLibrary,
    onChangeRecorderPlayerStatus,
    getUsernameInputProps,
    getFullNameInputProps,
    getTaglineInputProps,
    isSubmitButtonDisabled
  };
};
