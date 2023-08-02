import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FlatButton from '../../../components/forms/FlatButton';
import { fontSize, hp, wp } from '../../../styles/metrics';
import styles from './styles';
import SvgIcon from '../../../components/common/SvgIcon';
import TextInput from '../../../components/forms/TextInput';
import { Colors } from '../../../styles';
import { Pages } from '../../../navigators/Routes';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import { actions as authActions, selectors as authSelectors } from '../../../ducks/auth';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import NavigationHelper from '../../../utils/NavigationHelper';
import FlatButtonIcon from '../../../components/common/FlatButtonIcon';
import { fontFamily } from '../../../utils/functions';

const SettingUpUserName = () => {
  const isLoading = useAppSelector(authSelectors.getIsUserNameUnicityChecking);
  const { userName } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.user);
  const { username: userNameProp } = useAppSelector((state) => state.token);
  const [username, setUserName] = useState('');
  const [newUserValue, setNewUserValue] = useState('');

  const { navigate } = useNavigation();
  const [error, setError] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const errors = useAppSelector((state) => state.errors);

  const onUsernameChange = (text: string) => {
    setUserName(text);
    setError(null);
  };

  useEffect(() => {
    if (isFocused) {
      setError(errors[errors.length - 1]?.message ?? null);
    }
  }, [errors.length]);

  const onNextPress = () => {
    if (data !== null) {
      navigate(Pages.OnboardingSettingUp, { username: username ? username : userNameProp, rootName: true });
    } else {
      const payload: {
        username: string;
        newUser: boolean;
      } = {
        username: username.trim(),
        newUser: true,
      };
      dispatch(authActions.checkUserNameUnicityRequest(payload));
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
      {data == null ? (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={styles.header}>
            <SvgIcon name="parlapp-text" height={hp(8)} />
          </View>
          <View style={[styles.content, { marginTop: hp(12), flex: 1 }]}>
            <Text style={styles.chooseText}>{`Choose your\n username`}</Text>
            <TextInput
              label={'Enter user name'}
              labelHidden={true}
              style={styles.otherPassionInput}
              onChangeText={onUsernameChange}
              value={username}
              textInputStyle={{ fontSize: fontSize(17), fontFamily: fontFamily.rf_regular, letterSpacing: -0.3, fontWeight: '400' }}
              BottomLineStyle={{ borderWidth: 0.5, borderColor: Colors.greyish26 }}
              keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
            />
            {error && (
              <ErrorMessage containerStyle={styles.errorMessage} showIcon={true}>
                {error}
              </ErrorMessage>
            )}
          </View>

          <FlatButtonIcon
            isLinearGradient={false}
            title={'Next'}
            disabled={username.length < 6 || username == ''}
            containerStyle={[styles.containerStyle, { backgroundColor: username.length < 6 || username == '' ? Colors.greyish26 : Colors.primary4 }]}
            onPress={onNextPress}
          />
          {/* <FlatButton
            title={'Next'}
            onPress={onNextPress}
            variant={'solid1'}
            loading={isLoading}
            disabled={username.length < 6 || username == ''}
            containerStyle={[styles.submitButton, { backgroundColor: username.length < 6 || username == '' ? Colors.greyish2 : Colors.primary4 }]}
          /> */}
        </KeyboardAvoidingView>
      ) : (
        <>
          <View style={styles.welcomeMain}>
            <SvgIcon name="welcome-community-icon" height={hp(33)} />
          </View>

          <View style={styles.welComecontent}>
            <Text style={[styles.welComeText, { color: Colors.primary11 }]}> {data?.username}</Text>
            <Text style={styles.welComeText}> {`welcome to our community!`}</Text>
            <Text style={styles.welComeSubText}> {`Would you like to set up an accont\nnow or later?`}</Text>
          </View>

          <FlatButton
            title={'Let’s do it now!'}
            onPress={onNextPress}
            variant={'solid1'}
            loading={false}
            containerStyle={[styles.submitButton, { backgroundColor: Colors.primary4 }]}
          />
          <TouchableOpacity
            style={styles.footerContent}
            onPress={() => {
              NavigationHelper.goToHomeScreen();
              dispatch(authActions.loginUser({ username }));
            }}
          >
            <Text style={styles.footerText}>I'll do it later</Text>
            <SvgIcon name="dropDownArrow" height={hp(0.7)} style={{ transform: [{ rotate: '-90deg' }] }} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default SettingUpUserName;
