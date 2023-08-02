import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import { CountryCode, E164Number, getPhoneCode, parsePhoneNumber } from 'libphonenumber-js';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import { Colors } from '../../../styles';
import { contryNameKeys } from '../../auth/LogInUsernameScreen/CountrySelect';
import FlatButton from '../../../components/forms/FlatButton';
import { useDispatch } from 'react-redux';
// @ts-ignore
import CarrierInfo from 'react-native-carrier-info';
import { useFocusEffect } from '@react-navigation/native';
import { actions } from '../../../ducks/phone';
import { ISIOS, useAppSelector, useKeyboard } from '../../../utils/hooks';
import LinearGradient from 'react-native-linear-gradient';
import SvgIcon from '../../../components/common/SvgIcon';
import { hp, wp } from '../../../styles/metrics';
import NavigationHelper from '../../../utils/NavigationHelper';
import { Pages } from '../../../navigators/Routes';
import FlatButtonIcon from '../../../components/common/FlatButtonIcon';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import TitleSmall from '../../../components/common/TitleSmall';

const NewPhone = () => {
  const dispatch = useDispatch();
  const { err, loading } = useAppSelector((state) => state.phone);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);
  const [validNumber, setValidNumber] = useState<E164Number | null>(null);
  const [country, setCountry] = useState<CountryCode | null>(null);
  const inset = useSafeAreaInsets();
  const { isKeyboardHows, keyboardHeight } = useKeyboard();

  const onSaveNewNumber = () => {
    if (!validNumber || !country) {
      setError('Incorrect phone number');
    } else {
      Keyboard.dismiss();
      dispatch(actions.updatePhoneRequest({ phone: validNumber, country }));
    }
  };

  const onChangePhone = (text: string) => {
    setPhoneNumber(text);
    setError(null);
  };

  useEffect(() => {
    if (!value) return;
    try {
      const phoneData = parsePhoneNumber(phoneNumber, value as CountryCode);
      const isValid = phoneData.isValid();
      if (isValid && phoneData?.country) {
        setValidNumber(phoneData.number);
        setCountry(phoneData.country);
      } else {
        setValidNumber(null);
        setCountry(null);
      }
    } catch (err) {
      setValidNumber(null);
      setCountry(null);
      console.warn(err);
    }
  }, [phoneNumber, value]);

  // useEffect(() => {
  //   CarrierInfo.isoCountryCode().then((result: string) => result && setValue(result.toUpperCase() as CountryCode));
  // }, []);

  useEffect(Keyboard.dismiss, [open]);

  useFocusEffect(
    useCallback(() => {
      if (err) {
        setError(err);
      } else {
        setError(null);
      }
    }, [err]),
  );

  return (
    <KeyboardAvoidingView behavior={ISIOS ? 'height' : 'height'} style={{ flexGrow: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: isKeyboardHows ? (!open ? 0 : 1) : 1 }}
      >
        <TitleSmall style={[styles.titleSmall]}>{'New number'}</TitleSmall>
        <View
          style={[
            styles.cardContent,
            {
              flex: !open ? 0 : 6000,
              borderBottomStartRadius: open ? 0 : 20,
              borderBottomEndRadius: open ? 0 : 20,
            },
          ]}
        >
          <DropDownPicker
            searchable={true}
            itemSeparator={false}
            showTickIcon={false}
            placeholder="Select the country"
            searchPlaceholder={'Enter country name'}
            open={open}
            value={value}
            items={contryNameKeys.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0))}
            setOpen={setOpen}
            setValue={setValue}
            searchPlaceholderTextColor={Colors.greyish4}
            style={styles.containerStyle}
            searchContainerStyle={{ ...styles.containerStyle, padding: 0, margin: 0, borderBottomWidth: 0 }}
            searchTextInputProps={{ style: styles.searchInputContainer }}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            searchTextInputStyle={styles.searchTextInputStyle}
            dropDownContainerStyle={styles.dropDownContainerStyleNew}
            listItemLabelStyle={styles.listItemText}
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.blackText}
            arrowIconStyle={{ tintColor: Colors.primary4, height: wp(6.5) }}
          />
          <View style={styles.appSettingContent}>
            <View style={styles.textContainer}>
              <Text style={value ? styles.blackText : styles.greyText}>
                {value ? `+${value !== 'AQ' ? getPhoneCode(value as CountryCode) : 672}` : 'Code'}
              </Text>
            </View>
            <TextInput
              value={phoneNumber}
              onChangeText={onChangePhone}
              placeholderTextColor={Colors.accent19}
              style={styles.inputContainer}
              placeholder="New phone number"
              keyboardType="numeric"
            />
          </View>
        </View>
        {!open && error ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ marginVertical: 24 }}>
              <ErrorMessage showIcon={true} iconStyle={{ marginRight: 5 }}>
                {'Phone number already exists.'}{' '}
              </ErrorMessage>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        {!open && (
          <Text style={[styles.newNumText, { marginTop: error ? 0 : 37 }]}>{'We will send an SMS with a confirmation code to your new number.'}</Text>
        )}
        <View style={{ flexGrow: open ? 0 : 1 }} />
        {!open && (
          <TouchableOpacity
            disabled={!(phoneNumber.length == 10 && value)}
            onPress={onSaveNewNumber}
            style={[
              styles.deleteMainContent,
              {
                backgroundColor: phoneNumber.length == 10 && value ? Colors.primary4 : Colors.greyish26,
                marginBottom: ISIOS ? inset.bottom : inset.bottom + hp(1.6),
                marginTop: isKeyboardHows ? hp(10) : 0,
              },
            ]}
          >
            <View style={[styles.deleteStyle]}>
              <Text style={[styles.deleteText, { color: Colors.white }]}>{'Get code'}</Text>
              <SvgIcon name="right-arrow-icon" height={wp(4)} color={Colors.white} />
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPhone;
{
  /* {!open && (
        <FlatButton
          title="Change phone number"
          variant="solid2"
          disabled={!validNumber || loading}
          containerStyle={styles.changeBtn}
          titleStyle={styles.changeBtnText}
          onPress={onSaveNewNumber}
        />
        
      )} */
}
