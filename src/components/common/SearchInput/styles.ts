import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(1.6),
    height: hp(6),
    borderRadius: hp(2.2),
    // backgroundColor: 'rgba(165, 173, 186, 0.2)',
    backgroundColor: Colors.white,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: Colors.primary6,
    elevation: 6,
  },
  input: {
    flex: 1,
    flexGrow: 1,
    fontSize: fontSize(14),
    // lineHeight: fontSize(20),
    fontWeight: '500',
    color: Colors.accent19,
    paddingLeft: wp(2),
    height: hp(6),
    letterSpacing: -0.4,
    fontFamily: fontFamily.rf_regular,
  },
  results: {
    position: 'absolute',
    top: hp(7.5),
    left: 0,
    right: 0,
    // borderRadius: hp(3.25),
    borderBottomStartRadius: hp(3.25),
    borderBottomEndRadius: hp(3.25),
    paddingVertical: hp(1),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    marginHorizontal: wp(3.9),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  result: {
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(7.25),
    minHeight: hp(4),
  },
  resultText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    // fontWeight: '700',
    fontFamily: fontFamily.rf_bold,
  },
  errorMessage: {
    marginVertical: hp(1),
    marginLeft: wp(4),
    fontFamily: fontFamily.rf_bold,
  },
});
