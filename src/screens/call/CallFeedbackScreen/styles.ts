import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Metrics } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flexGrow: 1,
    width: Metrics.screenWidth,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  headingText: {
    fontSize: fontSize(28),
    alignSelf: 'center',
  },
  feedbackPersonImage: {
    borderRadius: 23,
    overflow: 'hidden',
    resizeMode: FastImage.resizeMode.cover,
  },
  feedbackPersonNameText: {
    fontSize: fontSize(20),
    fontWeight: '600',
    lineHeight: fontSize(22),
  },
  rating: {
    marginTop: 12,
  },
  feedbackInputContainer: {
    marginTop: hp(0.1),
    marginHorizontal: 0,
    width: Metrics.screenWidth - 4 * HORIZONTAL_MARGIN,
  },
  feedbackInput: {
    minHeight: hp(2.4),
    maxHeight: hp(20),
    fontFamily: fontFamily.rf_regular,
    fontSize: fontSize(17),
  },
  submitButton: {
    marginTop: hp(4),
  },
  submitButtonText: {
    fontSize: fontSize(15),
    fontWeight: '600',
    lineHeight: fontSize(22),
    color: Colors.white,
  },
  reportContent: {
    marginTop: hp(3),
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  reportText: {
    fontSize: fontSize(15),
    fontWeight: '500',
    lineHeight: fontSize(22),
    color: Colors.destructive4,
    fontFamily: fontFamily.rf_medium,
  },
  avatar: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(16),
    backgroundColor: Colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: Colors.white,
  },
});
