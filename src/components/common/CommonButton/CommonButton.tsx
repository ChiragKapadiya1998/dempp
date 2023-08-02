import React from 'react';

import SvgIcon from '../SvgIcon';

import { CommonButtonProps } from './types';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { variantStyles } from '../../forms/FlatButton/data';

const CommonButton = (props: CommonButtonProps): JSX.Element => {
  const { title, titleStyle: titleTextStyle, containerStyle, isLinearGradient, onPress, disabled, loading } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.deleteMainContent, containerStyle, { backgroundColor: disabled ? Colors.greyish26 : Colors.primary4 }]}
    >
      {loading ? (
        <GeneralPreloader containerStyle={{ height: hp(2.7) }} color={Colors.white} />
      ) : (
        <Text style={[styles.deleteText, titleTextStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;
