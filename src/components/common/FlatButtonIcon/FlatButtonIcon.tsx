import React from 'react';

import SvgIcon from '../SvgIcon';

import { FlatButtonIconProps } from './types';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import styles from './styles';
import { variantStyles } from '../../forms/FlatButton/data';

const FlatButtonIcon = (props: FlatButtonIconProps): JSX.Element => {
  const { title, titleStyle: titleTextStyle, containerStyle, isLinearGradient, onPress, gradientColors, disabled } = props;
  const containerStylse = disabled ? styles.outline1ContainerEnabled1 : styles.deleteMainContent;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {isLinearGradient ? (
        <LinearGradient colors={gradientColors || ['#2454FF', '#2454FF']} style={[styles.deleteMainContent, containerStyle]}>
          <View style={styles.deleteStyle}>
            <Text style={[styles.deleteText, titleTextStyle]}>{title}</Text>

            <SvgIcon name="dropDownArrow" height={hp(0.8)} color={Colors.white} style={{ transform: [{ rotate: '-90deg' }], marginBottom: 2 }} />
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.deleteMainContent, containerStyle]}>
          <View style={styles.deleteStyle}>
            <Text style={[styles.deleteText, titleTextStyle]}>{title}</Text>
            <SvgIcon name="dropDownArrow" height={hp(0.8)} color={Colors.white} style={{ transform: [{ rotate: '-90deg' }], marginBottom: 2 }} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FlatButtonIcon;
