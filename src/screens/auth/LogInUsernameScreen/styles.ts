import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  alternativeActionText: {
    marginTop: hp(3),
    fontFamily: fontFamily.rf_medium,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    paddingTop: hp(2.7),
    paddingHorizontal: wp(7.75),
  },
  containerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.greyish11,
    backgroundColor: Colors.white,
    marginBottom: hp(1),
    paddingLeft: 0,
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
  errorMessageContent: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 20,
  },
  errorMessage: {
    marginLeft: 4,
    paddingHorizontal: 0,
    fontSize: fontSize(13),
    fontWeight: '600',
    lineHeight: fontSize(16),
    color: Colors.destructive4,
    fontFamily: fontFamily.rf_regular,
  },
});
