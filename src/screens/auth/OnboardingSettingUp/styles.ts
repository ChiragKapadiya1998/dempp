import { getPhoneCode } from 'libphonenumber-js';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN, IOS } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';
import { ISIOS } from '../../../utils/hooks';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: hp(2),
    paddingHorizontal: wp(6),
    flexDirection: 'row',
  },
  headerDot: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingBottom: hp(2),
  },
  dotContent: {
    height: wp(2.5),
    borderRadius: wp(2.5) / 2,
    marginHorizontal: wp(1.2),
  },
  skipText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.greyish3,
  },
  submitButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
    marginTop: hp(6),
    minHeight: hp(6),
    alignItems: 'center',
  },
  lottieInfoMainView: {
    flex: 1,
  },

  mainStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  dotStyle: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 5,
    backgroundColor: '#3E3E3E',
  },
  titleViewStyle: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textStyle: {
    fontSize: 25,
    textAlign: 'center',
    color: Colors.black,
  },
  content: {
    marginTop: hp(13),
  },
  chooseText: {
    fontSize: fontSize(32),
    textAlign: 'center',
    lineHeight: fontSize(38),
    letterSpacing: -0.02,
    marginBottom: hp(5.5),
    fontFamily: fontFamily.rf_semibold,
    color: Colors.accent19,
    fontWeight: '600',
  },
  chooseSubText: {
    fontSize: fontSize(17),
    textAlign: 'center',
    lineHeight: fontSize(22),
    letterSpacing: -0.41,
    color: Colors.greyish1,
    // marginHorizontal: wp(1),
    fontFamily: fontFamily.rf_regular,
    fontWeight: '400',
  },
  otherPassionInput: {
    paddingVertical: hp(1),
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    // lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish1,
    borderBottomWidth: 1,
    marginHorizontal: wp(8),
    fontFamily: fontFamily.rf_regular,
  },

  audioPlayer: {
    marginLeft: AUTH_HORIZONTAL_SPACE,
    marginRight: AUTH_HORIZONTAL_SPACE,
  },

  footerContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    marginRight: wp(3.5),
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    letterSpacing: -0.4,
    color: Colors.greyish27,
    fontFamily: fontFamily.rf_medium,
  },
  catagoriesContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(1.5),
  },
  errorMessage: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginVertical: hp(1),
    marginLeft: wp(8),
    marginTop: hp(2),
  },
  containerStyle: {
    marginHorizontal: wp(6.9),
    alignItems: 'center',
    paddingVertical: hp(2.2),
    borderRadius: wp(3.2),
    marginBottom: hp(2.5),
  },
  footerContentSave: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: Colors.primary5,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.099,
    shadowRadius: 3,
    elevation: 5,
    paddingBottom: ISIOS ? hp(4) : hp(7),
  },
});
