import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Text, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import styles from './styles';
import { Colors } from '../../../styles';

const CallConnectionModal = () => {
  const { callCannection } = useAppSelector((state) => state.modals);
  const [show, setShow] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (callCannection) {
      setShow(true);
      Animated.timing(opacity, { duration: 300, useNativeDriver: true, toValue: 1 }).start();
    } else {
      Animated.timing(opacity, { duration: 300, delay: 1000, useNativeDriver: true, toValue: 0 }).start((res) => {
        if (res.finished) {
          setShow(false);
        }
      });
    }
  }, [callCannection]);

  if (!show) return null;

  return (
    <Animated.View style={{ ...styles.container, opacity }}>
      <View style={styles.modal}>
        <Text style={styles.title}>Lost connection with user</Text>
        <Text style={styles.description}>
          Reconnecting... <ActivityIndicator color={Colors.white} />
        </Text>
      </View>
    </Animated.View>
  );
};

export default CallConnectionModal;
