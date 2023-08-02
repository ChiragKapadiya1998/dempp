import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { getPhoneCode, CountryCode, E164Number, parsePhoneNumber } from 'libphonenumber-js';
import { ValueType } from 'react-native-dropdown-picker';
// @ts-ignore
import CarrierInfo from 'react-native-carrier-info';

import { actions } from '../../../ducks/auth';
import { ScreenNavigationProps } from './types';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { contryNameKeys } from '../LogInUsernameScreen/CountrySelect';
import { Pages } from '../../../navigators/Routes';
import requestErrors from '../../../utils/requestErrors';
import AlternativeActionText from '../../../components/auth/AlternativeActionText';
import FlatButton from '../../../components/forms/FlatButton';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import ShadedView from '../../../components/common/ShadedView';
import AuthLogoView from '../../../components/auth/AuthLogoView';
import CountryPicker from '../../../components/auth/CountryPicker';
import { TitleText } from './styled';
import { Colors } from '../../../styles';
import styles from './styles';
import { fontFamily } from '../../../utils/functions';

const SignUpPhoneScreen = (): JSX.Element => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();

  const { isUserRegistrating, err } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);
  const [validNumber, setValidNumber] = useState<E164Number | null>(null);

  const onChangePhone = (text: string) => {
    setPhoneNumber(text);
    setError(null);
  };

  const onRegister = () => {
    if (!validNumber) {
      setError('Incorrect phone number');
    } else {
      Keyboard.dismiss();
      dispatch(actions.getRegistrationCodeRequest({ phoneNumber: validNumber, country: value as CountryCode }));
    }
  };

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

  useEffect(Keyboard.dismiss, [open]);

  const onPressLogIn = () => {
    navigation.navigate(Pages.LogInUsernameScreen);
  };

  return (
    <AuthLogoView backgroundColor={Colors.white}>
      <ShadedView style={styles.contentContainer}>
        <TitleText style={{ fontFamily: fontFamily.rf_regular }}>{'Enter the phone number to get unique\ncode to create an account.'}</TitleText>
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
            style={styles.inputContainer}
            placeholder={'Phone number'}
            keyboardType={'numeric'}
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ErrorMessage showIcon containerStyle={styles.errorMessage} iconStyle={{ marginTop: 5 }}>
              {error ?? ''}
            </ErrorMessage>
          </View>
        </TouchableWithoutFeedback>
        <FlatButton
          variant={'solid1'}
          title={'Get code'}
          disabled={isUserRegistrating || !validNumber || loading}
          loading={isUserRegistrating || loading}
          onPress={onRegister}
          containerStyle={[
            styles.registerButton,
            { backgroundColor: isUserRegistrating || !validNumber || loading ? Colors.greyish31 : Colors.primary4 },
          ]}
          titleStyle={{ fontFamily: fontFamily.rf_bold }}
        />
        <AlternativeActionText
          highlightedText={'Log In'}
          onPress={onPressLogIn}
          regularText={'Already have an account?'}
          style={styles.alternativeActionText}
        />
      </ShadedView>
    </AuthLogoView>
  );
};

export default SignUpPhoneScreen;
