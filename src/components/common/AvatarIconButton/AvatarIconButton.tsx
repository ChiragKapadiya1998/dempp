import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { Pages } from '../../../navigators/Routes';
import SvgIcon from '../SvgIcon';
import { wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { selectors as tokenSelectors } from '../../../ducks/token';

const AvatarIconButton = () => {
  const { data: user } = useAppSelector((state) => state.user);

  const { navigate } = useNavigation();

  const onAvatarPress = () => {
    navigate(Pages.SettingStack);
  };

  const profileImage = user?.avatar?.s || '';

  if (!user) return null;
  return (
    <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.7} style={styles.container}>
      {profileImage ? (
        <FastImage source={{ uri: profileImage }} style={styles.avatar} resizeMode={'cover'} />
      ) : (
        <View style={styles.avatar}>
          <SvgIcon name="avtar-photo-icon" height={33} />
          {/* <Text style={styles.avatarText}>{user?.username ? user?.username?.charAt(0).toUpperCase() : ''}</Text> */}
        </View>
      )}
      <View style={styles.icon}>
        <SvgIcon name={'settings-icon'} color={Colors.greyish3} height={wp(4.85)} />
      </View>
    </TouchableOpacity>
  );
};

export default AvatarIconButton;
