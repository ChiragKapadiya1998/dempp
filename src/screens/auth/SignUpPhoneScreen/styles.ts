import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(7.7),
  },
  alternativeActionText: {
    marginTop: hp(3),
    fontFamily: fontFamily.rf_medium,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
  },
  registerButton: {
    marginTop: hp(2),
  },
  containerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: 16,
  },
  selectedItemLabelStyle: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  selectedItemContainerStyle: {
    backgroundColor: Colors.accent7,
  },
  itemSeparatorStyle: {
    height: 0,
  },
  searchTextInputStyle: {
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderColor: Colors.greyish11,
    paddingVertical: 16,
  },
  dropDownContainerStyle: {
    minHeight: 350,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
  },
  textContainer: {
    paddingVertical: hp(2.6),
    paddingRight: wp(3),
    marginRight: wp(5.5),
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    flex: 1,
    padding: hp(2.6),
    paddingLeft: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
  },
  blackText: {
    color: Colors.accent19,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
  },
  greyText: {
    color: Colors.greyish4,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_regular,
  },
  code: {
    flex: 0.3,
  },

  errorMessage: {
    marginTop: 17,
    marginBottom: 24,
    marginHorizontal: 0,
  },
  placeholderStyle: {
    color: Colors.greyish4,
  },
});
