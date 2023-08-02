import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.greyish28,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(3.15),
    paddingHorizontal: wp(5.75),
    paddingBottom: hp(3.65),
  },
  headTitile: {
    fontSize: fontSize(28),
    lineHeight: fontSize(32),
    fontWeight: '600',
    color: Colors.greyish1,
    marginBottom: hp(1.9),
    fontFamily: fontFamily.rf_semibold,
    letterSpacing: -0.4,
  },
  contentContainer: {
    flex: 1,
    paddingTop: hp(4.9),
    paddingHorizontal: AUTH_HORIZONTAL_SPACE,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.greyish3,
    opacity: 0.5,
  },
  sendButton: {
    width: '100%',
    padding: wp(4),
    borderRadius: wp(3.4),
    backgroundColor: Colors.primary4,
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
  error: {
    width: '100%',
    paddingVertical: hp(1),
    marginHorizontal: 0,
  },
  addFromButton: {
    width: '100%',
    marginBottom: hp(2.7),
    borderWidth: 1,
    borderRadius: 14,
    borderColor: Colors.primary4,
    backgroundColor: Colors.greyish28,
    minHeight: hp(5.9),
    justifyContent: 'center',
    fontFamily: fontFamily.rf_medium,
    fontSize: fontSize(15),
    letterSpacing: -0.4,
  },
  addFromButtonText: {
    color: Colors.primary4,
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.3,
    fontFamily: fontFamily.rf_regular,
  },
  or: {
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.greyish1,
    marginVertical: hp(2.7),
    letterSpacing: -0.3,
    fontFamily: fontFamily.rf_regular,
  },
  textContainer: {
    paddingVertical: hp(2.5),
    justifyContent: 'center',
    paddingRight: wp(3),
    marginRight: wp(5.5),
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    color: Colors.greyish26,
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.3,
    marginHorizontal: 0,
    fontFamily: fontFamily.rf_regular,
  },
  blackText: {
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.3,
  },
  greyText: {
    color: Colors.greyish26,
    fontSize: fontSize(17),
    fontWeight: '400',
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.3,
  },
  loadingStyle: {
    width: 24,
  },
});
