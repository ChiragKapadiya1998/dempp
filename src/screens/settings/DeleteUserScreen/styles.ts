import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { VALIDATION_CODE_LENGTH } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  scrollContainer: {
    flexGrow: 1,
    // flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.secondary4,
  },
  descriptionTextFirstLine: {
    marginTop: 20,
  },
  codeInput: {
    marginVertical: 12,
    marginLeft: 0,
    width: undefined,
    marginHorizontal: 0,
    marginTop: hp(3.5),
  },
  errorMessage: {
    marginTop: 4,
    marginBottom: 24,
    marginLeft: (Metrics.screenWidth - VALIDATION_CODE_LENGTH * 52 - (VALIDATION_CODE_LENGTH - 1) * 16) / 2,
    width: '100%',
  },
  confirmButton: {},
  confirmButtonText: {
    fontSize: fontSize(17),
    fontWeight: '500',
    fontFamily: fontFamily.rf_regular,
  },
  cardContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: wp(12.5),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 5,
  },
  headingContent: {
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.secondary5,
    alignItems: 'center',
  },
  deleteMainContent: {
    marginHorizontal: wp(6.9),
    alignItems: 'center',
    paddingVertical: hp(1.9),
    borderRadius: wp(3.2),
  },

  deleteStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.destructive1,
  },
  deleteText: {
    color: Colors.greyish6,
    fontSize: fontSize(16),
    fontWeight: '600',
    lineHeight: fontSize(16),
    marginRight: wp(2),
  },

  container: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  title: {
    color: Colors.greyish1,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: fontSize(28),
    lineHeight: fontSize(34),
    fontFamily: fontFamily.rf_medium,
  },

  text: {
    textAlign: 'center',
    fontSize: fontSize(17),
    color: Colors.greyish1,
    fontWeight: '400',
    lineHeight: fontSize(22),
    fontFamily: fontFamily.rf_regular,
  },
  boldText: {
    fontWeight: '600',
  },
  errorMessage1: {
    marginTop: 8,
  },
  cardContent1: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: hp(6),
    borderTopStartRadius: 34,
    borderTopEndRadius: 34,
    paddingHorizontal: wp(5),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.099,
    shadowRadius: 5,
    elevation: 5,
  },
});
