import React, { useEffect, useState, useCallback } from 'react';
import { Keyboard, StatusBarIOS, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useFocusEffect, NavigationProp } from '@react-navigation/native';
import { getPhoneCode, CountryCode, E164Number, parsePhoneNumber } from 'libphonenumber-js';
import { ValueType } from 'react-native-dropdown-picker';
import CarrierInfo from 'react-native-carrier-info';

import { ISIOS, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/invite';
import { MainStackParamList } from '../../../navigators/types';
import { Pages } from '../../../navigators/Routes';
import { contryNameKeys } from '../../auth/LogInUsernameScreen/CountrySelect';
import CountryPicker from '../../../components/auth/CountryPicker';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import TextInput from '../../../components/forms/TextInput';
import ShadedView from '../../../components/common/ShadedView';
import SvgIcon from '../../../components/common/SvgIcon';
import { fontSize, hp } from '../../../styles/metrics';
import styles from './styles';
import FlatButton from '../../../components/forms/FlatButton';
import { Colors } from '../../../styles';
import { fontFamily } from '../../../utils/functions';
import FeelingChattyModal from '../HomeScreen/components/FeelingChattyModal';
import axios from 'axios';

const InviteScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [validNumber, setValidNumber] = useState<E164Number | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isResponseSent, setIsResponseSent] = useState<boolean>(false);
  const { err, loading, invitationSent } = useAppSelector((state) => state.invite);
  const { isModesvisible } = useAppSelector((state) => state.user);
  console.log('value', value);

  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      if (err) setError(err);
    }, [err]),
  );

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        let data = response.data;
        setValue(data?.country_code);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!value || !phoneNumber) return;
    try {
      const phoneData = parsePhoneNumber(phoneNumber, value as CountryCode);
      const isValid = phoneData.isValid();
      if (isValid) setValidNumber(phoneData.number), setError(undefined);
      else setError(isValid ? undefined : 'Phone number is incorrect. Please, try again.'), !isValid && setValidNumber(null);
    } catch {
      setValidNumber(null);
      setError('Phone number is incorrect. Please, try again.');
    }
  }, [phoneNumber, value]);

  useEffect(() => {
    if (isResponseSent && invitationSent) {
      setValue(null);
      setPhoneNumber('');
      setError(undefined);
      setValidNumber(null);
      setIsResponseSent(false);
      dispatch(actions.clearInviteUserStatus());
    }
  }, [invitationSent]);

  const onSendInvite = () => {
    if (validNumber) {
      dispatch(actions.inviteUserRequest({ phone: validNumber }));
      setIsResponseSent(true);
    } else {
      setError('Phone number is incorrect. Please, try again.');
    }
  };

  const onAddContactsPress = () => {
    // navigation.navigate(Pages.ContactsScreen);
    navigate(Pages.MainStack, {
      screen: Pages.ContactsScreen,
      initial: false,
      params: { from: 'Invites' },
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <View style={styles.topContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headTitile}>{'Grow the Parlapp community!'}</Text>
              <SvgIcon name={'invite-tagline'} height={hp(1.9)} color={'red'} />
            </View>
            <SvgIcon name={'grow-icon'} height={hp(15)} />
          </View>
          <ShadedView style={styles.contentContainer}>
            <KeyboardAwareScrollView bounces={false} contentContainerStyle={{ flexGrow: ISIOS ? 0 : 1 }} showsVerticalScrollIndicator={false}>
              <CountryPicker
                open={open}
                value={value}
                items={contryNameKeys.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0))}
                setOpen={setOpen}
                setValue={setValue}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.textContainer}>
                  <Text style={value ? styles.blackText : styles.greyText}>
                    {value ? `+${value !== 'AQ' ? getPhoneCode(value as CountryCode) : 672}` : 'Code'}
                  </Text>
                </View>
                <TextInput
                  // required={true}
                  containerStyle={styles.inputContainer}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  label={'Phone number'}
                  keyboardType={'phone-pad'}
                  hideBottomLine={true}
                  labelHidden={true}
                  placeholderTextColor={'red'}
                  textInputStyle={{
                    fontSize: fontSize(17),
                    fontFamily: fontFamily.rf_regular,
                    letterSpacing: -0.3,
                    fontWeight: '400',
                    color: Colors.accent19,
                  }}
                />
              </View>
              {error && (
                <ErrorMessage showIcon={true} containerStyle={styles.error}>
                  {error}
                </ErrorMessage>
              )}

              <FlatButton
                title={'Send an invite'}
                onPress={onSendInvite}
                variant={'solid1'}
                disabled={!validNumber || loading}
                loading={loading}
                titleStyle1={{
                  color: Colors.white,
                  fontSize: fontSize(15),
                  letterSpacing: -0.4,
                  lineHeight: fontSize(18),
                  fontFamily: fontFamily.rf_medium,
                }}
                containerStyle={[
                  {
                    backgroundColor: !validNumber || loading ? Colors.greyish31 : Colors.primary4,
                    marginTop: hp(6),
                    minHeight: hp(5.9),
                    // opacity: 1.0,
                  },
                ]}
              />
              {/* <TouchableOpacity
              style={[styles.sendButton, !validNumber || loading ? styles.sendButtonDisabled : undefined]}
              disabled={!validNumber || loading}
              onPress={onSendInvite}
            >
              <Text style={styles.sendButtonText}>{'Send an invite'}</Text>
            </TouchableOpacity> */}

              <Text style={styles.or}>{'OR'}</Text>

              <TouchableOpacity style={styles.addFromButton} onPress={onAddContactsPress}>
                <Text style={styles.addFromButtonText}>{'+ Add friend from your Contacts'}</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </ShadedView>
          {isModesvisible && <FeelingChattyModal isVisibleModal={isModesvisible} />}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
export default InviteScreen;
