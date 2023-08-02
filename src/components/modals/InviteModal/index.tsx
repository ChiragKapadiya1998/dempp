import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { actions } from '../../../ducks/modals';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import styles from './styles';

const InviteModal = () => {
  const dispatch = useAppDispatch();
  const { inviteModal, invite } = useAppSelector((state) => state.modals);
  const opacity = useRef(new Animated.Value(0)).current;

  const onBackDropPress = () => {
    dispatch(actions.toggleInvite({ title: '', message: '' }));
  };

  useEffect(() => {
    if (inviteModal) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [inviteModal]);

  if (!inviteModal) return null;

  return (
    <TouchableWithoutFeedback onPress={onBackDropPress}>
      <Animated.View style={{ ...styles.container, opacity }}>
        <View style={styles.modal}>
          <Text style={styles.title}>{invite.title}</Text>
          <Text style={styles.description}>{invite.message}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default InviteModal;
