import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash'

import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import { FormData } from './types';
import { MAX_LENGTH_TEXT_INPUT } from '../../../utils/constants';
import { TextInputProps } from '../../../components/forms/TextInput/types';
import { logInSchema } from '../../../utils/yupSchemas';
import { selectors as errorsSelector } from '../../../ducks/errors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as authActions } from '../../../ducks/auth';

export default () => {
  const [isScreenMounted, setIsScreenMounted] = useState<boolean>(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const errors = useAppSelector(errorsSelector.getErrors);
  const isFocused = useIsFocused();
  const isLoading = useAppSelector((state) => state.auth.isLoginCodeFetching);

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
    resolver: yupResolver(logInSchema),
    mode: 'onSubmit',
  });

  const isRequestError = !!requestError;
  const isUsernameError = !!formErrors.username?.message;
  const isPasswordError = !!formErrors.password?.message;
  const isUsernameIncorrect = !!formErrors.username;
  const isPasswordIncorrect = !!formErrors.password;

  // Submit button state
  const isGetCodeButtonDisabled = [isUsernameIncorrect, isUsernameEmpty, isPasswordIncorrect, isRequestError].includes(true);

  // Error message
  let errorMessage = '';
  if (isUsernameError) errorMessage = formErrors.username?.message ?? '';
  else if (isPasswordError) errorMessage = formErrors.password?.message ?? '';
  else if (isRequestError) errorMessage = requestError ?? '';

  // Registrate a new user
  const onPressSubmitButton = (data: FormData) => {
    Keyboard.dismiss();
    dispatch(
      authActions.getLoginCodeRequest({
        username: data.username.trim(),
      }),
    );
  };

  // Get rid of request error if phone number has been changed
  const onChangeUsernameMiddleware = (onChangeText: (text: string) => void) => (nextText: string) => {
    onChangeText(nextText);
    setIsUsernameEmpty(_.isEmpty(nextText));
    setRequestError(null);
  };

  // Get username input props
  const getUsernameInputProps = ({
    onChange,
    onBlur,
    value,
  }: {
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
  }): TextInputProps => ({
    autoCapitalize: 'none' as const,
    label: 'Phone number or Username',
    maxLength: MAX_LENGTH_TEXT_INPUT,
    onBlur,
    onChangeText: onChangeUsernameMiddleware(onChange),
    value: value ?? '',
    textContentType: 'nickname',
    autoCompleteType: 'username',
  });

  // Get submit button props
  const getSubmitButtonProps = (): FlatButtonProps => ({
    disabled: isGetCodeButtonDisabled,
    loading: isLoading,
    onPress: handleSubmit(onPressSubmitButton),
    title: 'Log In',
    variant: 'solid1' as const,
  });

  return {
    control,
    errorMessage,
    getSubmitButtonProps,
    getUsernameInputProps,
  };
};
