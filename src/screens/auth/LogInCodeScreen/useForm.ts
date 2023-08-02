import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

import { CodeInputProps } from '../../../components/forms/CodeInput/types';
import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import { VALIDATION_CODE_LENGTH } from '../../../utils/constants';
import { ScreenNavigationProps, ScreenRouteProp } from './types';
import { getErrors } from '../../../ducks/errors/selectors';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as authActions } from '../../../ducks/auth';

export default () => {
  const [code, setCode] = useState<string>('');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isScreenMounted, setIsScreenMounted] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenNavigationProps>();
  const errors = useAppSelector(getErrors);
  const route = useRoute<ScreenRouteProp>();

  const username = route.params?.username ?? '';

  const isUserAuthorizing = useAppSelector((state) => state.auth.isUserAuthorizing);

  const isCodeValid = [code.length === VALIDATION_CODE_LENGTH, !isNaN(+code)].every((cond) => cond);

  const errorMessage = requestError || '';
  const isRequestError = !!requestError;
  const isSubmitButtonDisabled = [!isCodeValid, isRequestError].includes(true);

  useEffect(() => {
    if (!isScreenMounted) setIsScreenMounted(true);
  }, [isScreenMounted]);

  useEffect(() => {
    // Monitor and get new request errors
    if (isScreenMounted && isFocused) {
      setRequestError(errors[errors.length - 1]?.message ?? null);
    }
  }, [errors.length]);

  // Regain code
  const onResendCode = () => {
    dispatch(authActions.regainLoginCodeRequest({ username }));
  };

  // Check code
  const onPressSubmitButton = () => {
    Keyboard.dismiss();
    dispatch(
      authActions.logInRequest({
        code,
        username,
      }),
    );
  };

  // Get rid of request error if phone number has been changed
  const onChangeTextMiddleware = (onChangeText: (text: string) => void) => (nextText: string) => {
    onChangeText(nextText);
    setRequestError(null);
  };

  const onChangePhoneNumber = () => navigation.goBack();
  const onChangeCode = (nextCode: string) => setCode(nextCode);

  // Get code input props
  const getCodeInputProps = (): CodeInputProps => ({
    invalid: !!errorMessage,
    length: VALIDATION_CODE_LENGTH,
    onChangeText: onChangeTextMiddleware(onChangeCode),
    value: code,
  });

  // Get submit button props
  const getSubmitButtonProps = (): FlatButtonProps => ({
    disabled: isSubmitButtonDisabled,
    loading: isUserAuthorizing,
    onPress: onPressSubmitButton,
    title: 'Log in',
    variant: 'solid1' as const,
  });

  return {
    errorMessage,
    getCodeInputProps,
    getSubmitButtonProps,
    onChangePhoneNumber,
    onResendCode,
  };
};
