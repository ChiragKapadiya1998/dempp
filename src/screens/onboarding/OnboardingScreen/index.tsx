import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch } from '../../../utils/hooks';
import SvgIcon from '../../../components/common/SvgIcon';
import { actions } from '../../../ducks/initiation';
import styles from './styles';
import { Colors } from '../../../styles';

const StepSVGRender = (step: number) => {
  switch (step) {
    case 0:
      return <SvgIcon name="onboarding-step-1" height={342} />;
    case 1:
      return <SvgIcon name="onboarding-step-2" height={324} />;
    case 2:
      return <SvgIcon name="onboarding-step-3" height={283} />;
    default:
      return null;
  }
};

const StepTextRender = (step: number) => {
  switch (step) {
    case 0:
      return 'Do you have a question, a passion\nto talk about, or want to learn\nsomething new?';
    case 1:
      return 'Type your query or topic to talk\nabout. Parlapp will find matching profiles of people who can help\nyou.';
    case 2:
      return 'After your request is accepted by a\nrespondent, discuss 5 minutes in a\nprivate Parlapp room.';
    default:
      return null;
  }
};

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const [disabled, setDiabled] = useState(false);
  const dispatch = useAppDispatch();
  const isDome = step === 2;

  const opacity = useRef(new Animated.Value(0)).current;

  const onNext = () => {
    setDiabled(true);
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start((res) => {
      if (res.finished) setStep((prev) => prev + 1);
    });
  };

  const onPrev = () => {
    setDiabled(true);
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start((res) => {
      if (res.finished) setStep((prev) => prev - 1);
    });
  };

  const onDone = () => {
    dispatch(actions.firstStartSuccess());
  };

  useEffect(() => {
    setDiabled(false);
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 50,
    }).start();
  }, [step]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <SvgIcon name="parlapp-text-logo" height={51} />
        <TouchableOpacity style={styles.spacer} onPress={onDone}>
          {step < 2 && <Text style={styles.skipText}>Skip</Text>}
        </TouchableOpacity>
      </View>
      <Animated.View style={{ opacity, ...styles.content }}>
        <View style={styles.contentImageContainer}>{StepSVGRender(step)}</View>
        <Text style={styles.contentText}>{StepTextRender(step)}</Text>
      </Animated.View>
      <View style={styles.pagintion}>
        {step > 0 ? (
          <TouchableOpacity style={styles.paginationButton} disabled={disabled} onPress={onPrev}>
            <Text style={[styles.paginationButtonText, { color: Colors.greyish15 }]}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.paginationButton} />
        )}
        <View style={styles.dots}>
          {[0, 1, 2].map((item) => (
            <View key={item} style={[styles.dot, item === step ? styles.activeDot : styles.disabledDot]} />
          ))}
        </View>
        {step < 3 ? (
          <TouchableOpacity style={styles.paginationButton} disabled={disabled} onPress={isDome ? onDone : onNext}>
            <Text style={styles.paginationButtonText}>{isDome ? 'Done' : 'Next'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.paginationButton} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
