import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  overlay: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  main: {
    borderRadius: wp(9),
    paddingVertical: hp(3),
    paddingHorizontal: wp(4.2),
    backgroundColor: Colors.white,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  bottomAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.8),
  },
  bottomAlertText: {
    flex: 1,
    fontSize: fontSize(18),
    lineHeight: fontSize(19),
    letterSpacing: -0.4,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontFamily: fontFamily.rf_medium,
  },
  dateText: {
    marginTop: hp(1.5),
    fontSize: fontSize(14),
    fontWeight: '400',
    color: Colors.greyish3,
    letterSpacing: -0.1,
    fontFamily: fontFamily.rf_regular,
  },
  ContentText: {
    marginVertical: hp(2.9),
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    fontWeight: '500',
    fontStyle: 'italic',
    color: Colors.greyish1,
  },
  myPassionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myPassion: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginRight: 8,
    marginBottom: 8,
  },
  myPassionText: {
    fontSize: fontSize(14),
    fontWeight: '400',
    color: Colors.accent19,
  },
  chatqueryText: {
    marginTop: hp(5.8),
    fontSize: fontSize(11),
    lineHeight: fontSize(16),
    letterSpacing: -0.42,
    fontWeight: '600',
    color: Colors.greyish3,
    fontFamily: fontFamily.rf_regular,
    textTransform: 'uppercase',
  },
  chatReceivedText: {
    marginTop: hp(1.5),
    fontSize: fontSize(10),
    lineHeight: fontSize(16),
    letterSpacing: -0.4,
    fontWeight: '600',
    color: Colors.greyish3,
    textTransform: 'uppercase',
    fontFamily: fontFamily.rf_medium,
  },
  addFromButton: {
    width: '100%',

    paddingVertical: hp(1.9),
    borderWidth: 0.9,
    borderRadius: 14,
    borderColor: Colors.destructive4,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  callbackBtn: {
    width: '80%',
    paddingVertical: hp(1.5),
    borderRadius: wp(3.2),
    // borderColor: Colors.destructive4,
    backgroundColor: Colors.primary4,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'flex-end',
  },
  submitButton: {
    marginTop: hp(2),
  },
  addFromReceivedButton: {
    marginTop: hp(2.5),
    width: '100%',
    paddingVertical: hp(1.55),
    borderRadius: wp(2.13),
    backgroundColor: Colors.primary4,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  addFromReceivedButtonText: {
    color: Colors.white,
    fontSize: fontSize(17),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
  },
  addFromButtonText: {
    color: Colors.destructive4,
    fontSize: fontSize(15),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fontSize(20),
    letterSpacing: -0.4,
    fontFamily: fontFamily.rf_medium,
  },
  callbackBtnText: {
    color: Colors.white,
    fontSize: fontSize(15),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    fontFamily: fontFamily.rf_regular,
  },

  chatqueryContent: {
    minWidth: wp(60),
    maxWidth: wp(72),
    borderRadius: 12,
    borderColor: Colors.secondary16,
    paddingVertical: hp(1.25),
    marginRight: wp(2.4),
  },
  chatqueryContentText: {
    fontSize: fontSize(13),
    lineHeight: fontSize(22),
    marginTop: hp(1.42),
    letterSpacing: -0.24,
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
  },
  chatqueryMain: {
    flexDirection: 'row',
    // marginTop: hp(1),
  },
  answerQueryText: {
    fontSize: fontSize(13),
    lineHeight: fontSize(15),
    letterSpacing: -0.3,
    color: Colors.greyish27,
    fontWeight: '500',
    fontFamily: fontFamily.rf_medium,
  },
  thankQueryText: {
    fontSize: fontSize(13),
    lineHeight: fontSize(15),
    letterSpacing: 0.066,
    color: Colors.greyish27,
    fontWeight: '500',
    fontFamily: fontFamily.rf_regular,
    marginLeft: wp(3.2),
  },
  answerBtnContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(1.9),
    marginBottom: hp(1.9),
  },
  answerBtnYes: {
    flex: 1,
    paddingVertical: hp(1.4),
    borderRadius: 14,
    marginLeft: wp(3.7),
    backgroundColor: Colors.primary4,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  answerBtnNo: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: hp(1.4),
    borderRadius: 14,
    borderColor: Colors.black,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  answerBtnYesText: {
    color: Colors.white,
    fontSize: fontSize(15),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.24,
    fontFamily: fontFamily.rf_regular,
  },
  answerBtnNoText: {
    color: Colors.black,
    fontSize: fontSize(15),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.4,
    fontFamily: fontFamily.rf_regular,
  },
});