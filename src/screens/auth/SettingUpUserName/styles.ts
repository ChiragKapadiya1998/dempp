import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: hp(0.5),
    alignItems: 'center',
    paddingLeft: 15,
  },
  chooseText: {
    fontSize: fontSize(32),
    textAlign: 'center',
    lineHeight: fontSize(38),
    letterSpacing: -0.02,
    marginBottom: hp(4),
    fontFamily: fontFamily.rf_semibold,
    color: Colors.accent19,
  },
  content: {},
  otherPassionInput: {
    paddingVertical: hp(2),
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
    borderBottomWidth: 1,
  },
  submitButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
    marginTop: hp(6),
    minHeight: hp(6),
  },
  welcomeMain: {
    paddingTop: hp(5),
    alignItems: 'center',
  },
  welComeText: {
    fontSize: fontSize(32),
    textAlign: 'center',
    lineHeight: fontSize(38),
    letterSpacing: 0.37,
    color: Colors.accent19,
    fontFamily: fontFamily.rf_semibold,
    fontWeight: '600',
  },
  welComeSubText: {
    fontSize: fontSize(17),
    textAlign: 'center',
    lineHeight: fontSize(22),
    letterSpacing: -0.41,
    color: Colors.greyish1,
    marginTop: hp(3.5),
    fontFamily: fontFamily.rf_regular,
    fontWeight: '400',
  },
  welComecontent: {
    flex: 1,
    marginTop: hp(4),
  },
  footerContent: {
    alignItems: 'center',
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(2.5),
  },
  footerText: {
    fontFamily: fontFamily.rf_regular,
    marginRight: wp(3.5),
    fontSize: fontSize(15),
    letterSpacing: -0.4,
  },
  errorMessage: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: hp(1.5),
    marginLeft: wp(6),
  },
  continueButton: {
    marginVertical: 16,
  },
  usernameInput: {
    marginTop: hp(2.5),
  },
  containerStyle: {
    marginHorizontal: wp(6.9),
    alignItems: 'center',
    paddingVertical: hp(2.2),
    borderRadius: wp(3.2),
    marginBottom: hp(2.5),
  },
});
