import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';
import SvgIcon from '../SvgIcon';
import TabIconBtn from '../TabIconBtn';
import { BottmtabType } from './types';

function BottomTabItem({ icons, title, onPress, isActive, showValue }: BottmtabType) {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress} activeOpacity={0.8}>
      {showValue ? (
        <TabIconBtn color={isActive ? '#2454FF' : '#848FA1'} />
      ) : (
        <SvgIcon name={icons} height={25} color={isActive ? '#2454FF' : '#848FA1'} />
      )}
      <Text
        style={[
          styles.titleStyle,
          {
            color: isActive ? '#2454FF' : '#7A869A',
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default BottomTabItem;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingTop: hp(1.8),
    flex: 1,
  },

  titleStyle: {
    fontWeight: '500',
    marginTop: hp(0.7),
    fontSize: fontSize(12),
    lineHeight: fontSize(18),
    fontFamily: fontFamily.rf_regular,
  },
});
