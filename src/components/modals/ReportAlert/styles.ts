import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  container: {
    width: wp(72),
    paddingVertical: hp(2.6),
    paddingHorizontal: HORIZONTAL_MARGIN,
    borderTopRightRadius: wp(3.38),
    borderTopLeftRadius: wp(3.38),
    backgroundColor: Colors.white,
  },
  footerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(72),
    // height: hp(7),
    paddingVertical: hp(1.35),
    borderBottomRightRadius: wp(3.38),
    borderBottomLeftRadius: wp(3.38),
    backgroundColor: Colors.white,
  },
  headeringContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
  },
  textSubStyle: {
    fontSize: fontSize(13),
    lineHeight: fontSize(16),
    letterSpacing: -0.08,
    color: Colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.rf_regular,
  },
  separateContent: {
    height: 0.5,
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
  },
});
