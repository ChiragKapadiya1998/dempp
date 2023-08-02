import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';

export default StyleSheet.create({
  overlay: {
    margin: 0,
    justifyContent: 'center',
  },
  bottomAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: Colors.greyish1,
    left: wp(2),
    right: wp(2),
    bottom: hp(4.6),
    paddingHorizontal: wp(4.35),
    paddingVertical: hp(1.15),
    borderRadius: wp(2),
  },
  bottomAlertText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    fontWeight: '400',
    letterSpacing: -0.42,
    color: Colors.white,
    flex: 1,
  },
  bottomAlertButtonText: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    fontWeight: '600',
    letterSpacing: -0.4,
    color: Colors.secondary2,
  },
});
