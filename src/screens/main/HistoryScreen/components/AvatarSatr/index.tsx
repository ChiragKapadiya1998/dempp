import moment from 'moment';
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { wp } from '../../../../../styles/metrics';
import { startData } from '../../../../../utils/reportReasons';

import styles from './styles';

const AvatarSatr = ({ myQuery, avatar, username, rating, status, date }) => {
  return (
    <View style={styles.avatarContent}>
      {myQuery ? (
        avatar ? (
          <FastImage source={avatar ? { uri: avatar?.s } : require('../../../../../assets/Avatar.png')} style={styles.avatar} resizeMode={'cover'} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: Colors.primary4 }]}>
            <Text style={styles.avatarText}>{username?.charAt(0)?.toUpperCase()}</Text>
          </View>
        )
      ) : avatar ? (
        <FastImage source={avatar ? { uri: avatar?.s } : require('../../../../../assets/Avatar.png')} style={styles.avatar} resizeMode={'cover'} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: Colors.primary4 }]}>
          <Text style={styles.avatarText}>{username?.charAt(0)?.toUpperCase()}</Text>
        </View>
      )}
      <View style={[styles.avterTextContent, { marginLeft: myQuery ? wp(2.9) : wp(2.66) }]}>
        <Text style={styles.avterText}>{username}</Text>
        {myQuery && (
          <View style={styles.starContent}>
            {rating > 0 && (
              // Array.from(Array(rating))?.map(() => {
              //   return <SvgIcon name={'star'} height={13} color={Colors.accent13} style={styles.starIcon} />;
              // })
              <Text style={styles.dateText}>{moment(date).format('DD/MM/YYYY hh:mm A')}</Text>
            )}
            {status !== 'finished' && rating < 0 ? <Text style={[styles.chatqueryContentText]}>{'Chat was disconnected'}</Text> : null}
          </View>
        )}
      </View>
    </View>
  );
};

export default AvatarSatr;
