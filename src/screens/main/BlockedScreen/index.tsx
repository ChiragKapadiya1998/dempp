import React from 'react';
import { Text, View } from 'react-native';
import { openComposer } from 'react-native-email-link';

import { useAppSelector } from '../../../utils/hooks';
import { PARLA_SUPPORT_EMAIL } from '../../../utils/constants';
import SvgIcon from '../../../components/common/SvgIcon';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';

const BlockedScreen = () => {
  const user = useAppSelector((state) => state.user.data);

  if (!user) return null;

  const onEmailPress = () => {
    openComposer({
      to: PARLA_SUPPORT_EMAIL,
      subject: `Account ${user?.id} suspended`,
      message: 'Which app would you like to open?',
    });
  };

  return (
    <View style={styles.container}>
      <SvgIcon name={'blockedIllustration'} height={hp(34)} style={{ alignSelf: 'center' }} />
      <Text style={styles.blockedText}>{'Your account was blocked'}</Text>
      <Text style={styles.blockedContent}>
        {'After multiple reports the account was\nblocked for Spam.Application usage is\nlimited.\n\nContact us at '}
        <Text onPress={onEmailPress} style={{ fontSize: fontSize(15), fontWeight: '400', color: Colors.primary4 }}>
          {PARLA_SUPPORT_EMAIL}
        </Text>
        {' if you\nthink that could be a mistake'}
      </Text>
    </View>
  );
};

export default BlockedScreen;
