import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  title: {
    color: Colors.greyish1,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: fontSize(28),
    lineHeight: fontSize(34),
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
  errorMessage: {
    marginTop: 8,
  },
  cardContent: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: hp(6),
    borderTopStartRadius: 34,
    borderTopEndRadius: 34,
    paddingHorizontal: wp(2),
  },
  submitButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
    minHeight: hp(6.8),
  },
});
