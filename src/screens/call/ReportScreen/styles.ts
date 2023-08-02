import { Platform, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  reasonDropdown: {
    marginTop: hp(1),
    marginHorizontal: 2 * HORIZONTAL_MARGIN,
    width: Metrics.screenWidth - 4 * HORIZONTAL_MARGIN,
  },
  explanationInput: {
    marginHorizontal: 0,
  },
  errorMessage: {
    marginTop: 4,
    marginBottom: 24,
    marginLeft: 2 * HORIZONTAL_MARGIN,
  },
  feedbackInput: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish27,

    maxHeight: hp(20),
  },
  containerStyle: {
    borderWidth: 0,
    // borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: 'transparent',
    paddingBottom: hp(2),
  },
  searchContainerStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  selectedItemLabelStyle: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  selectedItemContainerStyle: {
    backgroundColor: Colors.primary4,
  },
  dropdownIcon: {
    width: wp(7),
    marginRight: wp(6.9),
    tintColor: Colors.primary4,
    // marginLeft: wp(6.9),
  },
  dropDownContainerStyleNew: {
    minHeight: 320,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
    marginTop: hp(3.5),
  },
  placeholderStyle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish26,
    fontWeight: '400',
    fontFamily: fontFamily.rf_regular,
    marginLeft: wp(4.5),
  },
  textStyle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.accent19,
    // marginLeft: wp(2),
    fontWeight: '400',
    marginLeft: wp(8),
    fontFamily: fontFamily.rf_regular,
  },
  reasonContainer: {
    marginTop: hp(2),
  },
  reportText: {
    fontSize: fontSize(11),
    lineHeight: fontSize(16),
    letterSpacing: -0.41,
    fontWeight: 'bold',
    color: Colors.greyish2,
    textTransform: 'uppercase',
    marginLeft: wp(1.25),
  },
  submitButton: {
    marginHorizontal: wp(6.9),
    minHeight: hp(6.2),
  },
  searchInputContainer: {
    color: Colors.greyish1,
    fontSize: fontSize(11),
    fontWeight: '700',
    width: '100%',
    borderColor: Colors.greyish11,
  },
  reportTextheader: {
    fontSize: fontSize(28),
    fontFamily: fontFamily.rf_regular,
    fontWeight: '600',
    lineHeight: fontSize(33.6),
    letterSpacing: -0.4,
  },
});
