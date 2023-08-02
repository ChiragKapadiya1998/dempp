import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import FlatButton from '../../../components/forms/FlatButton';
import OptionItem from './components/OptionItem';
import styles from './styles';
import { Colors } from '../../../styles';
import { actions as userActions } from '../../../ducks/user';
import GeneralPreloader from '../../../components/preloaders/GeneralPreloader';
import { hp } from '../../../styles/metrics';
import SvgIcon from '../../../components/common/SvgIcon';

const options: { key: number; label: string }[] = [
  { key: 1, label: 'On' },
  { key: 2, label: 'Off for 2h' },
  { key: 4, label: 'Off for 4h' },
  { key: 8, label: 'Off for 8h' },
  { key: 24, label: 'Off for 24h' },
];

const NotificationScreen = () => {
  const { data: user, loading } = useAppSelector((state) => state.user);
  const [impression, setImpression] = useState<number>(1);
  const [showRight, setShowRight] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let key = user?.availabilityStatus == 'available' ? 1 : user?.availabilityStatus == 'feeling-chatty' ? 1 : user?.sleepTimeInHours ?? 1;
    setImpression(key);
  }, []);

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setShowRight(false);
      }, 2500);
  }, [loading]);

  const onPressApply = () => {
    setShowRight(true);
    if (impression == 1) {
      dispatch(userActions.updateUserStatusRequest({ availabilityStatus: 'available', timeInHours: 0 }));
    } else {
      dispatch(userActions.updateUserStatusRequest({ availabilityStatus: 'sleep', timeInHours: impression }));
    }
  };

  let isButtonDisable = true;
  if (user?.availabilityStatus === 'available') {
    isButtonDisable = impression === 1;
  } else if (user?.availabilityStatus === 'sleep') {
    isButtonDisable = impression === user?.sleepTimeInHours;
  } else if (user?.availabilityStatus === 'feeling-chatty') {
    isButtonDisable = impression === 1;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Notification settings'}</Text>
      <View style={styles.contentContainer}>
        {options.map((item, key) => {
          return (
            <OptionItem
              key={key}
              isSelected={item.key === impression}
              title={item.label}
              onPress={() => {
                setImpression(item.key);
              }}
              index={key}
              lastIndex={options.length - 1}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={isButtonDisable ? (showRight ? styles.applyMainContent : styles.disableButton) : styles.applyMainContent}
        onPress={() => onPressApply()}
        disabled={isButtonDisable}
      >
        {loading ? (
          <GeneralPreloader containerStyle={{ height: hp(2) }} color={Colors.white} />
        ) : showRight ? (
          <SvgIcon name={'right-icon'} height={13} style={styles.contentBodyIcon} color={Colors.white} />
        ) : (
          <Text style={styles.applyText}>{'Apply'}</Text>
        )}
        {/* <SvgIcon name={'right-icon'} height={12} style={styles.contentBodyIcon} color={Colors.white} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
