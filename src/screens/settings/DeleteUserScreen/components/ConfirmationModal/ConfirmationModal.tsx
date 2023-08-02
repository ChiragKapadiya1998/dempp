import React, { useRef, useEffect, useCallback } from 'react';
import Collapsible from 'react-native-collapsible';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Animated } from 'react-native';

import styles from './styles';
import useModal from './useModal';
import { Colors } from '../../../../../styles';
import { ConfirmationModalProps } from './types';
import { MAX_LENGTH_TEXT_INPUT, SMALL_PRELOADER_SIZE } from '../../../../../utils/constants';

import { Overlay, HeadingText, HeadingTextRed, InstructionText, TextInput, ConfirmButton, ConfirmButtonTitle } from './styled';
import GeneralPreloader from '../../../../../components/preloaders/GeneralPreloader';

const ConfirmationModal = ({ onConfirm }: ConfirmationModalProps) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(1)).current;

  const runAnimation = useCallback(() => {
    opacity.setValue(0.8);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const { isButtonCollapsed, isLoading, isModalShow, onChangeText, onOverlayPress, value } = useModal();

  useEffect(() => {
    if (isModalShow) runAnimation();
  }, [isModalShow]);

  if (!isModalShow) return null;

  return (
    <Overlay onPress={onOverlayPress}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        <Animated.View style={[styles.modal, { opacity }]}>
          <HeadingText>
            Your profile will be <HeadingTextRed>deleted</HeadingTextRed>
          </HeadingText>
          <InstructionText>Type in the word &ldquo;Delete&rdquo; if you&apos;re confirm the deletion of your Parlapp Profile.</InstructionText>
          <TextInput
            editable={!isLoading}
            maxLength={MAX_LENGTH_TEXT_INPUT}
            onChangeText={onChangeText}
            placeholder="Enter the word"
            placeholderTextColor={Colors.greyish3}
            value={value}
          />
          <Collapsible collapsed={isButtonCollapsed}>
            <ConfirmButton onPress={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <GeneralPreloader containerStyle={{ width: SMALL_PRELOADER_SIZE }} color={Colors.destructive4} />
              ) : (
                <ConfirmButtonTitle>Confirm</ConfirmButtonTitle>
              )}
            </ConfirmButton>
          </Collapsible>
        </Animated.View>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default ConfirmationModal;
