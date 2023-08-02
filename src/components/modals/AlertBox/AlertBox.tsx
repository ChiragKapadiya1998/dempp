import React, { forwardRef, useState, useImperativeHandle } from 'react';
import Modal from 'react-native-modal';
import { Keyboard, View } from 'react-native';

import styles from './styles';
import { AlertProps } from './types';
import { Colors, Metrics } from '../../../styles';

import { Button, ButtonContainer, ButtonText, Container, Content, MessageText, TitleText } from './styled';
import { fontFamily } from '../../../utils/functions';
import { hp } from '../../../styles/metrics';

const AlertBox = ({
  containerStyle,
  title,
  message,
  buttons = [],
  children,
  onBackdropPressValue,
  btnStyle,
  btnContentStyle,
  isVisible,
  setIsVisible,
}: AlertProps) => {
  const showMessageText = !!message;
  const showChildren = !!children;

  const close = () => {
    !onBackdropPressValue && setIsVisible(false);
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={250}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropColor={Colors.greyish27}
      backdropOpacity={0.4}
      backdropTransitionOutTiming={0}
      deviceHeight={Metrics.screenHeight}
      isVisible={isVisible}
      onBackButtonPress={close}
      onBackdropPress={close}
      statusBarTranslucent
      style={styles.overlay}
      useNativeDriver
      useNativeDriverForBackdrop
    >
      <Container style={containerStyle}>
        <Content style={{ marginVertical: hp(1) }}>
          <TitleText style={{ fontFamily: fontFamily.rf_medium, fontWeight: '600', color: Colors.accent19 }}>{title}</TitleText>
          {showMessageText && (
            <MessageText numberOfLines={3} style={{ fontWeight: '400' }}>
              {message}
            </MessageText>
          )}
          {showChildren && children}
        </Content>
        <View style={{ borderBottomWidth: 0.5, borderBottomColor: Colors.greyish7 }} />
        <ButtonContainer style={btnStyle}>
          {buttons.map((item, index) => (
            <Button key={index} first={index === 0} onPress={item.onPress} style={btnContentStyle}>
              <ButtonText numberOfLines={1} variant={item.variant} style={{ fontFamily: fontFamily.rf_regular, fontWeight: '600' }}>
                {item.text}
              </ButtonText>
            </Button>
          ))}
        </ButtonContainer>
      </Container>
    </Modal>
  );
};
export default AlertBox;
