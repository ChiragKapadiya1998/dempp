import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(4.6),
    paddingVertical: hp(0.2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
    borderColor: Colors.greyish1,
  },
  category1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1),
    borderColor: Colors.greyish1,
    width: wp(16),
    height: hp(4.58),
  },
  selectedCategoryText: {
    color: Colors.black,
  },
  categoryText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(17),
    letterSpacing: -0.15,
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
  },
  container: {
    flex: 1,
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
    lineHeight: fontSize(20),
    fontWeight: '500',
    color: Colors.black,
    marginTop: hp(1.25),
    marginHorizontal: wp(0.5),
  },
  categoryWrapper: {
    paddingRight: wp(0.9),
    paddingBottom: hp(0.9),
  },
  selectedCategoryUnselected: {
    borderColor: Colors.greyish1,
    borderWidth: 1,
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
  },
  addPassionButtonText: {
    fontSize: fontSize(14),
    color: Colors.primary1,
    fontWeight: '400',
  },
  passionButtonUnselectedText: {
    color: Colors.greyish1,
  },
  passionButonSelectedText: {
    color: Colors.black,
  },
  otherPassionInput: {
    flex: 1,
    paddingVertical: hp(2),
    marginHorizontal: HORIZONTAL_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish1,
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.2),
  },
  passionButtonUnselected: {
    borderColor: Colors.greyish1,
    borderWidth: 1,
  },
  passionButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.5),
    marginRight: wp(2),
    borderRadius: wp(1),
  },
  addPassionButton: {
    backgroundColor: Colors.secondary6,
    borderColor: Colors.primary1,
  },
  subTitleText: {
    fontSize: fontSize(11),
    lineHeight: fontSize(16),
    fontWeight: 'bold',
    color: Colors.greyish2,
    textTransform: 'uppercase',
    marginTop: hp(3),
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  otherPassionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(0.5),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
});
