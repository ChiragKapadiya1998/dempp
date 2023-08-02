import React from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { Colors, Metrics } from '../../../styles';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as authActions } from '../../../ducks/auth';

const BackToLogin = () => {
  const dispatch = useAppDispatch();
  const { backLogin } = useAppSelector((state) => state.phone);

  const onbackToLogin = () => {
    dispatch(authActions.logoutRequest());
  };
  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={250}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropColor={Colors.greyish1}
      backdropOpacity={0.4}
      backdropTransitionOutTiming={0}
      deviceHeight={Metrics.screenHeight}
      isVisible={backLogin}
      statusBarTranslucent
      style={styles.overlay}
    >
      <View style={styles.bottomAlert}>
        <Text style={styles.bottomAlertText}>{`Phone number was\nsuccessfully changed.\nUse new number for login`}</Text>
        <TouchableOpacity onPress={onbackToLogin}>
          <Text style={styles.bottomAlertButtonText}>{'Back to Login'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BackToLogin;
