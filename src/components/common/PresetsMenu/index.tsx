import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import SvgIcon from '../SvgIcon';
import TitleSmall from '../TitleSmall';
import styles from './styles';
import { actions as modalsActions } from '../../../ducks/modals';
import { actions as userActions } from '../../../ducks/user';
import { useNavigation } from '@react-navigation/core';
import { Pages } from '../../../navigators/Routes';

const labels: {
  [key: string]: string;
} = {
  sleep: 'Sleep',
  'feeling-chatty': 'Chatty!',
};

const PresetsMenu = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const { disturbPeriod } = useAppSelector((state) => state.disturb);
  const { userPresetsMenu } = useAppSelector((state) => state.modals);
  const user = useAppSelector((state) => state.user.data);
  const scale = useRef(new Animated.Value(0)).current;

  const onPressLink = () => {
    dispatch(modalsActions.togglePressetsMenu(false));
    navigate(Pages.PresetsAvailability);
  };

  const onStartDisturb = () => {
    dispatch(
      userActions.updateUserRequest({
        unavailableTo: moment().add(disturbPeriod, 'hours').format(),
      }),
    );
    dispatch(modalsActions.togglePressetsMenu(false));
  };

  const onBackdropPress = () => {
    dispatch(modalsActions.togglePressetsMenu(false));
  };

  useEffect(() => {
    if (userPresetsMenu) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [userPresetsMenu]);

  if (!user) return null;

  const { availabilitySettings, maxQueriesPerDay } = user;

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <Animated.View
        style={{
          ...styles.menuContainer,
          transform: [
            {
              translateX: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.menu}>
          <TitleSmall>presets</TitleSmall>
          {availabilitySettings.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.6}
              style={[styles.item, i !== availabilitySettings.length ? styles.bordered : undefined]}
              onPress={onPressLink}
            >
              <Text style={styles.label}>{labels[item.type]}</Text>
              <Text style={styles.value}>{`${moment.utc(item.startTime, 'HH:mm:SS').local().format('HH:mm')} - ${moment
                .utc(item.endTime, 'HH:mm:SS')
                .local()
                .format('HH:mm')}`}</Text>
              <SvgIcon name="left-chevron" style={{ transform: [{ rotate: '180deg' }], marginLeft: 11 }} height={12} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity activeOpacity={0.6} style={styles.item} onPress={onPressLink}>
            <Text style={styles.label}>Max incoming queries/day</Text>
            <Text style={styles.value}>{maxQueriesPerDay}</Text>
            <SvgIcon name="left-chevron" style={{ transform: [{ rotate: '180deg' }], marginLeft: 11 }} height={12} />
          </TouchableOpacity>
          <TitleSmall style={{ marginTop: 15 }}>do not disturb</TitleSmall>
          <View style={styles.withButtonItem}>
            <TouchableOpacity activeOpacity={0.6} style={styles.subItem} onPress={onPressLink}>
              <Text style={styles.label}>For the next</Text>
              <Text style={[styles.value, styles.disturb]}>{disturbPeriod > 0 ? `${disturbPeriod} hours` : 'Off'}</Text>
              <SvgIcon name="left-chevron" style={{ transform: [{ rotate: '180deg' }], marginLeft: 11 }} height={12} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.goButton} onPress={onStartDisturb}>
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default PresetsMenu;
