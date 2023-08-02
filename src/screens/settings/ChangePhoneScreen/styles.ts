import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  cardContent: {
    marginTop: hp(0.9),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.primary5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  titleSmall: {
    marginHorizontal: wp(4),
    fontSize: fontSize(10),
    fontWeight: '500',
    lineHeight: fontSize(22),
    letterSpacing: -0.24,
    fontFamily: fontFamily.rf_medium,
    color: Colors.greyish27,
  },
  phoneContent: {
    backgroundColor: Colors.white,
    paddingVertical: hp(1.8),
    marginHorizontal: wp(5),
    borderRadius: 15,
    marginTop: hp(0.8),
  },
  numText: {
    fontSize: fontSize(15),
    fontWeight: '500',
    lineHeight: fontSize(22),
    letterSpacing: -0.3,
    color: Colors.primary4,
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
  },
  numSubText: {
    fontSize: fontSize(14),
    fontWeight: '400',
    lineHeight: fontSize(21),
    // letterSpacing: -0.24,
    color: Colors.greyish1,
    marginHorizontal: wp(5),
    // textAlign: 'center',
    fontFamily: fontFamily.rf_regular,
    marginTop: wp(4.2),
  },

  deleteMainContent: {
    marginHorizontal: wp(6.9),
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(4),
  },

  deleteStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.destructive1,
  },
  deleteText: {
    color: Colors.greyish6,
    fontSize: fontSize(15),
    lineHeight: fontSize(16),
    marginRight: wp(2),
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
    fontWeight: '600',
    letterSpacing: -0.4,
  },

  subContainer: {
    paddingBottom: hp(1.3),
  },
  subContainerNew: {
    flex: 1,
    paddingBottom: 16,
  },
  containerStyle: { borderRadius: 0, borderWidth: 0, borderBottomWidth: 0.5, borderColor: Colors.greyish28, backgroundColor: '#FFF' },
  searchContainerStyle: { borderRadius: 0, borderWidth: 0, borderBottomWidth: 0.3, borderColor: Colors.greyish28, backgroundColor: '#FFF' },
  selectedItemLabelStyle: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  selectedItemContainerStyle: {
    backgroundColor: Colors.primary4,
  },
  itemSeparatorStyle: {
    height: 0.5,
    backgroundColor: Colors.black,
  },
  searchTextInputStyle: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish28,
    paddingVertical: hp(1.8),
  },
  dropDownContainerStyle: {
    minHeight: 650,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish4,
  },

  dropDownContainerStyleNew: {
    minHeight: 650,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.greyish4,
    paddingBottom: 100,
  },

  textContainer: {
    padding: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderColor: Colors.greyish28,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.greyish28,
    color: Colors.black,
    fontFamily: fontFamily.rf_regular,
    fontSize: 17,
    letterSpacing: -0.3,
    fontWeight: '400',
  },
  blackText: {
    color: '#000',
    fontFamily: fontFamily.rf_regular,
    fontSize: 17,
    letterSpacing: -0.3,
    fontWeight: '400',
  },
  greyText: {
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
    fontSize: 17,
    letterSpacing: -0.3,
    fontWeight: '400',
  },
  code: {
    flex: 0.3,
  },

  errorMessage: {
    // marginTop: 17,
    // marginBottom: 24,
  },
  placeholderStyle: {
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
    fontSize: 17,
    letterSpacing: -0.3,
    fontWeight: '400',
    lineHeight: fontSize(22),
  },
  changeBtn: {
    marginHorizontal: wp(4.2),
    marginTop: hp(4.5),
  },
  changeBtnText: {
    color: Colors.greyish6,
    fontSize: fontSize(14),
    fontWeight: '600',
  },
  appSettingContent: {
    flexDirection: 'row',
    marginTop: hp(1.2),
    paddingBottom: hp(1.2),
  },
  newNumText: {
    fontSize: fontSize(14),
    fontWeight: '400',
    lineHeight: fontSize(17),
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
  },

  searchInputContainer: {
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontWeight: '500',
    width: '100%',
    borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    borderColor: Colors.greyish28,
    paddingTop: hp(1.75),
    fontFamily: fontFamily.rf_medium,
    marginLeft: wp(1),
  },

  listItemText: {
    color: Colors.black,
    fontSize: fontSize(16),
    marginLeft: -7,
  },
  buttoncontainerStyle: {
    alignItems: 'center',
    // paddingVertical: hp(2.2),
    borderRadius: wp(3.2),
    marginBottom: hp(2.5),
    marginHorizontal: wp(6.9),
    // height:50
  },
});
