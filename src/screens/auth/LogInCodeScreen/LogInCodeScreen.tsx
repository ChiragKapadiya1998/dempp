import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TouchableWithoutFeedback, View, Keyboard, Animated } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { actions as authActions } from '../../../ducks/auth';
import requestErrors from '../../../utils/requestErrors';
import AlternativeActionText from '../../../components/auth/AlternativeActionText';
import { Pages } from '../../../navigators/Routes';
import { ScreenNavigationProps } from './types';
import FlatButton from '../../../components/forms/FlatButton';
import CodeInput from '../../../components/forms/CodeInput';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import AuthLogoView from '../../../components/auth/AuthLogoView';
import ShadedView from '../../../components/common/ShadedView';
import { hp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { EncouragingText, HighlightedText } from './styled';
import styles from './styles';
import { fontFamily, getHiddenPhoneNumber } from '../../../utils/functions';

const CODE_LENGTH = 6;

const LogInCodeScreen = (): JSX.Element => {
  const { phoneNumber, isLoginCodeFetching, isUserAuthorizing, err } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.token);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const opacityAnimated = useRef(new Animated.Value(0)).current;
  const { isKeyboardHows, keyboardDuration } = useKeyboard();
  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();

  const onPressSignUp = () => {
    navigation.navigate(Pages.SignUpPhoneScreen);
  };

  const onLoginPress = () => {
    if (!phoneNumber || code.length !== CODE_LENGTH) return setError('Incorect login data.');
    dispatch(authActions.logInRequest({ username: phoneNumber, code }));
  };

  const onResendCode = () => {
    if (!phoneNumber) return setError('Incorect login data.');
    dispatch(authActions.getLoginCodeRequest({ username: phoneNumber }));
  };

  useEffect(() => {
    Animated.timing(opacityAnimated, {
      useNativeDriver: false,
      toValue: isKeyboardHows ? 0 : 1,
      duration: keyboardDuration,
    }).start();
  }, [isKeyboardHows]);

  useEffect(() => {
    if (code.length === CODE_LENGTH && phoneNumber) {
      dispatch(authActions.logInRequest({ username: phoneNumber, code }));
    }
    setError('');
  }, [phoneNumber, code]);

  useFocusEffect(
    useCallback(() => {
      if (err) {
        const findError = requestErrors.find((rError) => rError.code === err);
        setError(findError ? findError.message : err);
        dispatch(authActions.clearError());
      }
    }, [err]),
  );

  return (
    <AuthLogoView backgroundColor={Colors.secondary5}>
      <ShadedView style={styles.screen}>
        <Animated.View style={{ opacity: opacityAnimated, height: opacityAnimated.interpolate({ inputRange: [0, 1], outputRange: [0, hp(13)] }) }}>
          <EncouragingText>{`The code was sent to your phone number ending ${getHiddenPhoneNumber(phoneNumber) || ''}.`}</EncouragingText>
          <EncouragingText onPress={onResendCode}>
            If you believe it’s missing <HighlightedText>resend the code</HighlightedText>.
          </EncouragingText>
        </Animated.View>
        <CodeInput invalid={!!error.length} length={CODE_LENGTH} onChangeText={setCode} value={code} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ErrorMessage showIcon={true} containerStyle={styles.errorMessage}>
              {error}
            </ErrorMessage>
          </View>
        </TouchableWithoutFeedback>
        <EncouragingText style={{ marginBottom: hp(1), fontFamily: fontFamily.rf_regular }}>
          {error ? (
            <>
              Or <HighlightedText onPress={navigation.goBack}>change the phone number</HighlightedText>.
            </>
          ) : (
            ''
          )}
        </EncouragingText>
        <FlatButton
          title={'Log In'}
          onPress={onLoginPress}
          variant={'solid1'}
          disabled={isLoginCodeFetching || code.length !== CODE_LENGTH || !!accessToken || loading}
          loading={isLoginCodeFetching || isUserAuthorizing || loading}
          containerStyle={[
            styles.loginButton,
            { backgroundColor: isLoginCodeFetching || code.length !== CODE_LENGTH || !!accessToken || loading ? Colors.greyish31 : Colors.primary4 },
          ]}
        />
        <AlternativeActionText
          highlightedText={'Sign up'}
          onPress={onPressSignUp}
          regularText={"Don't have an account?"}
          style={styles.alternativeActionText}
        />
      </ShadedView>
    </AuthLogoView>
  );
};

export default LogInCodeScreen;
