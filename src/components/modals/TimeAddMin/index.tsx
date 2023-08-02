import React from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../utils/hooks';
import { hp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import remoteConfig from '@react-native-firebase/remote-config';
import moment from 'moment';

const TimeAddMin = ({ setTimeAddModal, onADDTime }: any) => {
  const prolongationStep = remoteConfig().getValue('aditionalCallDuration').asNumber();

  const dispatch = useAppDispatch();

  const onAccept = () => {
    setTimeAddModal(false);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onAccept}>
        <View style={styles.headeringContent}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>{`Add ${moment.duration(prolongationStep, 'seconds').format('m')} min`}</Text>
            <Text style={[styles.textSubStyle, { marginTop: hp(0.3) }]}>{`Would you like to continue this call by adding extra ${moment
              .duration(prolongationStep, 'seconds')
              .format('m')} minutes?`}</Text>
          </View>
          <View style={styles.separateContent} />
          <View style={styles.footerContent}>
            <TouchableOpacity style={{ flex: 1, paddingVertical: hp(1.8) }} onPress={onAccept}>
              <Text style={[styles.textStyle, { color: Colors.greyish2 }]}>{'No'}</Text>
            </TouchableOpacity>
            <View style={styles.separatefooter} />
            <TouchableOpacity style={{ flex: 1, paddingVertical: hp(1.8) }} onPress={onADDTime}>
              <Text style={[styles.textStyle, { color: Colors.primary2 }]}>{'Yes'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TimeAddMin;
