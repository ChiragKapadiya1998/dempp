import React, { FC } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { hp, wp } from '../../../../../styles/metrics';
import { ModesChattyProps } from './types';
import moment from 'moment';
import { useAppSelector } from '../../../../../utils/hooks';

const ModesChattyView: FC<ModesChattyProps> = ({ maxQuery, sleepTimeHours, availabilityStatus, onPress, containerStyle, maxQueriesLimitReached }) => {
  if (availabilityStatus == 'feeling-chatty') return null;
  if (availabilityStatus == 'available' && maxQueriesLimitReached == false) return null;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.mainStyle, containerStyle]}>
      {!maxQuery ? (
        <SvgIcon name={'do-not-disturb-icon'} height={hp(2.9)} color={'#2D323B'} />
      ) : (
        <SvgIcon name={'call-normal-icon'} height={hp(2.4)} color={'#4C9AFF'} />
      )}
      <Text style={[styles.textContent, { color: !maxQuery ? '#2D323B' : '#4C9AFF' }]}>
        {!maxQuery
          ? `Do not disturb mode till ${moment(sleepTimeHours).format('hh:mm')}`
          : 'The maximum number of incoming queries was reached for today. '}
      </Text>
      <SvgIcon name={'dropDownArrow'} height={wp(2.2)} style={styles.bodyIcon} color={!maxQuery ? '#7A869A' : '#4C9AFF'} />
    </TouchableOpacity>
  );
};

export default ModesChattyView;
