import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import styles from './styles';
import { actions as candidatesActions } from '../../../ducks/candidates';

const WhiteErrorModal = () => {
  const { err } = useAppSelector((state) => state.candidates);
  const [show, setShow] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(0)).current;
  console.log('err', err);
  const dispatch = useAppDispatch();

  const backdropPress = () => {
    Animated.timing(opacity, { duration: 300, useNativeDriver: true, toValue: 0 }).start((res) => {
      if (res.finished) {
        setShow(false);
        dispatch(candidatesActions.removeCustomError());
      }
    });
  };

  useEffect(() => {
    if (err) {
      setShow(true);
      Animated.timing(opacity, { duration: 300, useNativeDriver: true, toValue: 1 }).start((res) => {
        if (res.finished) {
          Animated.timing(opacity, { duration: 300, delay: 5000, useNativeDriver: true, toValue: 0 }).start((res) => {
            if (res.finished) {
              setShow(false);
              dispatch(candidatesActions.removeCustomError());
            }
          });
        }
      });
    }
  }, [err]);

  if (!show) return null;

  return (
    <TouchableWithoutFeedback onPress={backdropPress}>
      <Animated.View style={{ ...styles.container, opacity }}>
        <View style={styles.modal}>
          <Text style={styles.title}>Warning</Text>
          <Text style={styles.description}>{err}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default WhiteErrorModal;
