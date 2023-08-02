import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { View, Text, Animated, Keyboard, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import CodeInput from '../../../components/forms/CodeInput';
import { VALIDATION_CODE_LENGTH } from '../../../utils/constants';
import { ISIOS, useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import styles from './styles';
import { HighlightedText } from '../../auth/LogInCodeScreen/styled';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { actions } from '../../../ducks/phone';
import { actions as authActions } from '../../../ducks/auth';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import { hp } from '../../../styles/metrics';
import { ParlaContact } from '../../../ducks/contacts/types';
import BackToLogin from '../../../components/modals/BackToLogin';
import FlatButton from '../../../components/forms/FlatButton';
import { Colors } from '../../../styles';
import NavigationHelper from '../../../utils/NavigationHelper';
import { Pages } from '../../../navigators/Routes';
import { fontFamily } from '../../../utils/functions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ConfirmChangePhoneScreen = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { err, number, country, backLogin, loading } = useAppSelector((state) => state.phone);
  const { isKeyboardHows, keyboardDuration } = useKeyboard();
  const paddingVericalAnimated = useRef(new Animated.Value(35)).current;
  const inset = useSafeAreaInsets();

  const onResend = () => {
    if (number && country) {
      setError(null);
      dispatch(actions.updatePhoneRequest({ phone: number, country }));
    }
  };

  useEffect(() => {
    Animated.timing(paddingVericalAnimated, {
      useNativeDriver: false,
      toValue: isKeyboardHows ? 10 : 35,
      duration: keyboardDuration,
    }).start();
  }, [isKeyboardHows]);

  useEffect(() => {
    if (code.length === 6) {
      // dispatch(actions.confirmPhoneRequest({ code }));
      Keyboard.dismiss();
    }
    if (code.length == 0) {
      setError(null);
    }
  }, [code]);

  const onSubmitPress = () => {
    dispatch(actions.confirmPhoneRequest({ code }));
  };

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Text style={[styles.title, { marginTop: hp(3.2), fontFamily: fontFamily.rf_medium }]}>You’ve requested</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Text style={[styles.title, { fontFamily: fontFamily.rf_medium }]}>phone number update</Text>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView style={styles.cardContent}>
        <Animated.View style={{ paddingVertical: paddingVericalAnimated }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Text style={styles.text}>{'The code was sent to your phone'}</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Text style={styles.text}>number ending *** {number?.substring(number.length - 3)}.</Text>
            </TouchableWithoutFeedback>
          </TouchableWithoutFeedback>
          <Text style={styles.text}>
            If you believe it’s missing <HighlightedText onPress={onResend}>{'resend the\ncode'}</HighlightedText>.
          </Text>
        </Animated.View>
        <CodeInput containerStyle={{ marginTop: hp(1.4) }} invalid={!!error} length={VALIDATION_CODE_LENGTH} onChangeText={setCode} value={code} />
        <ErrorMessage containerStyle={styles.errorMessage}>{error ?? ''}</ErrorMessage>
      </KeyboardAvoidingView>
      <View>
        <FlatButton
          title={'Submit'}
          onPress={onSubmitPress}
          variant={'solid1'}
          disabled={code.length !== 6}
          loading={loading}
          containerStyle={[
            styles.submitButton,
            { backgroundColor: code.length !== 6 ? Colors.greyish26 : Colors.primary4, marginBottom: ISIOS ? inset.bottom : inset.bottom + hp(1) },
          ]}
        />
      </View>
      {/* {true && <BackToLogin />} */}
    </View>
  );
};

export default ConfirmChangePhoneScreen;
