import React, { forwardRef, useState, useImperativeHandle } from 'react';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { BottomSheetProps } from './types';
import styles from './styles';
import { Metrics } from '../../../styles';

const BottomSheet = forwardRef(({ children, containerStyle, onChange }: BottomSheetProps, ref) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpened(false);
    onChange?.(false);
  };

  const openModal = () => {
    Keyboard.dismiss();
    setIsModalOpened(true);
    onChange?.(true);
  };

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }));

  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={300}
      backdropOpacity={0}
      backdropTransitionOutTiming={0}
      deviceHeight={Metrics.screenHeight}
      isVisible={isModalOpened}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.overlay}
      useNativeDriver
      useNativeDriverForBackdrop
    >
      <Shadow viewStyle={[styles.shadowContainer]} distance={10}>
        <SafeAreaView style={[styles.container, containerStyle]}>{children}</SafeAreaView>
      </Shadow>
    </Modal>
  );
});

export default BottomSheet;
