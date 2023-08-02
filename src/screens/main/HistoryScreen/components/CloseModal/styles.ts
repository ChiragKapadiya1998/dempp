import { Platform, StyleSheet } from 'react-native';

import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  overlay: {
    margin: wp(12),
    justifyContent: 'center',
  },
  main: {
    // height: hp(52),
    borderRadius: wp(5.33),
    // paddingVertical: hp(3),

    backgroundColor: Colors.white,
  },
  bottomAlert: {
    alignItems: 'center',
    paddingVertical: hp(2.5),
  },
  bottomAlertText: {
    fontSize: fontSize(17),
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    fontWeight: '600',
    fontFamily: fontFamily.rf_regular,
    textAlign: 'center',
  },
  yesContent: {
    // borderWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: hp(1.12),
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
  yesText: {
    fontSize: fontSize(17),
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    fontWeight: '500',
    fontFamily: fontFamily.rf_regular,
    textAlign: 'center',
    color: Colors.destructive4,
  },
});
