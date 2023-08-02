import React, { useEffect, useRef } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Props } from './types';
import { useKeyboard } from '../../../utils/hooks';
import SvgIcon from '../../common/SvgIcon';
import { hp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';

const MARGIN_PERCENTAGE = hp(9);

const AuthLogoView = ({ children, backgroundColor }: Props): JSX.Element => {
  const { isKeyboardHows, keyboardDuration } = useKeyboard();
  const { top } = useSafeAreaInsets();
  const paddingAnimated = useRef(new Animated.Value(MARGIN_PERCENTAGE)).current;

  useEffect(() => {
    Animated.timing(paddingAnimated, {
      useNativeDriver: false,
      toValue: isKeyboardHows ? 30 : MARGIN_PERCENTAGE,
      duration: keyboardDuration,
    }).start();
  }, [isKeyboardHows]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }}>
      <Animated.View
        style={{
          ...styles.screen,
          paddingTop: top + hp(1),
          marginBottom: paddingAnimated,
          backgroundColor: backgroundColor || Colors.white,
        }}
      >
        <TouchableWithoutFeedback onPress={isKeyboardHows ? Keyboard.dismiss : undefined}>
          <Animated.View style={{ ...styles.logoContainer, paddingTop: paddingAnimated }}>
            <SvgIcon name={'parlapp-text-logo'} height={hp(11)} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {children}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default AuthLogoView;
