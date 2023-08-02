import { Platform, StyleSheet } from 'react-native';

import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { IS_IOS } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  overlay: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  main: {
    minHeight: IS_IOS ? hp(55) : hp(62),
    borderRadius: wp(12),
    paddingVertical: hp(3),
    paddingHorizontal: wp(11),
    backgroundColor: Colors.white,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  bottomAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomAlertText: {
    fontSize: fontSize(18),
    lineHeight: fontSize(22),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(1.4),
    fontFamily: fontFamily.rf_semibold,
    letterSpacing: -0.4,
  },
  containerMain: {
    borderRadius: wp(5.5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1),
    borderRadius: wp(5.5),
  },
  chattyText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(16),
    fontWeight: '500',
    color: Colors.primary5,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.2,
  },
  chattySubText: {
    fontSize: fontSize(10),
    lineHeight: fontSize(12),
    fontWeight: '600',
    color: Colors.primary5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  chattyContnent: {
    flex: 1,
    marginLeft: wp(3),
  },
  icomingText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(16),
    fontWeight: '400',
    color: Colors.accent19,
    textAlign: 'center',
    marginBottom: hp(3.2),
  },
  icomingValueText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(16),
    fontWeight: '700',
    color: Colors.accent19,
    textAlign: 'center',
    marginHorizontal: wp(4),
  },

  rightBgStyle: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(8),
  },
});
