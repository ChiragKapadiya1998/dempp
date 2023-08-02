import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ValueType } from 'react-native-dropdown-picker';

import styles from './styles';
import { BottomSheetType } from '../../../components/modals/BottomSheet/types';
import { useAppSelector } from '../../../utils/hooks';
import { DropdownProps } from '../../../components/forms/Dropdown/types';
import { TextInputProps } from '../../../components/forms/TextInput/types';
import { FlatButtonProps } from '../../../components/forms/FlatButton/types';
import { actions } from '../../../ducks/calls';
import { Reason } from '../../../utils/reportReasons';
import remoteConfig from '@react-native-firebase/remote-config';
import { Colors } from '../../../styles';

export default () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [reason, setReason] = useState<Reason | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);

  const bottomSheetRef = useRef<BottomSheetType>(null);
  const [requestError, setRequestError] = useState<string>('');
  const [isScreenMounted, setIsScreenMounted] = useState<boolean>(false);
  const [isBottomOpened, setIsBottomOpened] = useState<boolean>(false);

  const errors = useAppSelector((state) => state.errors);
  const { call, report } = useAppSelector((state) => state.calls);
  const { loading } = report;

  useEffect(() => {
    if (!isScreenMounted) setIsScreenMounted(true);
  }, [isScreenMounted]);

  useEffect(() => {
    // Monitor and get new request errors
    if (isScreenMounted && isFocused) {
      setRequestError(errors[errors.length - 1]?.message ?? '');
    }
  }, [errors.length]);

  // TODO: complete
  const onReportPress = () => {
    if (call?.id) {
      dispatch(actions.reportUserRequest({ reason: value?.toString() ?? '', explanation: explanation.trim(), callId: call?.id.toString() }));
    }
  };

  const onChangeExplanation = (text: string) => setExplanation(text);

  const onDropdownPress = () => bottomSheetRef.current?.open();

  const onChangeBottomSheetStatus = (isOpened: boolean) => setIsBottomOpened(isOpened);

  const onPressReason = (option: { value: string; title: string }) => {
    setReason(option);
    bottomSheetRef.current?.close();
  };

  const isSubmitButtonDisbled = [!value, remoteConfig().getValue('reportDescriptionReuired').asBoolean() ? !explanation : false].includes(true);

  const getDropdownProps = (): DropdownProps => ({
    containerStyle: styles.reasonDropdown,
    onPress: onDropdownPress,
    opened: isBottomOpened,
    placeholder: 'Select the reason for report',
    required: true,
    value: reason?.title ?? '',
  });

  const getInputExplanationProps = (): TextInputProps => ({
    autoCompleteType: 'name',
    containerStyle: styles.explanationInput,
    style: styles.feedbackInput,
    label: 'What happened',
    multiline: true,
    labelHidden: true,
    onChangeText: onChangeExplanation,
    textAlignVertical: 'top',
    textContentType: 'name',
    value: explanation,
  });

  const getSubmitButtonProps = (): FlatButtonProps => ({
    disabled: isSubmitButtonDisbled,
    onPress: onReportPress,
    title: 'Report',
    variant: 'solid2',
    loading,
    containerStyle: [styles.submitButton, { backgroundColor: isSubmitButtonDisbled ? Colors.greyish3 : Colors.primary4 }],
  });

  return {
    bottomSheetRef,
    getDropdownProps,
    getInputExplanationProps,
    getSubmitButtonProps,
    onChangeBottomSheetStatus,
    onPressReason,
    reason,
    requestError,
    setReason,
    open,
    setOpen,
    value,
    setValue,
  };
};
