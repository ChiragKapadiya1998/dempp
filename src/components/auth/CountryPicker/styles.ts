import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  containerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
    marginBottom: hp(1),
    paddingLeft: 0,
  },
  searchContainerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.white,
    marginBottom: hp(1),
    paddingLeft: 0,
  },
  searchInputContainer: {
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontWeight: '500',
    width: '100%',
    borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    paddingTop: hp(1.75),
    fontFamily: fontFamily.rf_medium,
  },
  selectedItemLabelStyle: {
    fontWeight: '700',
    color: Colors.white,
    fontFamily: fontFamily.rf_medium,
  },
  selectedItemContainerStyle: {
    backgroundColor: Colors.primary4,
  },
  searchTextInputStyle: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.3,
    borderColor: Colors.greyish4,
    paddingVertical: 16,
  },
  dropDownContainerStyle: {
    minHeight: 500,
    backgroundColor: Colors.white,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish4,
  },
  dropDownContainerStyleNew: {
    maxHeight: hp(55),
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
  inputContainer: {
    flex: 1,
    padding: hp(2.6),
    paddingLeft: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
    color: Colors.greyish26,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
  },
  listItemText: {
    color: Colors.black,
    fontSize: fontSize(16),
    marginLeft: -7,
  },
  blackText: {
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
  },
  placeholderStyle: {
    color: Colors.greyish4,
    fontFamily: fontFamily.rf_regular,
  },
});
