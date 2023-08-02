import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard, Animated, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Pages } from '../../../navigators/Routes';
import { useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import { actions as authActions } from '../../../ducks/auth';
import requestErrors from '../../../utils/requestErrors';
import { ScreenNavigationProps } from './types';
import AlternativeActionText from '../../../components/auth/AlternativeActionText';
import FlatButton from '../../../components/forms/FlatButton';
import CodeInput from '../../../components/forms/CodeInput';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import AuthLogoView from '../../../components/auth/AuthLogoView';
import ShadedView from '../../../components/common/ShadedView';
import { hp } from '../../../styles/metrics';
import { EncouragingText, HighlightedText } from './styled';
import styles from './styles';
import { Colors } from '../../../styles';
import { getHiddenPhoneNumber } from '../../../utils/functions';

const CODE_LENGTH = 6;

const SignUpPhoneScreen = (): JSX.Element => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { phoneNumber, isLoginCodeFetching, isUserAuthorizing, err, country } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);
  const { isKeyboardHows, keyboardDuration } = useKeyboard();
  const opacityAnimated = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();

  const onPressLogIn = () => {
    navigation.navigate(Pages.LogInUsernameScreen);
  };

  const onSignUpPress = () => {
    if (!phoneNumber || !country || code.length !== CODE_LENGTH) return setError('Incorect login data.');
    dispatch(authActions.signUpRequest({ phoneNumber, code, country }));
  };

  const onResendCode = () => {
    if (!phoneNumber || !country) return setError('Incorect login data.');
    dispatch(authActions.getRegistrationCodeRequest({ phoneNumber, country }));
  };

  useEffect(() => {
    Animated.timing(opacityAnimated, {
      useNativeDriver: false,
      toValue: isKeyboardHows ? 0 : 1,
      duration: keyboardDuration,
    }).start();
  }, [isKeyboardHows]);

  useEffect(() => {
    if (code.length === CODE_LENGTH && phoneNumber && country) {
      dispatch(authActions.signUpRequest({ phoneNumber, code, country }));
    }
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
    <AuthLogoView backgroundColor={Colors.white}>
      <ShadedView style={styles.screen}>
        <Animated.View style={{ opacity: opacityAnimated, height: opacityAnimated.interpolate({ inputRange: [0, 1], outputRange: [0, hp(13)] }) }}>
          <EncouragingText>The code was sent to your phone number ending {getHiddenPhoneNumber(phoneNumber) || ''}.</EncouragingText>
          <EncouragingText onPress={onResendCode}>
            If you believe it’s missing <HighlightedText>resend the code</HighlightedText>.
          </EncouragingText>
        </Animated.View>
        <CodeInput invalid={!!error.length} length={CODE_LENGTH} onChangeText={setCode} value={code} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ErrorMessage showIcon={true} containerStyle={styles.errorMessage}>
              {error}
            </ErrorMessage>

            <View style={styles.phoneTextContainer}>
              <EncouragingText style={{ marginVertical: hp(1) }}>
                {error ? (
                  <>
                    Or <HighlightedText onPress={navigation.goBack}>change the phone number</HighlightedText>.
                  </>
                ) : (
                  ''
                )}
              </EncouragingText>
            </View>
          </>
        </TouchableWithoutFeedback>

        <FlatButton
          title={'Submit'}
          onPress={onSignUpPress}
          variant={'solid1'}
          disabled={isLoginCodeFetching || code.length !== CODE_LENGTH || loading}
          loading={isLoginCodeFetching || isUserAuthorizing || loading}
          containerStyle={[
            styles.submitButton,
            { backgroundColor: isLoginCodeFetching || code.length !== CODE_LENGTH || loading ? Colors.greyish31 : Colors.primary4 },
          ]}
        />
        <AlternativeActionText
          highlightedText={'Log in'}
          onPress={onPressLogIn}
          regularText={"Don't have an account?"}
          style={styles.alternativeActionText}
        />
      </ShadedView>
    </AuthLogoView>
  );
};

export default SignUpPhoneScreen;
