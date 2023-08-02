import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#4C9AFF',
  },
  dot: {
    color: Colors.greyish27,
  },
  transparent: {
    color: Colors.transparent,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: HORIZONTAL_MARGIN,
    marginHorizontal: wp(5.5),
    marginTop: -4,
    minHeight: hp(7.5),
    borderRadius: wp(4.85),
  },

  headerText: {
    fontSize: fontSize(18),
    lineHeight: fontSize(21),
    color: Colors.white,
    textAlign: 'center',
    marginTop: hp(3),
    marginHorizontal: wp(2),
  },
  arrowUpImage: {
    width: wp(8.5),
    height: wp(5.5),
    alignSelf: 'center',
    tintColor: Colors.white,
    marginTop: hp(2),
  },
  addFromButtonText: {
    color: Colors.white,
    fontSize: fontSize(15),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: fontSize(19),
    letterSpacing: -0.24,
    fontFamily: fontFamily.rf_regular,
  },
  addFromButton: {
    paddingVertical: hp(2),
    borderWidth: 0.9,
    borderRadius: 14,
    borderColor: Colors.white,
    marginHorizontal: wp(10),
  },
  footerText: {
    color: Colors.white,
    fontSize: fontSize(17),
    marginHorizontal: wp(4.2),
    textAlign: 'center',
    fontFamily: fontFamily.rf_regular,
    fontWeight: '400',
  },
});
