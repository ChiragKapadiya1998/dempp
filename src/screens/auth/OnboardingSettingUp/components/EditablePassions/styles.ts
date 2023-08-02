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
  AddButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
    borderRadius: wp(1),
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.4),
  },
  titleSmall: {
    fontSize: fontSize(11),
    fontWeight: '700',
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
    paddingHorizontal: HORIZONTAL_MARGIN,
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
  myPassion: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  myPassionText: {
    fontSize: fontSize(12),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 8,
    flex: 1,
    minHeight: 42,
  },
  actionSave: {
    marginRight: 0,
    marginLeft: 4,
    backgroundColor: Colors.primary4,
  },
  actionCancel: {
    marginRight: 4,
    marginLeft: 0,
  },
  categoryContainer: {
    marginTop: hp(2),
    flex: 1,
  },
  categoryTitle: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    fontWeight: '600',
    color: Colors.primary1,
    letterSpacing: -0.24,
    marginBottom: hp(1.6),
  },
  passionButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
    marginRight: wp(0.9),
    borderRadius: wp(1),
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
    fontFamily: fontFamily.rf_medium,
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
    paddingBottom: hp(1),
    marginHorizontal: HORIZONTAL_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.3,
    color: Colors.greyish3,
    fontFamily: fontFamily.rf_regular,
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.2),
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
