import { useState, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';

import { ISIOS, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/user';
import styles from './styles';
import { VALIDATION_CODE_LENGTH } from '../../../utils/constants';
import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import NavigationHelper from '../../../utils/NavigationHelper';
import { Colors } from '../../../styles';
import { SettingsStackPages } from '../../../navigators/Routes';
import { SettingsStackParamsList } from '../../../navigators/types';
import { hp } from '../../../styles/metrics';
import { CommonButtonProps } from '../../../components/common/CommonButton/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default () => {
  const navigation = useNavigation<NavigationProp<SettingsStackParamsList>>();

  const [code, setCode] = useState<string>('');
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [requestError, setRequestError] = useState<string>('');
  const [isScreenMounted, setIsScreenMounted] = useState<boolean>(false);
  const [isScreenOtp, setIsScreenOtp] = useState<boolean>(true);
  const inset = useSafeAreaInsets();

  const errors = useAppSelector((state) => state.errors);
  const isModalShown = useAppSelector((state) => state.user.deletingUser.isModalShown);

  useEffect(() => {
    if (!isScreenMounted) setIsScreenMounted(true);
  }, [isScreenMounted]);

  useEffect(() => {
    // Monitor and get new request errors
    if (isScreenMounted && isFocused) {
      setRequestError(errors[errors.length - 1]?.message ?? '');
    }
  }, [errors.length]);

  useEffect(() => {
    // get code right after opening screen
    // dispatch(actions.getCodeToDeleteUserRequest());
  }, []);

  useEffect(() => {
    // hide keyboard if modal has been shown
    if (isModalShown) {
      Keyboard.dismiss();

      // dispatch(actions.deleteUserRequest({ code }));
      // navigation.navigate(SettingsStackPages.DeleteUserFeedScreen);
    }
  }, [isModalShown]);

  useEffect(() => {
    // hide keyboard automatically
    if (code.length === VALIDATION_CODE_LENGTH) {
      Keyboard.dismiss();
    }
  }, [code]);

  const onChangeCode = (text: string) => {
    setRequestError('');
    setCode(text);
  };

  const onResendCode = () => {
    dispatch(actions.regainCodeToDeleteUserRequest());
  };

  const onConfirmPress = () => {
    // dispatch(actions.deleteUserRequest({ code }));
    // navigation.navigate(SettingsStackPages.DeleteUserFeedScreen);
    // NavigationHelper.goToLoginScreen();
  };

  const isConfirmButtonDisabled = code.length !== VALIDATION_CODE_LENGTH || !!requestError;

  const getConfrimButtonProps = (): CommonButtonProps => ({
    containerStyle: [styles.confirmButton, { marginBottom: ISIOS ? inset.bottom : inset.bottom + hp(1.6) }],
    titleStyle: styles.confirmButtonText,
    disabled: isConfirmButtonDisabled,
    onPress: () => dispatch(actions.checkCodeToDeleteUserRequest({ code })),
    title: 'Confirm',
  });

  const onDeleteMyProfile = () => {
    setIsScreenOtp(false);
    dispatch(actions.getCodeToDeleteUserRequest());
  };

  return {
    code,
    getConfrimButtonProps,
    onChangeCode,
    onConfirmPress,
    onResendCode,
    requestError,
    isScreenOtp,
    onDeleteMyProfile,
  };
};
