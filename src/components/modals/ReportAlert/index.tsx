import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { openComposer } from 'react-native-email-link';

import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { actions } from '../../../ducks/user';
import { PARLA_SUPPORT_EMAIL } from '../../../utils/constants';
import { Colors } from '../../../styles';
import { hp } from '../../../styles/metrics';
import styles from './styles';

const ReportAlert = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const onAccept = () => {
    dispatch(actions.updateUserRequest({ showReportModal: false }));
  };

  if (!user?.showReportModal) return null;

  const onEmailPress = () => {
    openComposer({
      to: PARLA_SUPPORT_EMAIL,
      subject: `Account ${user?.id} reported`,
      message: 'Which app would you like to open?',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onAccept}>
        <View style={styles.headeringContent}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>{'Your account was reported'}</Text>
            <Text style={[styles.textSubStyle, { marginTop: hp(0.3) }]}>
              {'This case is under investigation.\n After 3 reports your account will be blocked.\n\nContact us at '}
              <Text onPress={onEmailPress} style={[styles.textSubStyle, { color: Colors.primary4 }]}>
                {PARLA_SUPPORT_EMAIL}
              </Text>
              {`\nif you think that could be a mistake`}
            </Text>
          </View>
          <View style={styles.separateContent} />
          <View style={styles.footerContent}>
            <Text style={[styles.textStyle, { color: Colors.primary2 }]}>Acknowledged</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ReportAlert;
