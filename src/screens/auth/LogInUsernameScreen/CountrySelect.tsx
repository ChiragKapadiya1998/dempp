import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { parsePhoneNumber, CountryCode, getPhoneCode, E164Number } from 'libphonenumber-js';
import { getName, getCodes } from 'country-list';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { ValueType } from 'react-native-dropdown-picker';
// @ts-ignore
import CarrierInfo from 'react-native-carrier-info';

import { actions } from '../../../ducks/auth';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import requestErrors from '../../../utils/requestErrors';
import { Pages } from '../../../navigators/Routes';
import { ScreenNavigationProps } from './types';
import FlatButton from '../../../components/forms/FlatButton';
import AlternativeActionText from '../../../components/auth/AlternativeActionText';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import ShadedView from '../../../components/common/ShadedView';
import CountryPicker from '../../../components/auth/CountryPicker';
import { Colors } from '../../../styles';
import styles from './styles';
import SvgIcon from '../../../components/common/SvgIcon';
import { fontSize, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export const contryNameKeys = getCodes()
  .filter((item) => getName(item))
  .map((item) => (getName(item) ? { label: getName(item), value: item } : { label: 'Unknown', value: item }));

const CountrySelect = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { isLoginCodeFetching, err } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);
  const [validNumber, setValidNumber] = useState<E164Number | null>(null);

  const onChangePhone = (text: string) => {
    setPhoneNumber(text);
    setError(null);
  };

  const onLoginPress = () => {
    if (!validNumber) {
      setError('Incorrect phone number');
    } else {
      Keyboard.dismiss();
      dispatch(actions.getLoginCodeRequest({ username: validNumber }));
    }
  };

  const onPressSignUp = () => {
    navigation.push(Pages.SignUpPhoneScreen);
  };

  useEffect(Keyboard.dismiss, [open]);

  useEffect(() => {
    if (!value) return;
    try {
      const phoneData = parsePhoneNumber(phoneNumber, value as CountryCode);
      const isValid = phoneData.isValid();
      if (isValid) setValidNumber(phoneData.number);
      else {
        setValidNumber(null);
      }
    } catch (err) {
      setValidNumber(null);
      console.warn(err);
    }
  }, [phoneNumber, value]);

  // useEffect(() => {
  //   CarrierInfo.isoCountryCode().then((result: string) => result && setValue(result.toUpperCase() as CountryCode));
  // }, []);

  useFocusEffect(
    useCallback(() => {
      if (err) {
        const findError = requestErrors.find((rError) => rError.code === err);
        setError(findError ? findError.message : err);
        dispatch(actions.clearError());
      }
    }, [err]),
  );

  return (
    <ShadedView style={styles.contentContainer}>
      <CountryPicker
        open={open}
        value={value}
        items={contryNameKeys.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0))}
        setOpen={setOpen}
        setValue={setValue}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.textContainer}>
          <Text style={value ? styles.blackText : styles.greyText}>
            {value ? `+${value !== 'AQ' ? getPhoneCode(value as CountryCode) : 672}` : 'Code'}
          </Text>
        </View>
        <TextInput
          value={phoneNumber}
          onChangeText={onChangePhone}
          placeholderTextColor={Colors.greyish4}
          style={[styles.inputContainer, { borderColor: error ? Colors.destructive4 : Colors.greyish11 }]}
          placeholder="Phone number"
          keyboardType="numeric"
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.errorMessageContent}>
          {error && (
            <>
              <SvgIcon height={wp(3.85)} name={'alert'} color={Colors.destructive4} />
              <Text style={styles.errorMessage}>{error ?? ''}</Text>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <FlatButton
        title="Login"
        onPress={onLoginPress}
        variant="solid1"
        disabled={!validNumber || isLoginCodeFetching || loading}
        loading={isLoginCodeFetching || loading}
        containerStyle={{ backgroundColor: !validNumber || isLoginCodeFetching || loading ? Colors.greyish31 : Colors.primary4 }}
        titleStyle={{ fontFamily: fontFamily.rf_semibold, fontSize: fontSize(15) }}
      />
      <AlternativeActionText
        highlightedText="Sign Up"
        onPress={onPressSignUp}
        regularText="Don't have an account?"
        style={styles.alternativeActionText}
      />
    </ShadedView>
  );
};

export default CountrySelect;
