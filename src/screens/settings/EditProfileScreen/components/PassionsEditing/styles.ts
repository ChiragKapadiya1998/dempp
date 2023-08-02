import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.4),
  },
  titleSmall: {
    fontSize: fontSize(11),
    fontWeight: '700',
    fontFamily: fontFamily.rf_regular,
  },
  myPassionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: hp(0),
  },
  otherPassionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp(0.5),
    // paddingHorizontal: HORIZONTAL_MARGIN,
  },
  subTitleText: {
    fontSize: fontSize(11),
    lineHeight: fontSize(16),
    fontWeight: 'bold',
    color: Colors.greyish2,
    textTransform: 'uppercase',
    marginTop: hp(3),
    // marginHorizontal: HORIZONTAL_MARGIN,
  },
  myPassion: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 3,
    marginBottom: hp(0.9),
  },
  myPassionText: {
    fontSize: fontSize(14),
  },
  actionsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingVertical: hp(2),
    // borderTopStartRadius: 20,
    // borderTopEndRadius: 20,
    // paddingTop: hp(3),
    paddingHorizontal: 16,
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: -5,
    // },
    // shadowOpacity: 0.02,
    // shadowRadius: 2,
    // elevation: 5,
  },
  actionButton: {
    borderRadius: 12,
    flex: 1,
    minHeight: 42,
  },
  actionSave: {
    marginRight: 0,
    marginLeft: 4,
    backgroundColor: Colors.primary4,
  },
  actionCancel: {
    marginRight: wp(2),
    marginLeft: 0,
    color: Colors.greyish27,
  },
  categoryContainer: {
    marginTop: hp(3.9),
    flex: 1,
  },
  categoryTitle: {
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    fontWeight: '500',
    color: Colors.primary4,
    letterSpacing: -0.3,
    marginBottom: hp(2),
    fontFamily: fontFamily.rf_regular,
  },
  passionButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
    marginRight: wp(0.9),
    borderRadius: wp(1),
  },
  AddButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.5),
    marginRight: wp(2),
    borderRadius: wp(1),
    width: wp(17),
    textAlign: 'center',
  },
  addPassionButton: {
    backgroundColor: Colors.greyish28,
    borderColor: Colors.primary4,
  },
  passionButtonUnselected: {
    borderColor: Colors.greyish1,
    borderWidth: 1,
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
    fontWeight: '600',
    fontFamily: fontFamily.rf_regular,
  },
  passionButtonUnselectedText: {
    color: Colors.greyish1,
  },
  passionButonSelectedText: {
    color: Colors.black,
  },
  otherPassionInput: {
    flex: 1,
    paddingTop: hp(2.5),
    paddingBottom: hp(0.95),
    // marginHorizontal: HORIZONTAL_MARGIN,
    borderBottomWidth: 1,

    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_medium,
    fontWeight: '400',
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.2),
    marginTop: hp(1.7),
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
  selectedCategoryContent: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyish24,
  },
});
