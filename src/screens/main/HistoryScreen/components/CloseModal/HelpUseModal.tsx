import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { Colors, Metrics } from '../../../../../styles';

const CloseModal = ({ tabQueries, isVisibleModal, setIsVisibleModal, selectData, onPressYesClick, closeOrDecline }: any) => {
  const closeModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };
  const onPressGotIt = () => {
    closeModal();
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={1}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropColor={'#4A5362'}
      backdropOpacity={0.4}
      coverScreen={true}
      backdropTransitionOutTiming={0}
      isVisible={isVisibleModal}
      // statusBarTranslucent
      style={styles.overlay}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.main}>
        <View style={styles.bottomAlert}>
          <Text style={[styles.bottomAlertText, { color: Colors.greyish1 }]}>
            {closeOrDecline ? 'Are you sure you want to\nclose the query? ' : 'Are you sure you want to \ndecline the query? '}
          </Text>
        </View>
        <View style={styles.yesContent}>
          <TouchableOpacity onPress={() => onPressYesClick()}>
            <Text style={styles.yesText}>Yes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.yesContent}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={[styles.yesText, { color: Colors.primary13, marginBottom: 4, fontWeight: '400' }]}>
              {closeOrDecline ? 'Don’t close' : 'Don’t decline'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CloseModal;
