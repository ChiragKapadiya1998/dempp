import { StyleSheet } from 'react-native';

import { HORIZONTAL_MARGIN, IS_IOS } from '../../../utils/constants';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(4.2),
    paddingHorizontal: wp(3.2),
    // paddingVertical: hp(0.9),
    borderRadius: wp(1),
    height: hp(4.2),
    borderColor: Colors.accent19,
  },
  category1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1),
    height: hp(4.2),
    paddingHorizontal: wp(3.2),
  },
  selectedCategoryText: {
    color: Colors.accent19,
  },
  categoryText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(17.5),
    letterSpacing: -0.15,
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
  },
  container: {
    // flex: 1,
    paddingVertical: hp(1.65),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollContainer: {
    flex: 1,
  },
  error: {
    color: Colors.destructive4,
    fontSize: fontSize(15),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  recomendedText: {
    fontSize: fontSize(13),
    lineHeight: fontSize(15.5),
    fontWeight: '500',
    color: Colors.black,
    marginTop: hp(1.25),
    marginHorizontal: wp(0.5),
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.3,
  },
  categoryWrapper: {
    paddingRight: wp(1.3),
    paddingBottom: hp(1.25),
  },
  selectedCategoryUnselected: {
    borderColor: Colors.accent19,
    borderWidth: 0.5,
  },
  selectedCategory: {
    backgroundColor: Colors.accent8,
  },
  selectedCategory1: {
    backgroundColor: Colors.accent9,
  },
  selectedCategory2: {
    backgroundColor: Colors.accent10,
  },

  passionButonSelected: {
    backgroundColor: Colors.accent8,
  },
  passionButonSelected1: {
    backgroundColor: Colors.accent9,
  },
  passionButonSelected2: {
    backgroundColor: Colors.accent10,
  },
  passionButtonText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(17),
    color: Colors.greyish1,
    fontWeight: '400',
    fontFamily: fontFamily.rf_regular,
  },
  addPassionButtonText: {
    fontSize: fontSize(13),
    color: Colors.primary4,
    fontWeight: '500',
    fontFamily: fontFamily.rf_medium,
    lineHeight: fontSize(15.6),
    letterSpacing: -0.3,
  },
  passionButtonUnselectedText: {
    color: Colors.greyish1,
  },
  passionButonSelectedText: {
    color: Colors.black,
  },
  otherPassionInput: {
    // flex: 1,
    // paddingVertical: hp(2),
    marginHorizontal: HORIZONTAL_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
    paddingBottom: hp(1),
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.2),
  },
  passionButtonUnselected: {
    borderColor: Colors.greyish1,
    borderWidth: 0.5,
  },
  passionButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.5),
    marginRight: wp(1.3),
    borderRadius: wp(1),
  },
  addPassionButton: {
    backgroundColor: Colors.greyish28,
    borderColor: Colors.primary4,
  },
  subTitleText: {
    fontSize: fontSize(10),
    lineHeight: fontSize(12),
    fontWeight: '600',
    color: Colors.greyish2,
    textTransform: 'uppercase',
    marginTop: hp(3),
    marginHorizontal: HORIZONTAL_MARGIN,
    fontFamily: fontFamily.rf_regular,
  },
  otherPassionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(0.5),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
});
