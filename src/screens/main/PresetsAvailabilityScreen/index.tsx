import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Animated, TextInput, Keyboard, Platform, Alert, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TitleSmall from '../../../components/common/TitleSmall';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions, actions as userActions } from '../../../ducks/user';
import { actions as disturbActions } from '../../../ducks/disturb';
import { TimeKey } from './types';
import { AvailabilitySettings, AvailabilityStatus } from '../../../ducks/user/types';
import LeftChevronButton from '../../../components/common/Header/components/LeftChevronButton';
import SvgIcon from '../../../components/common/SvgIcon';
import { Colors } from '../../../styles';

const labels: { [key: string]: string } = {
  sleep: 'Sleep mode',
  'feeling-chatty': 'Chatty!',
};

const disturbVariants = [0, 2, 4, 8, 24];

const PresetsAvailabilityScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.data);
  const { disturbPeriod } = useAppSelector((state) => state.disturb);
  const [timeConfig, setTimeConfig] = useState<{
    date: Date | null;
    key: TimeKey | null;
    mode: AvailabilityStatus | null;
  }>({
    date: null,
    key: null,
    mode: null,
  });
  const [data, setData] = useState<AvailabilitySettings[]>([]);
  const [showPicker, setShowPricker] = useState(false);
  const transformY = useRef(new Animated.Value(400)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const [queries, setQueries] = useState('0');
  const [menu, setMenu] = useState(false);
  const [timeError, setTimeErorr] = useState('');

  const onTimePress = (time: string, key: TimeKey, mode: AvailabilityStatus) => {
    Keyboard.dismiss();
    if (Platform.OS === 'ios') setShowPricker(true);
    setTimeConfig((prev) => ({
      ...prev,
      date: moment.utc(time, 'HH:mm:SS').toDate(),
      key,
      mode,
    }));
  };

  const onStartDisturb = () => {
    dispatch(
      userActions.updateUserRequest({
        unavailableTo: disturbPeriod > 0 ? moment().add(disturbPeriod, 'hours').utc().format() : moment().subtract(30, 'seconds').utc().format(),
      }),
    );
    navigation.goBack();
  };

  const onChangeTime = (_: Event, date?: Date) => {
    if (date && user && timeConfig.key) {
      if (Platform.OS === 'android') {
        setTimeConfig({ date: null, key: null, mode: null });
      } else {
        setTimeConfig((prev) => ({ ...prev, date }));
      }
      setData((prev) =>
        prev.map((item) =>
          item.type === timeConfig.mode && !!timeConfig.key
            ? {
                ...item,
                [timeConfig.key]: moment.utc(date).format('HH:mm:SS'),
              }
            : item,
        ),
      );
    }
  };

  const onChangeText = (text: string) => {
    const number = text.replace(/[^0-9]/g, '');
    const numbericValue = number.charAt(0) === '0' ? number.replace('0', '') : number;
    setQueries(numbericValue);
  };

  const onDissmiss = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'ios') setShowPricker(false);
    if (queries.length === 0) {
      setQueries(user?.maxQueriesPerDay.toString() || '0');
    }
  };

  const onInputFocus = () => {
    if (Platform.OS === 'ios') setShowPricker(false);
  };

  const updateUser = () => {
    const maxQueriesPerDay = queries.length ? +queries : user?.maxQueriesPerDay || 0;
    dispatch(
      actions.putAvailabilitySettingRequest({
        modes: data,
        maxQueriesPerDay,
      }),
    );
  };

  const onBackPress = () => {
    if (!!timeError) {
      Alert.alert('Incorrect time config', 'If you continue, the current changes will not be saved. Continue?', [
        {
          text: 'Yes',
          onPress: () => {
            onDissmiss();
            navigation.goBack();
          },
        },
        { text: 'No', style: 'cancel' },
      ]);
    } else {
      updateUser();
      onDissmiss();
      navigation.goBack();
    }
  };

  const onDisturbPress = (hours: number) => {
    dispatch(disturbActions.disturbSwitcher(hours));
    setMenu(false);
  };

  const toggleDisturbMenu = () => {
    setMenu((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      setData(user.availabilitySettings);
      setQueries(user.maxQueriesPerDay.toString());
    }
  }, [user]);

  useEffect(() => {
    if (showPicker) {
      Animated.timing(transformY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(transformY, {
        toValue: 400,
        useNativeDriver: true,
        duration: 300,
      }).start((res) => {
        if (res.finished) setTimeConfig({ date: null, key: null, mode: null });
      });
    }
  }, [showPicker]);

  useEffect(() => {
    if (timeError) {
      Animated.timing(errorAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(errorAnimation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    }
  }, [timeError]);

  useEffect(() => {
    data.forEach((config) => {
      const mStartTime = moment(config.startTime, 'hh:mm:ss');
      const mEndTime = moment(config.endTime, 'hh:mm:ss');
      data.forEach((compareConfig) => {
        if (compareConfig.id !== config.id) {
          const mCompareStartTime = moment(compareConfig.startTime, 'hh:mm:ss');
          const mCompareEndTime = moment(compareConfig.endTime, 'hh:mm:ss');

          if (mStartTime.isBetween(mCompareStartTime, mCompareEndTime)) return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');
          if (mCompareStartTime.isBetween(mStartTime, mEndTime)) return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');

          if (mCompareStartTime.isAfter(mCompareEndTime)) {
            if (mStartTime.isBetween(mCompareStartTime, moment().endOf('day')))
              return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');
            if (mStartTime.isBetween(moment().startOf('day'), mCompareEndTime))
              return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');
          }

          if (mStartTime.isAfter(mEndTime)) {
            if (mCompareStartTime.isBetween(mStartTime, moment().endOf('day')))
              return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');
            if (mCompareStartTime.isBetween(moment().startOf('day'), mEndTime))
              return setTimeErorr('A Sleep mode cannot be enabled at the Chatty period.');
          }

          return setTimeErorr('');
        }
      });
    });
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress, ...rest }: StackHeaderLeftButtonProps) => <LeftChevronButton onPress={onBackPress} {...rest} />,
    });
  }, [data, queries, timeError]);

  if (!user) return null;

  return (
    <TouchableWithoutFeedback onPress={onDissmiss}>
      <View style={styles.container}>
        <TitleSmall>presets</TitleSmall>
        {data.map((item) => (
          <View style={styles.item} key={item.id}>
            <Text style={styles.label}>{labels[item.type]}</Text>
            <View style={styles.selectors}>
              <TouchableOpacity
                style={[styles.time, timeConfig.mode === item.type && timeConfig.key === 'startTime' ? styles.selected : undefined]}
                onPress={() => onTimePress(item.startTime, 'startTime', item.type)}
              >
                <Text style={styles.timeText}>{moment.utc(item.startTime, 'HH:mm:SS').local().format('HH:mm')}</Text>
              </TouchableOpacity>
              <Text style={styles.timeText}>&mdash;</Text>
              <TouchableOpacity
                style={[styles.time, timeConfig.mode === item.type && timeConfig.key === 'endTime' ? styles.selected : undefined]}
                onPress={() => onTimePress(item.endTime, 'endTime', item.type)}
              >
                <Text style={styles.timeText}>{moment.utc(item.endTime, 'HH:mm:SS').local().format('HH:mm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Animated.Text
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: 15,
            paddingHorizontal: 8,
            height: 40,
            opacity: errorAnimation,
          }}
        >
          {timeError}
        </Animated.Text>
        <Animated.View style={{ transform: [{ translateY: errorAnimation.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] }) }] }}>
          <View style={styles.item}>
            <Text style={styles.label}>Max incoming queries/day</Text>
            <TextInput
              textAlign="right"
              style={styles.queries}
              value={`${queries}`}
              onChangeText={onChangeText}
              keyboardType="numeric"
              maxLength={4}
              onFocus={onInputFocus}
            />
          </View>
          <TitleSmall style={{ marginTop: 15 }}>Do not disturb</TitleSmall>
          <View style={styles.disturbContainer}>
            <Text style={styles.label}>For the next</Text>
            <View style={{ position: 'relative', flex: 1 }}>
              <TouchableOpacity style={styles.disturbItem} onPress={toggleDisturbMenu}>
                <Text style={styles.disturbText}>{disturbPeriod > 0 ? `${disturbPeriod} hours` : 'Off'}</Text>
                <SvgIcon style={styles.icon} name={menu ? 'chevron-up' : 'chevron-down'} color={Colors.greyish3} height={8} />
              </TouchableOpacity>
              {menu && (
                <View
                  style={{
                    position: 'absolute',
                    top: 40,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: '#FFF',
                  }}
                >
                  {disturbVariants.map((item) => (
                    <TouchableOpacity key={item} onPress={() => onDisturbPress(item)} style={styles.disturbItem}>
                      <Text style={styles.disturbText}>{item > 0 ? `${item} hours` : 'Off'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.goButton} onPress={onStartDisturb}>
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            ...styles.animatedPickerContainer,
            transform: [{ translateY: transformY }],
          }}
        >
          <View style={styles.bgLayout}>
            {timeConfig.date && (
              <RNDateTimePicker
                nativeID="time-picker"
                style={styles.picker}
                value={moment(timeConfig.date).local().toDate()}
                mode="time"
                is24Hour
                display="spinner"
                onChange={onChangeTime}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PresetsAvailabilityScreen;
