import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(9),
  },
  blockedText: {
    fontSize: fontSize(18),
    lineHeight: fontSize(21.5),
    letterSpacing: -0.4,
    fontWeight: '600',
    color: Colors.destructive4,
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
    marginTop: hp(7.5),
  },
  blockedContent: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22.95),
    letterSpacing: -0.07,
    color: Colors.accent19,
    textAlign: 'center',
    marginTop: hp(0.9),
  },
});
